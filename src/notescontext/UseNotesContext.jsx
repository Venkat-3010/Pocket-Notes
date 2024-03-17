import React from "react";
import { useContext } from "react";

const NotesContext = React.createContext({
  webNotes: [],
  setWebNotes: () => {},
  selectedGrp: "",
  setSelectedGrp: () => {},
});

const NotesProvider = ({ children }) => {
  const [webNotes, setWebNotes] = useState([]);
  const [selectedGrp, setSelectedGrp] = useState("");

  const value = {
    webNotes,
    setWebNotes,
    selectedGrp,
    setSelectedGrp,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

const useNotesContext = () => {
  return useContext(NotesContext);
}

export { NotesProvider, NotesContext, useNotesContext };
