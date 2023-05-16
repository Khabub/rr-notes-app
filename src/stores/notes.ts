import { defineStore } from "pinia";
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} from "@/http/notes-api";
import { computed, reactive, ref } from "vue";
import { engLang, czeLang } from "@/stores/language";

export interface Note {
  id: number;
  title: string;
  note: string;
  importance: string;
  created_at?: string;
}

interface Snackbar {
  open: boolean;
  color: string;
  text: string;
  timeout?: number;
}

export const useNotesStore = defineStore("notes", () => {
  const allNotes = ref<Note[]>([]);
  const textabove = ref<boolean>(true);
  const snackbar: Snackbar = reactive({
    open: false,
    color: "",
    text: "",
    timeout: 2000,
  });

  const getSnackbar = (open: boolean, color: string, text: string): void => {
    snackbar.open = open;
    snackbar.color = color;
    snackbar.text = text;
  };

  const radios = ref("eng");
  const setLang = computed(() =>
    radios.value === "eng" ? { ...engLang } : { ...czeLang }
  );

  const allNotesHandler = async () => {
    try {
      const { data } = await getAllNotes();
      const fetchedNotes: Note[] = data.data;
      allNotes.value = fetchedNotes;
      allNotes.value.reverse();
    } catch (error) {
      console.log("CHYBA: ", error);
    }
  };

  const handleCreateNote = async (value: Note) => {
    const { data: createdNote } = await createNote(value);
    allNotes.value.unshift(createdNote.data);
  };

  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
    const index = allNotes.value.findIndex((item) => item.id === id);
    allNotes.value.splice(index, 1);
  };

  const handleUpdateNote = async (val: Note) => {
    const { data: updatedNote } = await updateNote(val.id, val);

    const currentNote = allNotes.value.find(
      (item: Note) => item.id === val.id
    ) as Note;

    currentNote.title = updatedNote.data.title;
    currentNote.note = updatedNote.data.note;
    currentNote.importance = updatedNote.data.importance;
  };

  return {
    allNotesHandler,
    allNotes,
    textabove,
    handleCreateNote,
    handleDeleteNote,
    handleUpdateNote,
    getSnackbar,
    snackbar,
    setLang,
    radios,
  };
});
