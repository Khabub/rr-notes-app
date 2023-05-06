import { defineStore } from "pinia";
import { getAllNotes } from "@/http/notes-api";
import { ref } from "vue";

export interface Note {
  id: number;
  title: string;
  note: string;
  importance: number;
  created_at: string;
}

export const useNotesStore = defineStore("notes", () => {
  const allNotes = ref<Note[]>([]);
  const textabove = ref<boolean>(true);

  const allNotesHandler = async () => {
    try {
      const { data } = await getAllNotes();

      const fetchedNotes: Note[] = data.data;
      allNotes.value = fetchedNotes;

      console.log(allNotes.value);
      console.log(data);
    } catch (error) {
      console.log("CHYBA: ", error);
    }
  };

  return {
    allNotesHandler,
    allNotes,
    textabove
  };
});
