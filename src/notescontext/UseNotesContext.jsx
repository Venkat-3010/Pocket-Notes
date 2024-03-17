import React from "react"
import {useContext } from "react"

const NotesContext = React.createContext({
    selectedGrp: "",
    setSelectedGrp: () => {},
    hideSideBar: false,
})

const UseNotesContext = () => {
    return useContext(NotesContext);
}

export {UseNotesContext, NotesContext};