import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router"
import { loginApi } from '../services/api';
import { useState,useContext} from "react";
import { UserContext } from "../context/User/UserLoggedin";
import Alert from './Alert';


function LoginGoogle() {
    const [userLoggedin,setuserLoggedin]=useContext(UserContext);
    
    const history = useHistory();
    const [error, seterror] = useState("");
    const [hide, sethide] = useState("hidden");

    const ResponseSuccessGoogle = async (response) => {
        const password =  response.profileObj.googleId
        const email=  response.profileObj.email
     
        Promise.resolve(loginApi({ password, email })).then(res => {
            localStorage.setItem("profile",response.profileObj.imageUrl)
            setuserLoggedin({...userLoggedin, userImg: response.profileObj.imageUrl,isLoggedIn: true})
            localStorage.setItem("token", res.data.token);
            history.push("/");
        }).catch((e)=>{
            
            seterror(e.response.data.error);
            sethide("block");
            setTimeout(() => {
                sethide("hidden");
                if(e.response.status!==500){
                    history.push("/login")
                }
            }, 3000);
            // history.push("/signup");
        })
    }
    return (
        <>
        <div className={hide} >
            <Alert message={error} color="red" />
        </div>
            <div className="my-3  flex">
                <div className="m-auto rounded-lg">
                    <GoogleLogin
                        clientId="506731579846-gu9sl3k4i0b3d3k2aodh61lo06p54ob1.apps.googleusercontent.com"
                        buttonText="Login with google"
                        onSuccess={ResponseSuccessGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </>
    )
}

export default LoginGoogle;