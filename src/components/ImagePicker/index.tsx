import { FormEvent, ReactElement, useEffect, useRef, useState } from "react"
import useBase64Image from "../../hooks/useBase64Image"

export type HandleImage = (event: any, action?: 'DELETE' | 'UPDATE') => void

const ImagePicker = ({onChange, children}: {onChange: (image: string, name?: string) => void, children: (cb:(event: any) => void) => ReactElement}) => {
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const image = useBase64Image(file)

  useEffect(() => {
    onChange(image, file?.name)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    setFile((event.currentTarget.files as FileList)[0])
  }

  const handleImage: HandleImage = (event: any, action?: 'DELETE' | 'UPDATE') => {
    event.preventDefault()
    if (action === 'UPDATE') {
      riseClick()
    } else if (action === 'DELETE') {
      setFile(null)
    } else if (file)
      setFile(null)
    else riseClick()
  }

  const riseClick = () => {
    if (fileInput && fileInput.current) fileInput.current.click()
  }

  return (
    <>
      {children(handleImage)}
      <input ref={fileInput} value="" className='hidden' onChange={handleFileChange} type="file" accept="image/*" />
    </>
  )
}

export default ImagePicker