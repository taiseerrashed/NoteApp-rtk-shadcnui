import { addNote, deleteNote, editNote, INote } from "@/redux/slices/notesSlice";
import { AppDispatch, RooteState } from "@/redux/store";
import {useSelector, useDispatch} from "react-redux";

export const useNotes = () => {
    const {notes} = useSelector((state: RooteState) => state.notes);
    const dispatch: AppDispatch = useDispatch();

    const createNote = (note: INote) => {
        dispatch(addNote(note));
    };

    const updateNote = (note: INote) => {
        dispatch(editNote(note));
    };
    
    const removeNote = (id: number) => {
        dispatch(deleteNote(id));
    }

    return {notes, createNote, updateNote, removeNote};
};
