import { FormEvent, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../store'
import { add, Post } from '../../store/post'
import { User } from '../../store/user'
import { selectUser } from '../../store/user/selects'
import getGeolocation from '../../utils/getLocation'
import FormButton from '../Button'
import Card from '../Card'
import ImagePicker from '../ImagePicker'
import './PostForm.scss'


const PostForm = () =>  {
  let author = useSelector(selectUser) as User
  let [loading, setLoading] = useState(false)
  let [message, setMessage] = useState('')
  let [touched, setTouched] = useState(false)
  let [image, setImage] = useState<{blob: string, name?: string}>({blob: '', name: ''})
  let messageError = useMemo(() => touched && (message.length < 10 || message.length > 500), [message, touched])

  const handleInput = (event: FormEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (messageError) return
    setLoading(true)
    getGeolocation().then((response) => {
      setLoading(false)
      const post: Omit<Post, 'id'> = {
        message,
        image: image.blob,
        create_at: new Date(),
        author: author.id,
        location: response ? `${response.addresses[0].country} ${response.addresses[0].countryFlag}, ${response.addresses[0].city}`:'',
        likes: [],
        status: 'published'
      }
      setTouched(false)
      store.dispatch(add(post))
    })
  }
console.log(image)

  const pickerChange = useCallback((newValue: string, name?: string) => {
    if (!image.blob) setImage({blob: newValue, name})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateStateAndHandle = (event: any, cb: (event: any) => void) => {
      cb(event)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="p-2 flex flex-col gap-2">
        <h1 className='text-lg mt-2'>Crea una publicación</h1>
        <div className='w-full flex flex-col'>
          <textarea
            placeholder='Mínimo de 10 caracteres, Máximo 500'
            value={message}
            onInput={handleInput}
            onBlur={() => setTouched(true)}
            className={`${messageError? 'border-red-500':'border-slate-500'} w-full appearance-none shadow-sm bg-gray-100 rounded focus:border-purple-700`}
          >
          </textarea>
          <span className={`${messageError ? 'text-red-500':'text-gray-400'} text-right`}>
            {message.length}/500
          </span>
        </div>
        <div className='flex justify-start items-center gap-1'>
          <ImagePicker onChange={pickerChange}>
          {(handleClick) => (
            <button
              onClick={(event) => updateStateAndHandle(event, handleClick)}
              className='px-4 py-2 text-sm font-medium text-purple-900 bg-purple-100 border border-transparent rounded-md hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500'
              >
              {!image.blob ? 'Escoge un archivo': 'Remover'}
            </button>
          )}
          </ImagePicker>
          <span className='text-slate-500'>{image?.name}</span>
        </div>
        <div className='mt-2 flex justify-end'>
          <FormButton loading={loading} text="Crear post"></FormButton>
        </div>
      </form>
    </Card>
  )
}

export default PostForm