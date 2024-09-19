import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface INote {
    id: number;
    title: string;
    content: string;
};

interface INotesState {
    notes: INote[];
};

const initialState:INotesState = {
    notes: [{
        id: Date.now(),
        title: "Title 1",
        content: "Lorem ipsum......."
    }],
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<INote>) => {
            state.notes.push(action.payload);
        },
        editNote: (state, action:PayloadAction<INote>) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id);            
            if(index !== -1){
                state.notes[index] = action.payload;
            }
        },
        deleteNote: (state, action:PayloadAction<number>) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
    },
});

export const {addNote, editNote, deleteNote} = notesSlice.actions;
export default notesSlice.reducer;
