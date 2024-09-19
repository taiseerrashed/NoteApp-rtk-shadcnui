import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const noteSchema = z.object({
    title: z.string().min(1, {message: "Title is required"}),
    content: z.string().min(1, {message: "Content is required"} ),
});

export type FormData = z.infer<typeof noteSchema>;

const useNoteForm = () => {
    const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm<FormData>({
        resolver: zodResolver(noteSchema),
    });

    return {register, handleSubmit, errors, setValue, reset};
};
export default useNoteForm;
