import './App.css'
//import StartPage from './components/startpage/StartPage'
import SideBar from './components/sidebar/SideBar';
import TogglePage from './components/togglepage/TogglePage';
import {NotesContext} from './notescontext/UseNotesContext';
import { useEffect, useState } from 'react';

function App() {

  const [selectedGrp, setSelectedGrp] = useState("");
  const [hideSideBar, setHideSideBar] = useState(false);
  const [webNotes, setWebNotes] = useState([]);
  const [mobileView, setMobileView] = useState(window.innerWidth < 750);

  useEffect(() => {
    const handleWindowResize = () => {
      setMobileView(Window.innerWidth < 750);
      if(window.innerWidth > 750){
        setHideSideBar(false);
      }
    };

    const handleEscapeKey = (e) => {
      if(e.key === "Escape"){
        setHideSideBar(true);
      }
    };

    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("keydown", handleEscapeKey);

    return() => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);


  const contextValue ={
    hideSideBar: hideSideBar,
    setHideSideBar: setHideSideBar,
    webNotes: webNotes,
    setWebNotes: setWebNotes,
    setMobileView:setMobileView,
    mobileView: mobileView,
    selectedGrp: selectedGrp,
    setSelectedGrp: setSelectedGrp,
  }

  return (
    <NotesContext.Provider value={contextValue}>
        <div className='app'>
          <SideBar />
          <TogglePage />
        </div>
    </NotesContext.Provider>
  )
}

export default App
