import { ReactElement, useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { selectUser } from "../store/user/selects"

type GuardProps = {children: ReactElement}

const AuthGuard = (props: GuardProps) => {
  const actualUser = useSelector(selectUser) 
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
      if (!location.pathname.includes('/login') && !location.pathname.includes('/register') && !actualUser) {
        navigate("/login")
      }
  }, [location.pathname, navigate, actualUser])
  return props.children
}

export default AuthGuard