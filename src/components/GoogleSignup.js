import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router"
import { signupApi } from '../services/api';
import { useState,useContext} from "react";
import { UserContext } from "../context/User/UserLoggedin";
import Alert from './Alert';

function SignupGoogle() {
    const [userLoggedin,setuserLoggedin]=useContext(UserContext);
    const [error, seterror] = useState("");
    const [hide, sethide] = useState("hidden");
    

    const history = useHistory();

    const ResponseSuccessGoogle = async (response) => {
        
        const password =  response.profileObj.googleId;
        const email =  response.profileObj.email;
        const name= response.profileObj.name;
        
        Promise.resolve(signupApi({name,email,password})).then(res => {
            localStorage.setItem("token", res.data.token);
            setuserLoggedin({...userLoggedin, userImg: response.profileObj.imageUrl,isLoggedIn: true})
            history.push("/");
        }).catch((e)=>{
            // console.log(e.response.data);
            seterror(e.response.data.error);
            sethide("block");
            setTimeout(() => {
                sethide("hidden");
                if(e.response.status!==500){
                    history.push("/login")
                }
            }, 3000);
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
                        buttonText="Signup with google"
                        onSuccess={ResponseSuccessGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </>
    )
}

export default SignupGoogle;