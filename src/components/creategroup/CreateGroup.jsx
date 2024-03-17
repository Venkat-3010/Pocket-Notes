import { useEffect, useRef, useState } from 'react';
import "./CreateGroup.css";

const CreateGroup = ({ popupClose, groupHeading, setGroupHeading }) => {
    const[groupName, setGroupName] = useState("");
    const[grpColor, setGrpColor] = useState("");
    const[err, setErr] = useState(false);

    const popupRef = useRef(null);

    const handlegrpName = (e) =>{
        setGroupName(e.target.value);
        setErr(false);
    };

    const groupColors = [
        "#B38BFA",
        "#FF79F2",
        "#43E6FC",
        "#F19576",
        "#0047FF",
        "#6691FF",
    ]

    const handleGrpColors = (color) =>{
        setGrpColor(color);
        setErr(false);
    };

    const saveGrpName = () => {
        if(!groupName || !grpColor){
            setErr(true);
            return;
        }
        const newGrp = { name: groupName, color:grpColor};
        setGroupHeading([...groupHeading, newGrp]);
        localStorage.setItem(
            "grpNames", JSON.stringify([...groupHeading, newGrp])
        );
        popupClose();
    };

    useEffect(() => {
        const clickOutsidePopup = (e) => {
            if(popupRef.current && !popupRef.current.contains(e.target)){
                popupClose();
            }
        };
        document.addEventListener("mousedown", clickOutsidePopup);

        return () => {
            document.removeEventListener("mousedown", clickOutsidePopup);
        }
    }, [popupClose]);

  return (
    <div className='popupContainer' ref={popupRef}>
        <div className='popupTitle'>Create New Group</div>
        <div className='popupGrpName'>
            <span>Group Name</span>
            <input type="text" value={groupName} onChange={handlegrpName} placeholder='Enter group name'/>
        </div>
        <div className='popupColorContainer'>
            <span>Choose color </span>
            <div className='popupColorInput'>
                {groupColors.map((color, index) => (
                    <div key={index} className='popupColor' style={{backgroundColor: color}} onClick={() => {handleGrpColors(color)}}></div>
                ))}
            </div>
        </div>
        <div className='popupClose'>
            <button onClick={saveGrpName} disabled={groupName.length === 0}>
                create
            </button>
        </div>
        {err && (
            <div className='popupErr'>
                Please fill in group name and choose a color!
            </div>
            )}
    </div>
  )
}

export default CreateGroup;