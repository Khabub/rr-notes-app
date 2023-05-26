import { defineStore } from "pinia";
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} from "@/http/notes-api";
import { computed, ref } from "vue";
import { engLang, czeLang, gerLang } from "@/stores/language";
import { checkLocale, checkTextAbove } from "@/utils/checkLocale";

export interface Note {
  id: number;
  title: string;
  note: string;
  importance: string;
  created_at?: string;
}

const setItemInBrowser = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const useNotesStore = defineStore("notes", () => {
  // note database
  const allNotes = ref<Note[]>([]);

  // hide/show the text above notes
  const textabove = ref<boolean>(false);

  // check if is TextAbove set in browser
  textabove.value = checkTextAbove();

  // set importance radio button
  const radios = ref<string>("");

  // check if is language set in browser
  radios.value = checkLocale();

  const loading = ref<boolean>(false);

  // change TextAbove settings
  const textAboveSet = computed({
    get: () => textabove.value,
    set: (newValue) => {
      textabove.value = newValue;
      if (newValue) {
        setItemInBrowser("rr-notes_v2_textAbove", "1");
      } else {
        setItemInBrowser("rr-notes_v2_textAbove", "0");
      }
    },
  });

  // change languages
  const setLang = computed(() => {
    switch (radios.value) {
      case "english": {
        setItemInBrowser("rr-notes_v2_lang", "english");
        return { ...engLang };
      }
      case "czech": {
        setItemInBrowser("rr-notes_v2_lang", "czech");
        return { ...czeLang };
      }
      case "german": {
        setItemInBrowser("rr-notes_v2_lang", "czech");
        return { ...gerLang };
      }
      default:
        return { ...engLang };
    }
  });

  // fetch all notes
  const allNotesHandler = async () => {
    loading.value = true;
    try {
      const { data } = await getAllNotes();
      const fetchedNotes: Note[] = data.data;
      allNotes.value = fetchedNotes;
      allNotes.value.reverse();
      loading.value = false;
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
    loading,
    textAboveSet,
  };
});
