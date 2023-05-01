import { defineStore } from "pinia";
import { getAllNotes } from "@/http/notes-api";
import { ref } from "vue";

interface Note {
  id: number;
  note: string;
  importance: number;
}

export const useNotesStore = defineStore("notes", () => {
  const allNotes = ref<Note[]>([]);

  const allNotesHandler = async () => {
    try {
      const { data } = await getAllNotes();

      const fetchedNotes: Note[] = data.data;
      allNotes.value = fetchedNotes;

      console.log(allNotes.value);
    } catch (error) {
      console.log("CHYBA: ", error);
    }
  };

  return {
    allNotesHandler,
    allNotes,
  };
});
