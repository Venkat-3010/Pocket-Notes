import './App.css'
import StartPage from './components/startpage/StartPage'
import SideBar from './components/sidebar/SideBar';
import TogglePage from './components/togglepage/TogglePage';
import {NotesContext} from './notescontext/UseNotesContext';
import { useEffect, useState } from 'react';

function App() {

  const [selectedGrp, setSelectedGrp] = useState("");
  const [webNotes, setWebNotes] = useState([]);
  const [mobileView, setMobileView] = useState(window.innerWidth < 750);

  useEffect(() => {
    const ResizeWindow = () => {
      setMobileView(window.innerWidth < 750);
    };

    window.addEventListener("resize", ResizeWindow);

    return() => {
      window.removeEventListener("resize", ResizeWindow);
    };
  }, []);

  const contextValue ={
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
          {mobileView ? (
            !selectedGrp ? (
              <SideBar />
            ) : (
              <TogglePage />
            )
          ) : (
            !selectedGrp ? (
              <>
                <SideBar />
                <StartPage />
              </>
            ) : (
              <>
                <SideBar />
                <TogglePage />
              </>
            )
          )}
        </div>
    </NotesContext.Provider>
  );
}

export default App
