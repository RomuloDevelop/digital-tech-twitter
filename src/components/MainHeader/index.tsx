import { useState, FormEvent, Fragment } from "react"
import { UserCircleIcon, PencilIcon, SearchIcon, DatabaseIcon, LogoutIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import './MainHeader.scss'
import { store } from "../../store"
import { setActualUser } from "../../store/user"
import { update } from "../../store/search"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/selects"
import generateJson from "../../utils/generateJson"
import SearchModal from "../SearchModal"
import { selectSearch } from "../../store/search/selects"
import { toast } from "react-toastify"

const Header = () => {
  const navigate = useNavigate()
  const actualUser = useSelector(selectUser)
  const search = useSelector(selectSearch)
  const [modalState, setModalState] = useState(false)

  const openModal = () => {
    setModalState(true)
  }

  const closeModal = () => {
    setModalState(false)
  }

  const logout = () => {
    store.dispatch(setActualUser(null))
  }

  const profile = () => {
    navigate('/profile')
  }

  const updateSearch = (event: FormEvent<HTMLInputElement>) => {
    store.dispatch(update(event.currentTarget.value))
  }

  const generateBatch = () => {
    const notyConf =  {
      autoClose: 1500,
      isLoading: false,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
    }
    const notyId = toast('Exportando data', {
      isLoading: true,
      position: 'top-right'
    })
    setTimeout(() => {
      try {
        generateJson()
        toast.update(notyId, {render: 'Data exportada', type: 'success', ...notyConf})
      } catch (err: any) {
        const message = err.isHandled ? err.message : 'Ocurrió un error al exportar la data'
        toast.update(notyId, {render: message, type: 'error', ...notyConf})
      }
    }, 1500)
  }
 
  return (
    <header className="flex justify-between items-center flex-wrap slate-500 w-100 md:px-8 px-3 py-5 border-b-2 border-slate-200 main-header">
      <div className="flex justify-end items-center flex-wrap main-header__search">
        <h1 className="text-gray-400 md:text-md-header sm:text-sm-header text-xs-header">DTech Inc</h1>
        <input type="text" placeholder="Usuario o mensaje" id="search"
          className="appearance-none hidden sm:block shadow-sm bg-gray-100 rounded border-slate focus:border-purple-700"
          onInput={updateSearch} value={search}>
        </input>
      </div>
      <Menu as="div">
        <div>
          <Menu.Button className="appearance-none main-header__menu-btn border-0 rounded-full flex items-center justify-center">
            <div className="w-full h-full rounded-full" style={{overflow: 'hidden'}}>
            {
              actualUser && actualUser.avatar?
                <img src={actualUser.avatar} alt="user-avatar" /> :
                <UserCircleIcon className="text-purple-700"/>
            }
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-5 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <div className="sm:hidden">
                  <CustomMenuItem onClick={openModal}>
                    {(active: boolean) => (<><SearchIcon className={`${active? 'text-white': 'text-purple-700'} w-5 h-5 mr-2`}/> Buscar</>)}
                  </CustomMenuItem>
                </div>
                <CustomMenuItem onClick={profile}>
                  {(active: boolean) => (<><PencilIcon className={`${active? 'text-white': 'text-purple-700'} w-5 h-5 mr-2`}/> Editar</>)}
                </CustomMenuItem>
                <CustomMenuItem onClick={generateBatch}>
                  {(active: boolean) => (<><DatabaseIcon className={`${active? 'text-white': 'text-purple-700'} w-5 h-5 mr-2`}/> Exportar Data</>)}
                </CustomMenuItem>
                <CustomMenuItem onClick={logout}>
                  {(active: boolean) => (<><LogoutIcon className={`${active? 'text-white': 'text-purple-700'} w-5 h-5 mr-2`}/> Salir</>)}
                </CustomMenuItem>
              </div>
            </Menu.Items>
          </Transition>
      </Menu>
      <SearchModal isOpen={modalState} closeModal={closeModal}/>
    </header>
  )
}

const CustomMenuItem = (props: any) => (
  <Menu.Item>
    {({active}) => (
      <button {...props} 
      className={`${
        active ? 'bg-purple-700 text-white' : 'text-gray-900'
      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
      >
        {props.children(active)}
      </button>
    )}
  </Menu.Item>
)

export default Header