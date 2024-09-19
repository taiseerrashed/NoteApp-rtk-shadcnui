import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import useNoteForm, { FormData } from "@/hooks/useNoteForm";
import { useNotes } from "@/hooks/useNotes";
import { INote } from "@/redux/slices/notesSlice";
import { useEffect } from "react";

interface NoteFormProps {
    note?: INote;
    mode: "create" | "edit";
    onClose: () => void;
}

const NoteForm = ({note, mode, onClose}: NoteFormProps) => {
    const { register, handleSubmit, errors, setValue, reset} = useNoteForm();
    const { createNote, updateNote } = useNotes();

    const  form = useForm<FormData>();

    useEffect(() => {
        if (mode === "edit" && note) {
            setValue("title", note.title);
            setValue("content", note.content);
        } else {
            reset();
        }
    }, [note, mode, setValue, reset]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        if (mode === "create") {
            createNote({ id: Date.now(), title: data.title, content: data.content });
        } else if (mode === "edit" && note) {
            updateNote({ id: note.id, ...data });
        }
        onClose();
    };
    
  return (
    <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{mode === "create" ? "Add Note" : "Edit Note"}</DialogTitle>
                <DialogDescription>
                    {mode === "create" ? "Create a new note" : "Edit the selected note"}
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem className="mb-4">
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <FormControl>
                            <Input id="title" {...register("title")} placeholder="Enter note title"/>
                        </FormControl>
                        <FormMessage>{errors.title?.message}</FormMessage>
                    </FormItem>

                    <FormItem className="mb-4">
                        <FormLabel htmlFor="content">Content</FormLabel>
                        <FormControl>
                            <Textarea id="content" {...register("content")} placeholder="Enter note content"/>
                        </FormControl>
                        <FormMessage>{errors.content?.message}</FormMessage>
                    </FormItem>

                    <DialogFooter>
                        <Button type="submit">Confirm</Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>  
            </Form>
        </DialogContent>
    </Dialog>
  );
};

export default NoteForm;
