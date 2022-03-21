import { ReactElement, useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { selectUser } from "../store/user/selects"

const AuthGuard = ({ children }: {children: ReactElement}) => {
  const actualUser = useSelector(selectUser) 
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
      if (location.pathname !== '/login' && location.pathname !== '/register' && !actualUser) {
        navigate("/login")
      }
  }, [location.pathname, navigate, actualUser])
  return children
}

export default AuthGuard