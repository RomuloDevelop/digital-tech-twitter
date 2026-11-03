import { store } from "../store";
import CustomError from "./customError";

const generateJson = () => {
  const data = store.getState()

  if (!data) throw new CustomError('No hay data para exportar', {isHandled: true})

  const text = JSON.stringify(data)

  // Create a tag for download
  const downloadLink = document.createElement('a')
  downloadLink.target = '_blank'
  downloadLink.download = 'batch.json'

  // Create blob url
  const blob = new Blob([text], {type: 'application/JSON'})
  const donwloadUrl = window.URL.createObjectURL(blob)
  downloadLink.href = donwloadUrl

  // Append tag
  document.body.append(downloadLink)
  downloadLink.click()

  document.body.removeChild(downloadLink)
  URL.revokeObjectURL(donwloadUrl)
}

export default generateJson