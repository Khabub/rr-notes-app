import type { Note } from "@/stores/notes";
import api from "./api";

const notesPath = "/api/notes";

export const getAllNotes = () => api.get(`${notesPath}`);

export const createNote = (note: Note) => api.post(notesPath, note);

export const deleteNote = (id: number) => api.delete(`${notesPath}/${id}`);

export const updateNote = (id: number, note: Note) =>
  api.put(`${notesPath}/${id}`, note);
