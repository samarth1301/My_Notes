import React, { useContext,useState } from 'react'
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import NoteContext from '../context/notes/NoteContext';
import { UserContext } from "../context/User/UserLoggedin";
import { addNote } from '../services/api';
function Home() {
    const [notes,setnotes,noteUpdate,setnoteUpdate]=useContext(NoteContext);
    const[userLoggedin]=useContext(UserContext);
    const [color, setcolor] = useState("")
    const [error, seterror] = useState("");
    const [hide, sethide] = useState("hidden");
    const [newNote, setnewNote] = useState({
      title:"",
      description:"",
      tag:""
    })
    const handleChangeTitle=(e)=>{
      setnewNote({...newNote, title: e.target.value})
    }
    const handleChangeDescription=(e)=>{
      setnewNote({...newNote, description: e.target.value})
    }
    const handleChangeTag=(e)=>{
      setnewNote({...newNote, tag: e.target.value})
    }
    const addNoteHandle=(e)=>{
        e.preventDefault()
        Promise.resolve(
          addNote(newNote)
        ).then(res=>{
          setnewNote({
            title:"",
            description:"",
            tag:""
          })
          setnoteUpdate(!noteUpdate)
          seterror("New Note Created");
          setcolor("green");
          sethide("block");
            setTimeout(() => {
                sethide("hidden");
            }, 2000);
        }).catch((e)=>{
          setcolor("red");
          if(e.response.data.error === "jwt malformed" || e.response.data.error === "jwt expired") {
            seterror("Login again");
        }
        // console.log(e.response.data.errors);
        if(Array.isArray(e.response.data.errors)){
          seterror(e.response.data.errors[0].msg)
        }
        if(e.response.data.error){
          seterror(e.response.data.error)

        }
        sethide("block");
        setTimeout(() => {
            sethide("hidden");
            
        }, 2000);
        })
    }
    return (
        <>
        
        <div className={`${hide}`}>
                <Alert message={error} color={color}/>

            </div>
            <div className="flex flex-col  gap-20  justify-evenly items-center my-20">
                <div className="w-full  bg-gradient-to-br from-green-200 to-blue-400 rounded-xl">
                    {/* code for adding task form */}
                    <h2 className="text-lg font-bold mx-5" >Add a note</h2>
                    <form onSubmit={addNoteHandle}  > {/* call a function here*/}
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-transparent sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        value={newNote.title}
                        onChange={handleChangeTitle}
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="title"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-md border-gray-300 rounded-md p-1"
                      />
                    </div>

                   

                    
                    <div className="col-span-6">
                      <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                      value={newNote.description}
                      onChange={handleChangeDescription}
                        type="text"
                        name="description"
                        id="description"
                        autoComplete="description"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-md border-gray-300 rounded-md p-1"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="tag" className="block text-lg font-medium text-gray-700">
                        Tag
                      </label>
                      <input
                      value={newNote.tag}
                      onChange={handleChangeTag}
                        type="text"
                        name="tag"
                        id="tag"
                        autoComplete="tag"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-md  border-gray-300 rounded-md p-1"
                      />
                    </div>
                    

                   

                   
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </form>
                </div>
                <div className="w-full bg-gradient-to-br from-yellow-200 to-blue-400 rounded-xl p-4">
                    <div className="flex w-full justify-center align-center mb-4 " >
                        <h2 className="text-lg font-bold "> Your notes </h2>
                    </div>

                    {userLoggedin.isLoggedIn?
                    notes.length>0?
                      <div className="flex justify-evenly flex-wrap  " >
                        {
                            notes.slice(0).reverse().map((note)=>{
                      
                                return(
                                  
                                  <div className="bg-white flex flex-col justify-between break-words w-full md:w-1/4 mx-6 h-max mb-4 relative  rounded-lg p-6" >
                                      <Link to={`/note/${note._id}`}>
                                        <h3 className="text-lg font-extrabold my-8" >{note.title} </h3>
                                        <p className="text-md text-gray-800 my-8">{note.description} </p>
                                   
                                        <div className="text-md text-gray-800 absolute top-0  right-0
                                        rounded-full bg-yellow-300 p-3">{note.tag}</div>
                                        <p className="text-md text-gray-800 font-bold">Created on: {note.date.slice(0,10)}</p>

                                   </Link>
                                    </div>

                                )
                            })
                        }
                    </div>:
                    <div className="flex justify-center gap-3 p-4 items-center flex-col bg-gradient-to-br from-blue-200 to-blue-600 rounded-xl" >
                    <h1 className="text-xl text-white text-center " >No notes found, Maybe add one ?</h1>
                  </div>
                    :
                    <div className="flex justify-center gap-3 p-4 items-center flex-col bg-gradient-to-br from-blue-200 to-blue-600 rounded-xl" >
                      <h1 className="text-xl text-white text-center " >Cant see your notes? try logging in.</h1>
                      <h1 className="text-xl text-white text-center " >New to this website, why dont you sign up?</h1>
                    </div>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Home
