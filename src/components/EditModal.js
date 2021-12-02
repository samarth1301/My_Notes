import { Fragment, useRef, useContext, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EditContext } from '../context/edit/EditToggle'
import { updateNote } from "../services/api";
import { useParams, useHistory } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import Alert from './Alert';
export default function Example({ noteInfo }) {
  const params = useParams();

  const [open, setOpen] = useContext(EditContext)
  // const Id= noteInfo._id
  // const tag=noteInfo.tag;
  // const description=noteInfo.description;
  // const title=noteInfo.title;
  const [notes, setnotes, noteUpdate, setnoteUpdate] = useContext(NoteContext);
  const history = useHistory();
  const [error, seterror] = useState("");
  const [hide, sethide] = useState("hidden");
  const [color, setcolor] = useState("")
  const [updateNoteInfo, setupdateNoteInfo] = useState({
    title: "",
    description: "",
    tag: "",
    id: params.id
  })



  const titleHandle = (e) => { setupdateNoteInfo({ ...updateNoteInfo, title: e.target.value }) }
  const descriptionHandle = (e) => { setupdateNoteInfo({ ...updateNoteInfo, description: e.target.value }) }
  const tagHandle = (e) => { setupdateNoteInfo({ ...updateNoteInfo, tag: e.target.value }) }
  const cancelButtonRef = useRef(null)
  const onClickHandle = () => {
    Promise.resolve(
      updateNote(updateNoteInfo)
    ).then((res) => {
      seterror(res.data.message);
      setcolor("green");
      sethide("block");
      setTimeout(() => {
        sethide("hidden");
        setnoteUpdate(!noteUpdate);

        setOpen(!open);
      }, 2000);

    }).catch((e) => {
      setcolor("red");
      if (e.response.data.error === "jwt malformed" || e.response.data.error === "jwt expired") {
        seterror("Login again");
        history.push("/login")
      }
      // console.log(e.response.data.errors);
      if (Array.isArray(e.response.data.errors)) {
        seterror(e.response.data.errors[0].msg)
      }
      if (e.response.data.error) {
        seterror(e.response.data.error)

      }
      sethide("block");
      setTimeout(() => {
        sethide("hidden");

      }, 2000);
    })

  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 w-full md:w-max mx-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className={`${hide}`}>

                <Alert message={error} color={color} />

              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Edit Note
                    </Dialog.Title>
                    <div className="mt-2">
                      <input placeholder="title" value={updateNoteInfo.title} onChange={titleHandle} className="w-full h-12 border-2 border-blue-300 rounded-md text-center my-2" />
                      <textarea placeholder="description" value={updateNoteInfo.description} onChange={descriptionHandle} className="w-full h-40 p-4 border-2 border-yellow-300 rounded-md text-center my-2" />
                      <input placeholder="tag" value={updateNoteInfo.tag} onChange={tagHandle} className="w-full h-12 border-2 border-blue-300 rounded-md text-center my-2" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white hover:bg-notebook-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-notebook-400 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClickHandle}>
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}