import React, { useCallback, useContext, useEffect, useState } from 'react'
import back from "../../assets/back.png"
import send from "../../assets/send.png"
import ToggleContent from '../togglecontent/ToggleContent'
import "./TogglePage.css"
import { NotesContext } from '../../notescontext/UseNotesContext'

const TogglePage = () => {

    const {
        mobileView,
        selectedGrp,
        webNotes,
        setWebNotes,
        setSelectedGrp,
    } = useContext(NotesContext);

    const [textNotes, setTextNotes] = useState("");
    const [newgrpColor, setNewGrpColor] = useState("#ccc");
    const [headingLetters, setHeadingLetters] = useState("");
    const [headingName, setHeadingName] = useState("")

    useEffect(() => {
        const storedNotes = localStorage.getItem(selectedGrp);
        if(storedNotes){
            setWebNotes(JSON.parse(storedNotes));
        } else {
            setWebNotes([]);
        }
    }, [selectedGrp, setWebNotes]);

    useEffect(() => {
        const storedGroups = JSON.parse(localStorage.getItem('grpNames'));
        const selectedGroup = storedGroups.find(group => group.name === selectedGrp);
        if (selectedGroup){
            const nameWords = selectedGroup.name.split(' ')
            const initials = nameWords.map(word => word.charAt(0)).join('').toUpperCase();
            setHeadingLetters(initials);
            setHeadingName(selectedGroup.name);
        }
    }, [selectedGrp]);

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            saveWebNote();
        }
    }

    const saveWebNote = () => {
        if(textNotes.trim() === ''){
            return;
        }

        const currenttime= new Date();
        const formattedDate = `${currenttime.getDate()} ${getMonthName(currenttime.getMonth())} ${currenttime.getFullYear()}`;
        const formattedTime = `${currenttime.getHours() % 12 || 12}:${currenttime.getMinutes().toString().padStart(2, '0')}${currenttime.getHours() >= 12? 'PM' : 'AM'}`;
        const newNote = {
            id: Date.now(),
            title: selectedGrp,
            content: textNotes,
            date: formattedDate,
            time: formattedTime,   
        };

        setWebNotes([...webNotes, newNote]);
        localStorage.setItem(selectedGrp, JSON.stringify([...webNotes, newNote]));
        setTextNotes("");
    };

    const getMonthName = (monthIndex) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthIndex];
    }

    const BackArrowClick = () => {
        setSelectedGrp("");
    }
    
    
    const handleChange = (e) => {
        setTextNotes(e.target.value);
    };


  return (
    <div className="tp-container">
        <div className='tp-title'>
            {mobileView && (
                <div className="back-arrow" onClick={BackArrowClick}>
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