import React, { useContext, useEffect, useState } from "react";
import Heading from "../headings/Heading";
import CreateGroup from "../creategroup/CreateGroup";
import {NotesContext} from "../../notescontext/UseNotesContext";
import "./SideBar.css";

function SideBar(){

    const {hideSideBar} = useContext(NotesContext);

    const [sbtitles, setSbTitles] = useState([]);
    const [expandPopup, setExpandPopup] = useState(false);
    const [groupHeading, setGroupHeading] = useState(localStorage.getItem("grpNames") || []);
    
    useEffect(() => {
        const data = localStorage.getItem("grpNames");
        if(data){
            setGroupHeading(JSON.parse(data));
        }
    },[]);

    useEffect(() => {if(groupHeading.length > 0) {
        const obj = JSON.parse(localStorage.getItem("grpNames"));
        const resultobj = Object.keys(obj).map((key) => [obj[key]]);
        setSbTitles(resultobj);
    }
    }, [groupHeading]);

    const ClickEvent = () =>{
        setExpandPopup(true);
    };

    const ClickClose = () => {
        setExpandPopup(false);
    };

    return (
        <div className={`sb-container ${hideSideBar && "hidden"}`}>
            <div className="sb-title">Pocket Notes</div>
                <div className="sb-notes-title">{
                    sbtitles.length > 0 ? (
                        sbtitles.map((title, index) => <Heading key={index} title={title} />)
                    ) : ( 
                        <div></div>
                    )
                }
                </div>
                {
                    expandPopup && (
                        <div className="sb-popup">
                            <CreateGroup groupHeading={groupHeading} setGroupHeading={setGroupHeading} popupClose={ClickClose}/>
                        </div>
                    )
                }   
                <div className="sb-create-grp-btn">
                    <button className="create-grp-btn" onClick={ClickEvent}>
                      +
                    </button>
                </div>
            </div>
    );
}

export default SideBar;