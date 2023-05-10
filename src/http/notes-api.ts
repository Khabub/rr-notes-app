import type { Note } from "@/stores/notes";
import api from "./api";

const notesPath = "/api/notes";



export const getAllNotes = () => api.get(`${notesPath}`);

export const createNote = (note: Note) => api.post(notesPath, note);
