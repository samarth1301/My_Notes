import React,{createContext,useState} from 'react'

export const EditContext=createContext();

const EditToggle = (props) => {
    const [open, setOpen] = useState(false)
    return (
        <EditContext.Provider value={[open, setOpen]}>
            {/* <Note/> */}
            {/* <EditModal/> */}
            {props.children}
        </EditContext.Provider>
    )
}

export default EditToggle
