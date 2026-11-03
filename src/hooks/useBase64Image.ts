import { useEffect, useState } from 'react'
import toBase64 from '../utils/files'

const useBase64Image = (file: File | null) => {
  const [image, setImage] = useState('')
  useEffect(() => {
    if (file) {
     toBase64(file).then((result) => {
        if (typeof result === 'string')
        setImage(result)
        else console.error(result)
      })
    } else {
      setImage('')
    }
  }, [file])

  return image
}

export default useBase64Image