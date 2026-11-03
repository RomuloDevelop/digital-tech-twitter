const convert = (file: Blob) => new Promise((resolve: (value: string) => void, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = (error) => reject(error);
});

async function toBase64(file: Blob) {
 const result = await convert(file).catch(e => Error(e));
 return result
}

export default toBase64