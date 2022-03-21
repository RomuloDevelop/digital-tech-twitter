import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectPostsCount, selectUser } from '../../store/user/selects'
import Avatar from '../Avatar'
import './UserTag.scss'

const UserTag = () => {
  const actualUser = useSelector(selectUser)
  const postsCount = useSelector(selectPostsCount)

  const fullName = useMemo(() => {
    if (actualUser) {
      if (actualUser.name.length + actualUser.username.length > 30) {
        return actualUser.name
      } else {
        return `${actualUser?.name} ${actualUser?.surname}`
      }
    } else return ''
  }, [actualUser])

  return (
    <div className='tag-container border-gray-200'>
      <div className='tag-avatar'>
        <div>
          <Avatar avatar={actualUser?.avatar}/>
          <div className='tag-fullname text-slate-500'>
            <span>{fullName}</span>
          </div>
        </div>
      </div>
      <div className='tag-info text-slate-600'>
        <span>{actualUser?.username}</span>
        <span>{postsCount} publicaciones</span>
      </div>
    </div>
  )
}

export default UserTag