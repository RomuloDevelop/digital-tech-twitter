import { UserIcon } from '@heroicons/react/solid'
import { useCallback, useState } from 'react'
import useFirstRender from '../../hooks/useFirstRender'
import ImagePicker, { HandleImage } from '../ImagePicker'
import './AvatarSelector.scss'

const AvatarSelector = ({value, onChange}: {value: string | null | undefined, onChange: (image: string) => void}) => {
  const firstRender = useFirstRender()
  const [pickerValue, setPickerValue] = useState('')
  const pickerChange = useCallback((newValue: string) => {
    setPickerValue(newValue)
    if (!firstRender) {
      onChange(newValue)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange])

  const updateStateAndHandle = (event: any, cb: HandleImage) => {
    if (value && !pickerValue) onChange('') 
    else cb(event)
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