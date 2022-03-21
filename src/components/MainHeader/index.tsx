import { useState, useEffect, FormEvent, Fragment } from "react"
import { UserCircleIcon, PencilIcon, SearchIcon, DatabaseIcon, LogoutIcon } from '@heroicons/react/solid'
import { Menu, Dialog, Transition } from '@headlessui/react'
import './MainHeader.scss'
import { store } from "../../store"
import { setActualUser } from "../../store/user"
import { update } from "../../store/search"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/selects"

type SearchEvent = FormEvent<HTMLInputElement>

const Header = () => {
  const navigate = useNavigate()
  const actualUser = useSelector(selectUser)
  const [search, setSearch] = useState('')
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
    const {value} = event.currentTarget
    setSearch(value)
  }

  const updateSearchAndDispatch = (event: FormEvent<HTMLInputElement>) => {
    updateSearch(event)
    store.dispatch(update(event.currentTarget.value))
  }
 
  return (
    <header className="flex justify-between items-center flex-wrap slate-500 w-100 md:px-8 px-3 py-5 border-b-2 border-slate-200 main-header">
      <div className="flex justify-end items-center flex-wrap main-header__search">
        <h1 className="text-gray-400 md:text-md-header sm:text-sm-header text-xs-header">DTech Inc</h1>
        <input type="text" placeholder="Usuario o mensaje" id="search"
          className="appearance-none hidden sm:block shadow-sm bg-gray-100 rounded border-slate focus:border-purple-700"
          onInput={updateSearchAndDispatch} value={search}>
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
                <CustomMenuItem>
                  {(active: boolean) => (<><DatabaseIcon className={`${active? 'text-white': 'text-purple-700'} w-5 h-5 mr-2`}/> Agregar Batch</>)}
                </CustomMenuItem>
                <CustomMenuItem onClick={logout}>
                  {(active: boolean) => (<><LogoutIcon className={`${active? 'text-white': 'text-purple-700'} w-5 h-5 mr-2`}/> Salir</>)}
                </CustomMenuItem>
              </div>
            </Menu.Items>
          </Transition>
      </Menu>
      <SearchModal search={search} updateSearch={updateSearch} isOpen={modalState} closeModal={closeModal}/>
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

const SearchModal = (props: {search: string, updateSearch: (value: SearchEvent) => void, isOpen: boolean, closeModal: () => void}) => {
  let {search, updateSearch, isOpen, closeModal} = props

  const closeModalAndDispatch = () => {
    closeModal()
    store.dispatch(update(search))
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Busca una publicación
                </Dialog.Title>
                <div className="mt-2">
                <input type="text" placeholder="Usuario o mensaje" id="search"
                  className="appearance-none w-full shadow-sm bg-gray-100 block rounded border-slate focus:border-purple-700"
                  onInput={updateSearch} value={search}>
                </input>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-100 border border-transparent rounded-md hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
                    onClick={closeModalAndDispatch}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Header