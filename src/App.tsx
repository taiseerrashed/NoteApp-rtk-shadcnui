import { useState } from "react";
import "./App.css";
import Header from "./app/components/Header";
import NoteForm from "./app/components/NoteForm";
import NotesList from "./app/components/NotesList";
import { Button } from "./components/ui/button";
import { INote } from "./redux/slices/notesSlice";

function App() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [editNoteData, setEditNoteData] = useState<INote | null>(null);
  
  const handleEdit = (note: INote) => {
    setFormOpen(true);
    setEditNoteData(note);
  };
  const handleCloseForm = () => {
    setFormOpen(false);
    setEditNoteData(null)
  };

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-60px)] bg-gray-100 p-6">
        <div className="container mx-auto">
          <Button className="mb-4 block mx-auto" onClick={() => setFormOpen(true)}>
              Add Note
          </Button>
          {isFormOpen && <NoteForm note={editNoteData ||undefined} mode={editNoteData ? "edit" : "create"} onClose={handleCloseForm}/>}
          <NotesList onEdit={handleEdit} />
        </div>
      </div>
    </>
  );
}

export default App;