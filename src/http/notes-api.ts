import api from "./api";

const notesPath = "/api/notes";

export const getAllNotes = () => api.get(`${notesPath}`);

