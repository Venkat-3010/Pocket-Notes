import { useContext } from 'react'
import {NotesContext} from '../../notescontext/UseNotesContext';
import "./Heading.css"

const Heading = ({title}) => {
    
    const {selectedGrp} = useContext(NotesContext);
    const grpHeadingLetters = title[0].name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();

    const newGrpHeadingLetters = title[0].name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    
    return (
    <div className={`grp-heading-icon ${
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