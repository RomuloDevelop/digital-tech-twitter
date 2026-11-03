import { UserIcon } from '@heroicons/react/solid'
import './Avatar.scss'

const Avatar = ({avatar}: {avatar?: string}) => {
  return (
    <div className="rounded-full border-purple-700 inline-flex items-center justify-center avatar">
        <div className="rounded-full inline-flex items-center justify-center bg-slate-200">
          {
            avatar ?
            <img src={avatar} alt="author-avatar"></img> :
            <UserIcon className='text-purple-700 h-5'/>
          }
        </div>
    </div>
  )
}

export default Avatar