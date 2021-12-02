import React,{useState, useEffect,useContext} from 'react';
import { UserContext } from "../context/User/UserLoggedin";
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';
import { signupApi } from "../services/api";
import GoogleSignUp from '../components/GoogleSignup';

const Signup = () => {
    const [userLoggedin,setuserLoggedin]=useContext(UserContext);

    const history=useHistory();
    const [error, seterror] = useState("");
    const [info, setinfo] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        password:"",
        cnfpassword:""
    })
    const [hide, sethide] = useState("hidden");
    const [cursor, setcursor] = useState("not-allowed")
    const nameHandle=(e)=>{setinfo({...info, name:e.target.value})}
    const emailHandle=(e)=>{setinfo({...info, email:e.target.value})}
    const phoneHandle=(e)=>{setinfo({...info, phoneNumber:e.target.value})}
    const passHandle=(e)=>{setinfo({...info, password:e.target.value})}
    const cnfPassHandle=(e)=>{setinfo({...info, cnfpassword:e.target.value})}
    useEffect(() => {
        if(info.password===info.cnfpassword && info.password.length>=4){
            setcursor("pointer")
        }
        else{
            setcursor("not-allowed")
        }
        
    }, [info.password, info.cnfpassword])
   
        
        
   
    const addUserHandle =  (e) => {
        if(info.name==="" || info.email===""){
            return
        }
        e.preventDefault()
        Promise.resolve(signupApi(info)).then(res =>{
            localStorage.setItem("token",res.data.token);
            setuserLoggedin({...userLoggedin,isLoggedIn: true})
            history.push("/");
        }).catch((e)=>{
            
            seterror(e.response.data.error);
            sethide("block");
            setTimeout(() => {
                sethide("hidden");
            }, 4000);
        })
        
    }
    return (
        <>
        <div className={`${hide}`}>
             <Alert  message={error} color="red"/>

        </div>
        <div className="w-full mx-auto md:w-1/2 bg-gradient-to-br from-green-200 to-blue-400 rounded-xl p-4" >
            <h2 className="text-lg font-bold mx-5 text-center" >New User? Sign up to start creating free notes, accessible from anywhere anytime.</h2>
            <form onSubmit={addUserHandle} > {/* call a function here*/}
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-transparent sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                                    Name
                      </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-md border-gray-300 rounded-md p-2"
                                    value={info.name}
                                    onChange={nameHandle}
                                />
                            </div>




                            <div className="col-span-6">
                                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                    Email
                      </label>
                                <input
                                    
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    autoComplete="email"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-md border-gray-300 rounded-md p-2"
                                    value={info.email}
                                    onChange={emailHandle}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                <label htmlFor="phone-number" className="block text-lg font-medium text-gray-700">
                                    Phone-number
                                </label>
                                <input
                                    type="number"
                                    name="phone-number"
                                    id="phone-number"
                                    autoComplete="address-level2"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-md  border-gray-300 rounded-md p-2"
                                    value={info.phoneNumber}
                                    onChange={phoneHandle}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-6 lg:col-span-4">
                                <label htmlFor="pass" className="block text-lg font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    required
                                    type="password"
                                    name="pass"
                                    id="pass"
                                    autoComplete="pass"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-md  border-gray-300 rounded-md p-2"
                                    value={info.password}
                                    onChange={passHandle}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-6 lg:col-span-4">
                                <label htmlFor="cnfpass" className="block text-lg font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                required
                                    type="password"
                                    name="cnfpass"
                                    id="cnfpass"
                                    autoComplete="pass"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-md  border-gray-300 rounded-md p-2"
                                   value={info.cnfpassword}
                                    onChange={cnfPassHandle}
                                />
                            </div>


                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button  
                        type="submit"
                            disabled={cursor==="not-allowed"}         
                            onClick={addUserHandle}
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-${cursor} `}
                        >
                           Create Account
                  </button>
                    </div>
                </div>
            </form>
            <hr className="my-4"/>
            <GoogleSignUp/>
        </div>
        </>
    )
}

export default Signup
