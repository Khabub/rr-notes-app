import { defineStore } from "pinia";
import { reactive } from "vue";

interface Snackbar {
  open: boolean;
  color: string;
  text: string;
  timeout?: number;
}

export const useSnackbar = defineStore("snackbar", () => {
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

  return {
    getSnackbar,
    snackbar,
  };
});
