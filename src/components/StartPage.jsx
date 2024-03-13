import React from "react";
import image from "../assets/pocket-notes-svg.png";

const StartPage = () =>{
    return(
        <div className="sp-container">
            <div className="img-container">
                <div className="img">
                    <img src={image} alt="" />
                </div>
                <div>Pocket Notes</div>
                <p>
                Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
                </p>
            </div>
            <div>
            <p>
                end-to-end encrypted
            </p>
            </div>
        </div>
    );
} 

export default StartPage;