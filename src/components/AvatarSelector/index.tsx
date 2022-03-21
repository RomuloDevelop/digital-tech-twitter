import { UserIcon } from '@heroicons/react/solid'
import ImagePicker from '../ImagePicker'
import './AvatarSelector.scss'

const AvatarSelector = ({value, onChange}: {value: string | null | undefined, onChange: (image: string) => void}) => {
  const pickerChange = (newValue: string) => {
    if (!value) onChange(newValue)
  }

  const updateStateAndHandle = (event: any, cb: (event: any) => void) => {
    if (value) {
      onChange('')
    } else {
      cb(event)
    }
  }
  return (
    <ImagePicker onChange={pickerChange}>
      {(handleClick) =>
        <div className='image-selector'>
          <div className="border-purple-700">
            {
              value ? <img src={value} alt="user" /> :
              <UserIcon className='text-purple-700 h-5'/>
            }
          </div>
          <button onClick={(event) => updateStateAndHandle(event, handleClick)} className='no-apperance text-purple-700'>
            {
              value ?
              'Eliminar' :
              'Escoger avatar'
            }
          </button>
        </div>
      }
    </ImagePicker>
  )
}

export default AvatarSelector