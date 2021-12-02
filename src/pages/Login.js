import React, {useState, useEffect,useContext} from 'react';
import { useHistory } from "react-router-dom";
import Alert from '../components/Alert';
import GoogleLogin from '../components/GoogleLogin';
import {loginApi} from '../services/api';
import { UserContext } from "../context/User/UserLoggedin";
const Login = () => {
    const [userLoggedin,setuserLoggedin]=useContext(UserContext);
    let loginError="";
    const history=useHistory();
    const [error, seterror] = useState("");
    const [hide, sethide] = useState("hidden");

    const [bgColor, setBgColor] = useState("gray-800")
    const [cursor, setCursor] = useState("not-allowed")
    const [password, setPass] = useState("")
    const [email, setEmail] = useState("")
    const passHandle=(e)=>{
      setPass(e.target.value)
  }
    const emailHandle=(e)=>{
      setEmail(e.target.value)
    }
    
    useEffect(() => {
        if(password.length>4 && email.length>10 && email.includes("@")){
            setBgColor("green-300")
            setCursor("pointer")
        }else{
            setBgColor("gray-500")
            setCursor("not-allowed")
        }
    }, [password, email])
    const loginUserHandle =  (e) => {
        e.preventDefault()
        Promise.resolve(loginApi({password, email})).then(res =>{
            localStorage.setItem("token",res.data.token);
            setuserLoggedin({...userLoggedin,isLoggedIn: true});
            history.push("/");
        }).catch((e)=>{
            
            if(Array.isArray(e.response.data.errors)){
                loginError=e.response.data.errors[0].msg;
            }
            else{
                loginError=e.response.data.error
            }
            console.log(loginError);
            seterror(loginError);
            sethide("block");
            setTimeout(() => {
                sethide("hidden");
            }, 4000);
        })
    }

    return (
        <>
        <div className={hide}>
            <Alert message={loginError} color="red"/>
        </div>
         <div className={`${hide}`}>
             <Alert  message={error} color="red"/>

        </div>
        <div className="flex justify-center text-center items-center  md:h-screen w-full rounded-lg border border-gray-300">
            <div className="  rounded-md bg-gradient-to-br from-green-200 to-blue-400">
                <h2 className="text-2xl font-semibold my-3">Login</h2>
                <form className="my-3">
                    <input type="text" placeholder="email" className="border border-gray-300 rounded-md text-center m-2 p-2 w-4/5" onChange={emailHandle} value={email}/>
                    <input type="password" placeholder="password" className="border border-gray-300 rounded-md text-center m-2 p-2 w-4/5" onChange={passHandle} value={password}/>
                </form>
                <form>
                <button className={` bg-${bgColor} rounded-md p-2 px-6 mb-3 cursor-${cursor}`}onClick={loginUserHandle}>Login</button>
                </form>
                <hr className="mx-8 my-3"/>
                <p className="text-xl text-gray-500 my-3">Or</p>
                {/* <button className="mb-4 bg-white px-3 py-2 rounded-lg">Login with google</button> */}
                <GoogleLogin/>
            </div>
        </div>
        </>
    )
}

export default Login