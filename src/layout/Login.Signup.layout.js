import React from 'react'

const Loginlayout = (props) => {
    return (
        <>
            
            <div className="w-full flex justify-center my-5">
               <h1 className="text-xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-600 mb-2 " >My notes App | Your notes on the cloud, anywhere, any device </h1>
            </div>
          {props.children}
        </>
    )
}

export default Loginlayout
