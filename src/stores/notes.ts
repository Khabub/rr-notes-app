import { defineStore } from "pinia";
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} from "@/http/notes-api";
import { computed, ref } from "vue";
import { engLang, czeLang } from "@/stores/language";
import { checkLocale } from "@/utils/checkLocale";

export interface Note {
  id: number;
  title: string;
  note: string;
  importance: string;
  created_at?: string;
}

export const useNotesStore = defineStore("notes", () => {
  // note database
  const allNotes = ref<Note[]>([]);

  // hide/show the text above notes
  const textabove = ref<boolean>(true);

  // set importance radio button
  const radios = ref("");

  // check if is language set in browser
  radios.value = checkLocale();

  // change languages
  const setLang = computed(() => {
    if (radios.value === "english") {
      window.localStorage.setItem("rr-notes_v2_lang", "english");
      return { ...engLang };
    } else {
      window.localStorage.setItem("rr-notes_v2_lang", "czech");
      return { ...czeLang };
    }
  });

  // fetch all notes
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

  // create the note
  const handleCreateNote = async (value: Note) => {
    const { data: createdNote } = await createNote(value);
    allNotes.value.unshift(createdNote.data);
  };

  // delete the note
  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
    const index = allNotes.value.findIndex((item) => item.id === id);
    allNotes.value.splice(index, 1);
  };

  // update the note
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
    setLang,
    radios,
  };
});
