import React, { useContext, Fragment,useState } from 'react'
import { AiOutlineSearch, AiOutlineLogin } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg"
import { UserContext } from "../context/User/UserLoggedin";
import { Menu, Transition } from '@headlessui/react'
import { useHistory } from 'react-router';
import { searchNote } from '../services/api';
import NoteContext from '../context/notes/NoteContext';
import Alert from './Alert';


const ProfileDisclosure = () => {

    const history = useHistory();


    const [userLoggedin, setuserLoggedin] = useContext(UserContext);
    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    {
                        userLoggedin.userImg ?
                            <img
                                className="h-8 w-8 rounded-full"
                                src={userLoggedin.userImg}
                                alt="profile pic"
                            /> :
                            <BiUser className="w-10 h-10 rounded-full bg-blue-400 text-white " />
                    }

                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <Link
                                to="/about"
                                className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Your Profile
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    localStorage.removeItem("profile")
                                    setuserLoggedin({ ...userLoggedin, userImg: null, isLoggedIn: false })
                                    history.push("/")
                                }}
                                className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                Sign out
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

const LoginDisclosure = () => {


    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="bg-blue-400 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-1">
                    <span className="sr-only">Open user menu</span>
                    {
                        <AiOutlineLogin className="w-6 h-6 text-white" />
                    }

                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <Link
                                to="/login"
                                className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Log in
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <Link
                                to="/signup"
                                className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Sign up
                            </Link>
                        )}
                    </Menu.Item>

                </Menu.Items>
            </Transition>
        </Menu>
    )
}

const MobileNav = () => {
    const [userLoggedin] = useContext(UserContext);
    const [notes, setnotes, noteUpdate, setnoteUpdate] = useContext(NoteContext);
    const [color, setcolor] = useState("")
    const [error, seterror] = useState("");
    const [hide, sethide] = useState("hidden");
    const titleHandle = (e) => {
        if (e.target.value !== "") {
            Promise.resolve(
                searchNote(e.target.value)
            ).then(res => {

                setnotes(res.data.notes)
            }).catch((e) => {
                seterror(e.response.data.error)
                    setcolor("red")
                    setnotes([])
                
                sethide("block");
                setTimeout(() => {
                    sethide("hidden");
                    
                }, 2000);
            })
        }
        else {
            setnoteUpdate(!noteUpdate)
        }
    }
    return (
        <>
        
            <div className={`${hide}`}>
                <Alert message={error} color={color}/>

            </div>
            <div className="py-4 md:hidden flex items-center justify-between w-full ">
                <Link to="/">
                    <div className="w-24 h-16">
                        <img className="w-full h-full rounded-md" src={logo} alt="logo" />

                    </div>
                </Link>
                <div className="flex items-center" >
                    <span className=" text-red-400 ">
                        {/* toggle when logged in */}
                        {
                            (userLoggedin.isLoggedIn) ?
                                <ProfileDisclosure />
                                : <LoginDisclosure />
                        }
                    </span>
                </div>
            </div>

            <div className="flex bg-white items-center md:hidden  gap-3 shadow-md px-4">
                <div className="flex gap-2 items-center w-full ">
                    <CgNotes className="text-gray-800" />
                    <input type="text" placeholder="Search Note" name="location" id="location" onChange={titleHandle} className="py-2  w-full rounded-md text-sm px-4" />
                </div>
               
            </div>

        </>
    )

}
const LgNav = () => {
    const [userLoggedin] = useContext(UserContext);
    const [notes, setnotes, noteUpdate, setnoteUpdate] = useContext(NoteContext);
    const [color, setcolor] = useState("")
    const [error, seterror] = useState("");
    const [hide, sethide] = useState("hidden");
    const titleHandle = (e) => {
        if (e.target.value !== "") {
            Promise.resolve(
                searchNote(e.target.value)
            ).then(res => {
                // console.log(res);
                setnotes(res.data.notes)
            }).catch((e) => {
                setnotes([])
                    seterror(e.response.data.error)
                    setcolor("red")
                
                sethide("block");
                setTimeout(() => {
                    sethide("hidden");
                    
                }, 2000);

                
            })
        }
        else {
            setnoteUpdate(!noteUpdate)
        }
    }
    return (
        <>
            <div className={`${hide}`}>
                <Alert message={error} color={color}/>

            </div>
        <div className="flex items-center justify-between w-full text-gray-400 hidden md:flex ">
            <div className="flex w-4/5 justify-evenly items-center">
                <Link to="/" >
                    <div className="w-32 h-16 p-2 ">
                        <img className="w-full h-full rounded-md" src={logo} alt="logo" />
                    </div>
                </Link>
                <div className="flex bg-white items-center px-2 gap-3 shadow-md w-96">
                    <div className="flex gap-3 items-center w-full">
                        <CgNotes className="text-gray-800" />
                        <input type="text" placeholder="Search Note" onChange={titleHandle} name="location" id="location" className="p-2 w-full rounded-md text-md px-4" />
                    </div>
                    
                </div>
            </div>
            {
                (userLoggedin.isLoggedIn) ?
                    <ProfileDisclosure /> :

                    <div className="flex px-2 gap-5" >
                        <Link to="/login">
                            Log In
                        </Link>
                        <Link to="/signup">
                            Sign Up
                        </Link>
                        {/* if logged in give here image of user */}
                    </div>}

        </div>
        </>
    )

}
function Navbar() {
    return (
        <>
            <nav >
                <MobileNav />
                <LgNav />
            </nav>

        </>
    )
}

export default Navbar