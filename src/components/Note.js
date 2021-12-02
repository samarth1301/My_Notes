import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext'
import EditModal from './EditModal'
import { delNote, specificNote } from '../services/api';
import Alert from './Alert';
import  { EditContext } from '../context/edit/EditToggle';

const Note = () => {
  
    const history = useHistory();
    const [notes, setnotes, noteUpdate, setnoteUpdate] = useContext(NoteContext);
    const [open, setOpen]=useContext(EditContext);
    
    const params = useParams();
    
    const [error, seterror] = useState("");
    const [hide, sethide] = useState("hidden");
    const [color, setcolor] = useState("")
    const [noteInfo, setnoteInfo] = useState({})
    useEffect(() => {
        
        Promise.resolve(
            specificNote(params.id)
            ).then((res) => {
                
                setnoteInfo({
                    ...res.data
                })
            }).catch(e => {
                if (e.response.data.error === "jwt malformed" || e.response.data.error === "jwt expired" ) {
                    seterror("Login again");
                }
                setcolor("red");
                sethide("block");
                setTimeout(() => {
                    sethide("hidden");
                    history.push("/login");

            }, 2000);
        })


    }, [open]);
    const editHandle=()=>{
        setOpen(!open);
    }
    const doneHandle = () => {
        Promise.resolve(
            delNote(params.id)
        ).then((res)=>{
            seterror(res.data.message);
            setcolor("green");
            sethide("block");
            setTimeout(() => {
                sethide("hidden");
                setnoteUpdate(!noteUpdate);
                history.push("/");
            }, 2000);
        }).catch((e)=>{
            setcolor("red");
            if(e.response.data.error === "jwt malformed" || e.response.data.error === "jwt expired") {
              seterror("Login again");
              history.push("/login")
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
        <EditModal noteInfo={noteInfo}/>
            
            <div className={`${hide}`}>
                <Alert message={error} color={color} />

            </div>
            <div className="w-full md:w-2/3 flex flex-col items-center mx-auto bg-gradient-to-br  from-yellow-200 to-blue-400 rounded-xl p-4 relative">
                <div className="flex w-full justify-center align-center mb-4 " >
                    <h2 className="text-lg font-bold "> {noteInfo.title} </h2>
                </div>

                <div className="bg-transparent mx-auto break-words w-full md:w-1/2 mx-6 h-max mb-4 relative flex text-center flex-col gap-5 rounded-lg p-6" >


                    <p className="text-md text-gray-800 ">{noteInfo.description} </p>

                    <p className="text-md text-gray-800 font-bold">Created on: {noteInfo.date && noteInfo.date.slice(0, 10)}</p>


                </div>
                <div className="text-md text-gray-800 absolute top-0  right-0
                                        rounded-full bg-yellow-300 p-3">{noteInfo.tag}</div>
                <div className="w-full  flex gap-5 flex-col md:flex-row justify-end" >
                    <button onClick={editHandle} className="bg-yellow-200 rounded-xl py-2 px-8">Edit Task</button>
                    <button onClick={doneHandle} className="bg-yellow-200 rounded-xl py-2 px-8">Task Done</button>
                </div>
            </div>
        </>
    )
}

export default Note
