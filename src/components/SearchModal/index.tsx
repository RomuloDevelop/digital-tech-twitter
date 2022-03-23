import { Dialog, Transition } from "@headlessui/react"
import { FormEvent, Fragment, useState } from "react"
import { store } from "../../store"
import { update } from "../../store/search"

type Props = {isOpen: boolean, closeModal: () => void}

const SearchModal = (props: Props) => {
  const {isOpen, closeModal} = props

  const [search, setSearch] = useState('')

  const closeModalAndDispatch = () => {
    closeModal()
    store.dispatch(update(search))
  }

  const handdleInput = (event: FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  return (
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
                onInput={handdleInput} value={search}>
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
  )
}

export default SearchModal