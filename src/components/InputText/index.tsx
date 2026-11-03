import { ChangeEventHandler, FocusEventHandler } from "react"
import './InputText.scss'

type Props = {value: string, name: string, placeholder: string, onChange: ChangeEventHandler<HTMLInputElement>, onBlur: FocusEventHandler<HTMLInputElement>, error?: boolean, errorMessage?: string}

const Input = ({value, name, placeholder, onChange, onBlur, error, errorMessage}: Props) => (
  <div className="input-container">
    <input
      placeholder={placeholder}
      name={name}
      className={`${error ? 'border-red-500 ': ''}input-text`}
      type="text"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      />
    <div className={`${error ? 'active ': ''}error text-red-500`}><span>{errorMessage}</span></div>
  </div>
)

export default Input