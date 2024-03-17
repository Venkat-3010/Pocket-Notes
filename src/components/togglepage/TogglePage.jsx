import React, { useCallback, useContext, useEffect, useState } from 'react'
import back from "../../assets/back.png"
import send from "../../assets/send.png"
import ToggleContent from '../togglecontent/ToggleContent'
import "./TogglePage.css"
import { NotesContext } from '../../notescontext/UseNotesContext'

const TogglePage = () => {

    const {
        hideSideBar,
        setHideSideBar,
        mobileView,
        selectedGrp,
        webNotes,
        setWebNotes,
    } = useContext(NotesContext);

    const [textNotes, setTextNotes] = useState("");
    const [newgrpColor, setNewGrpColor] = useState("#ccc");
    const [headingLetters, setHeadingLetters] = useState("");
    const [headingName, setHeadingName] = useState("")

    useEffect(() => {
        setTextNotes(JSON.parse(localStorage.getItem(selectedGrp)) || []);
        const grpNames = JSON.parse(localStorage.getItem("grpNames"));
        const newSelectedGrp = grpNames.find((grp) => grp.name === selectedGrp);
        if(newSelectedGrp){
            setNewGrpColor(newSelectedGrp.color);
            setHeadingLetters( newSelectedGrp.name[0]
                .split(" ")
                .map((word) => word.charAt(0))
                .join(" ")
                .toUpperCase()
            );
            setHeadingName( 
                newSelectedGrp.name[0]
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            );
        }
    }, [selectedGrp]);

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            saveWebNote();
        }
    }

    const saveWebNote = useCallback(() => {
        const newNote = {
            id: Date.now(),
            title: selectedGrp,
            content: textNotes.trim(),
            createDate: new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
            }),
            createdTime: new Date().toLocaleTimeString(),    
        };

        const newNotes = [...webNotes, newNote]

        localStorage.setItem(selectedGrp, JSON.stringify(newNotes));

        setTextNotes("");

        setWebNotes(newNotes);
    }, [selectedGrp, textNotes, webNotes, setWebNotes]);
    
    
    const handleChange = (e) => {
        setTextNotes(e.target.value);
    };


  return (
    <div className={`tp-container ${!hideSideBar && mobileView && "hidden"}`}>
        <div className='tp-title'>
            {mobileView && (
                <div className="back-arrow" onClick={() => setHideSideBar(mobileView && false)}>
                    <img src={back} alt="back arrow" />
                </div>
            )}
            <div className='tp-title-icon' style={{backgroundColor: newgrpColor}}>
                {headingLetters}
            </div>
            <div className='tp-title-name'>{headingName}</div>
        </div>
        <div className='tp-display-content'>
            {webNotes && webNotes.length > 0
                ? webNotes.map((content, index) => (
                    <ToggleContent key={index} content={content} />
                )) : null
            }
        </div>
        <div className='tc-content-input'>
            <textarea value={textNotes} placeholder='Enter your text here...........' cols="10" rows="10" onChange={handleChange} onKeyDown={handleKeyDown}></textarea>
            <img src={send} alt="send arrow" onClick={saveWebNote}/>
        </div>
    </div>
  )
}

export default TogglePage;