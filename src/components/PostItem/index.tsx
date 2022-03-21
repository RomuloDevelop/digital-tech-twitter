import { HeartIcon } from '@heroicons/react/solid'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../store'
import { addLike, removeLike } from '../../store/post'
import { PostUser } from '../../store/post/selects'
import { User } from '../../store/user'
import { selectUser } from '../../store/user/selects'
import Avatar from '../Avatar'
import Card from '../Card'
import './PostItem.scss'

const PostItem = ({...props}: PostUser) => {
  const actualUser = useSelector(selectUser) as User
  const time = moment(props.create_at).from(new Date())
  const hasLike = props.likes.some(user => user.id === actualUser?.id)

  const handlelike = () => {
    const data = {postId: props.id, userId: actualUser.id}
    if (!hasLike) {
      store.dispatch(addLike(data))
    } else {
      store.dispatch(removeLike(data))
    }
  }

  return (
    <Card><>
      <div className='card__header flex items-center gap-2 p-2'>
        <Avatar avatar={props.author.avatar}></Avatar>
        <strong className='font-700'>{props.author.username}</strong>
      </div>
      {
        props.image ?
        <div className='card__image'>
          <img src={props.image} alt={`post-${props.author.username}`} />
        </div> :
        <PostDescription message={props.message} />
      }
      <div className='m-2'>
        <HeartIcon className={`${hasLike? 'text-red-800':'text-gray-400'} card__like-icon`} onClick={handlelike}/>
      </div>
      <div className='flex items-center gap-4 px-2 card__likes'>
        {
          props.likes?.length ?
          <div className='flex items-center gap-1 h-full'>
            <span className='ml-1 text-gray-400'>Le gusta a</span>
            <div className='flex items-center gap-1 h-full'>
              <Avatar avatar={props.likes[0].avatar}></Avatar>
              <strong className='text-xs sm:text-sm'>{props.likes[0].username}</strong>
              {
                props.likes.length > 1 &&
                    <strong className='text-xs sm:text-sm'>y {props.likes.length - 1}</strong>
              }
            </div>
          </div> :
          <span className='ml-1 text-gray-400'>Sé el primero en darle like</span>
        }
      </div>
      {
        props.image && <PostDescription message={props.message} />
      }
      <div className='card__time px-2 pb-2 flex justify-between items-end flex-wrap'>
        <span className='text-slate-500 text-xs'>Hace {time}</span>
        {props.location && <span className='text-slate-500' style={{fontSize: '0.8rem'}}>Desde {props.location}</span>}
      </div>
    </></Card>
  )
}

const PostDescription = ({message}: {message: string}) => {
  let messageBox = useRef<HTMLParagraphElement>(null)
  let [seeMore, setSeeMore] = useState(false)
  let [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    handleShowBtn()
    const onResize = () => handleShowBtn()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleShowBtn = () => {
    if (messageBox.current && messageBox.current.clientHeight > 150) setShowBtn(true)
    else setShowBtn(false)
  }

  return (
    <div className='card__description p-2'>
      <div style={{maxHeight: seeMore? undefined: 150, overflow: 'hidden'}}>

      <p ref={messageBox}>
        {message}
      </p>
      </div>
      { showBtn &&
        <div className='text-right'>
          <span onClick={() => setSeeMore(!seeMore)} className='text-gray-400 text-sm cursor-pointer'>
            { seeMore ? 'Ocultar': 'Ver más' }
          </span>
        </div>
      }
    </div>
  )
}

export default PostItem