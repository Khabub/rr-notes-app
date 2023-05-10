import { defineStore } from "pinia";
import { getAllNotes, createNote } from "@/http/notes-api";
import { ref } from "vue";

export interface Note {
  id?: number;
  title: string;
  note: string;
  importance: string;
  created_at?: string;
}

export const useNotesStore = defineStore("notes", () => {
  const allNotes = ref<Note[]>([]);
  const textabove = ref<boolean>(true);

  const allNotesHandler = async () => {
    try {
      const { data } = await getAllNotes();

      const fetchedNotes: Note[] = data.data;
      allNotes.value = fetchedNotes;
      allNotes.value.reverse();
      console.log(allNotes.value);
      console.log(data);
    } catch (error) {
      console.log("CHYBA: ", error);
    }
  };

  const handleCreateNote = async (value: Note) => {    
    const { data: createdNote } = await createNote(value);
    allNotes.value.unshift(createdNote.data);
  };

  return {
    allNotesHandler,
    allNotes,
    textabove,
    handleCreateNote,
  };
});
