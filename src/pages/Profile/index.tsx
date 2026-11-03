import UserData from "../../components/UserData"
import { store } from "../../store"
import { setActualUser, update, User } from "../../store/user"

const Profile = () => {
  const submit = (user: User) => {
    store.dispatch(update(user))
    store.dispatch(setActualUser(user))
  }
  return (
    <UserData onSubmit={submit}/>
  )
}

export default Profile