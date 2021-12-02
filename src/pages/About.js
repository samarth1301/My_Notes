import React, { useContext, useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/User/UserLoggedin'
import { BiUser } from "react-icons/bi";
import { getUser } from "../services/api";
import Alert from '../components/Alert';
import NoteContext from '../context/notes/NoteContext';


const MobAbout = () => {
    const [userLoggedin] = useContext(UserContext);
    const [noteState]=useContext(NoteContext);
    const [error, seterror] = useState("");
    const [hide, sethide] = useState("hidden");
    const history = useHistory();
    const [about, setabout] = useState({
        name: "",
        email: "",
        phoneNumber: null,
        date: "",
        count:noteState.length
    })
    // eslint-disable-next-line
    useEffect(() => {
        Promise.resolve(
            getUser()
            ).then(res => {
                
                setabout({
                    ...about,
                    name: res.data.name,
                    email: res.data.email,
                    phoneNumber: res.data.phoneNumber,
                    date: res.data.date,
                     
                })
            }).catch((e) => {
                if (e.response.data.error === "jwt expired") {
                    seterror("Login again");
                }
                else{
                    seterror(e.response.data.error);
                }
                sethide("block");
                setTimeout(() => {
                    sethide("hidden");
                    history.push("/login");
                }, 2000);
            })
            
        }, [])


    return (
        <>
            <div className={`${hide}`}>
                <Alert message={error} color="red" />

            </div>
            <div className="flex flex-col items-center py-2 gap-16 md:mx-40" >
                {
                    userLoggedin.userImg ?
                        <img
                            className="h-44w-44 rounded-full"
                            src={userLoggedin.userImg}
                            alt="profile pic"
                        /> :
                        <BiUser className="w-40 h-40 rounded-full bg-blue-400 text-white " />
                }
                <h2 className="text-xl text-center self-start md:self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-600 mb-2 ">Name: {about.name}</h2>
                <h2 className="text-xl self-end md:self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-600 mb-2 ">Email: {about.email}</h2>
                <h2 className="text-xl text-center self-start md:self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-600 mb-2 ">User since: {about.date.slice(0, 10)}</h2>
                <h2 className="text-xl text-center self-end md:self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-600 mb-2 ">No. of notes: {about.count} </h2>
                {about.phoneNumber &&
                    <h2 className="text-xl text-center self-start md:self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-600 mb-2 ">PhoneNumber: {about.phoneNumber}</h2>
                }

            </div>
        </>
    )
}

function About() {
   
    
    return (
        <>
            <MobAbout />
        </>
    )
}

export default About
