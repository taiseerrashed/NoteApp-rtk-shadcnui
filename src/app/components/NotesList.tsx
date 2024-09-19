import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { useNotes } from "@/hooks/useNotes";
import { INote } from "@/redux/slices/notesSlice";

interface NotesListProps {
    onEdit: (note: INote) => void;
}

const NotesList = ({onEdit}: NotesListProps) => {
    const {notes, removeNote } = useNotes();

  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Notes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => {
                return (
                    <Card key={note.id} className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{note.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{note.content}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button className="bg-blue-500" onClick={() => onEdit(note)}>
                                Edit
                            </Button>
                            <Button className="bg-red-500" onClick={() => removeNote(note.id)}>
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    </div>
  );
};

export default NotesList;
