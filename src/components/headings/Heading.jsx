import React, { useContext } from 'react'
import {NotesContext} from '../../notescontext/UseNotesContext';
import "./Heading.css"

const Heading = ({title}) => {
    
    const {selectedGrp, hideSideBar, mobileView, setSelectedGrp} = useContext(NotesContext);
    const grpHeadingLetters = title[0].name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();

    const newGrpHeadingLetters = title[0].name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const titleClickEvent = () => {
        setSelectedGrp(title[0].name);
        if(mobileView){
            hideSideBar(true);
        }
    };
    
    return (
    <div onClick={titleClickEvent} className={`grp-heading-icon ${
        selectedGrp === title[0].name ? "icon-highlighted" : null
    }`}>
        <div className='title-icon' style={{backgroundColor: title[0].color}}>
            {grpHeadingLetters}
        </div>
        <div className='title-name'>
            {newGrpHeadingLetters}
        </div>
    </div>
  )
}

export default Heading