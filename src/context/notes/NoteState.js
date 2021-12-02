import NoteContext from "./NoteContext";
import { useState,useContext, useEffect } from "react";
import { getNotes } from "../../services/api";
import { UserContext } from "../../context/User/UserLoggedin";
// import { useHistory} from "react-router-dom";
import Alert from "../../components/Alert";
import EditToggle from "../edit/EditToggle";
const NoteState=(props)=>{
   const [userLoggedin]= useContext(UserContext);
  
    const [notes, setnotes] = useState([]);
    const [noteUpdate, setnoteUpdate] = useState(true);
    const [color, setcolor] = useState("")
    const [error, seterror] = useState("");
    const [hide, sethide] = useState("hidden");
    // const history=useHistory();
    useEffect(() => {
        Promise.resolve(
            getNotes()
        ).then((res)=>{
            setnotes(res.data)
        }).catch((e)=>{
            
           
            if (e.response.data.error === "jwt expired" ) {
                seterror("Login again");
                setcolor("red")
            }
            if(e.response.data.error === "jwt malformed"  ){
                setcolor("green")
                seterror("logged out")
            }
            else{
                seterror(e.response.data.error)
                setcolor("red")
            }
            sethide("block");
            setTimeout(() => {
                sethide("hidden");
                
            }, 2000);
        })
        
    }, [userLoggedin,noteUpdate])
    return(
        <NoteContext.Provider value={[notes,setnotes,noteUpdate,setnoteUpdate]} >
             <div className={`${hide}`}>
                <Alert message={error} color={color}/>

            </div>
             {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;