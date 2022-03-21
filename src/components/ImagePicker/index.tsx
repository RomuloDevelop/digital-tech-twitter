import { FormEvent, ReactElement, useEffect, useRef, useState } from "react"
import useBase64Image from "../../hooks/useBase64Image"

const ImagePicker = ({onChange, children}: {onChange: (image: string, name?: string) => void, children: (cb:(event: any) => void) => ReactElement}) => {
  let fileInput = useRef<HTMLInputElement | null>(null)
  let [file, setFile] = useState<File | null>(null)
  let image = useBase64Image(file)

  useEffect(() => {
    onChange(image, file?.name)
  }, [image])

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    setFile((event.currentTarget.files as FileList)[0])
  }

  const handleImage = (event: any) => {
    event.preventDefault()
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