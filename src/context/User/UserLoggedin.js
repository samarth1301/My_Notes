import React,{createContext,useState,useEffect} from 'react'
import Alert from '../../components/Alert';

import { getUser } from '../../services/api';
export const UserContext= createContext();
const UserLoggedin = (props) => {
    const [error, seterror] = useState("");
    const [hide, sethide] = useState("hidden");
   
    const [userLoggedin, setuserLoggedin] = useState({
        isLoggedIn: false,
        userImg:null
    })
    useEffect(() => {
        Promise.resolve(
            getUser()
            ).then(res => {
                
                setuserLoggedin({
                    ...userLoggedin,
                    isLoggedIn:true,
                     userImg: localStorage.getItem("profile")
                })
            }).catch((e) => {
                if (e.response.data.error === "jwt expired" ) {
                    seterror("Login again");
                }
                if(e.response.data.error === "jwt malformed"  ){
                    seterror("logged out")
                }
                else{
                    seterror(e.response.data.error)
                }
                sethide("block");
                setTimeout(() => {
                    sethide("hidden");
                    

            }, 2000);
            })
            
        }, [])
    return (
        <UserContext.Provider value={[userLoggedin,setuserLoggedin]} >
            <div className={`${hide}`}>
                <Alert message={error} color="red" />
                
            </div>
            {props.children}
        </UserContext.Provider>
            
        
    )
}

export default UserLoggedin
