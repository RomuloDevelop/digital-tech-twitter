import { ReactElement } from "react";
import './Card.scss'

const Card = ({children}: {children: ReactElement}) => (
  <div className="card my-3 rounded">
    <>
      {children}
    </>
  </div>
)

export default Card