// save database to .json file
import type { Note } from "@/stores/notes";

export const saveToFile = (notes: Note[]) => {
  const json = JSON.stringify(notes);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "rr-notes_list.json";
  link.click();
};
