import { defineStore, storeToRefs } from "pinia";
import { csrfCookie, login, getUser, register, logout } from "@/http/auth-api";
import { computed, reactive, ref } from "vue";
import { checkLocale } from "@/utils/checkLocale";
import { useNotesStore } from "@/stores/notes";

interface NoteWindow {
  enterNote: boolean;
  editNote: boolean;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const errors = ref("");
  const plusButton = ref<boolean>(false);
  const showInputState: NoteWindow = reactive({
    enterNote: false,
    editNote: false,
  });

  const storeNotes = useNotesStore();
  const { setLang } = storeToRefs(storeNotes);

  const isLoggedIn = computed(() => !!user.value);

  // get user from database
  const fetchUser = async () => {
    try {
      const { data } = await getUser();
      if (data) {
        user.value = data;
        return true;
      } else {
        user.value = null;
        return false;
      }
    } catch (error) {
      user.value = null;
      return false;
    }
  };

  const csrfCheck = async () => {
    try {
      await csrfCookie();
      console.log("csrf OK");
    } catch (error: any) {
      if (error.response.status === 419) {
        console.log("csrf chyba:", error);
      } else {
        console.log("Jina chyba:", error);
      }
    }
  };

  const loginCheck = async (credentials: any) => {
    try {
      await login(credentials);      
      console.log("login OK");
    } catch (error: any) {
      if (error.response.status === 419) {
        console.log("login chyba:", error);
      } else {
        console.log("Jiná chyba:", error);
      }
    }
  };

  // handle user login, check csrfCookie, if the user exist and get him if exists
  const handleLogin = async (credentials: any) => {
    csrfCheck();
    loginCheck(credentials);
    try {
      await fetchUser();
      errors.value = "";
      console.log("fetch OK");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        if (checkLocale() === "english") {
          errors.value = error.response.data.errors.input[0];
        } else {
          errors.value = error.response.data.errors.inputCze[0];
        }
      }
    }
  };

  // handle user register and log him in
  // password_confirmation not sending, just password is enough
  const handleRegister = async (newUser: {
    name: string;
    password: string;
    password_confirmation?: string;
  }) => {
    try {
      if (newUser.password !== newUser.password_confirmation) {
        throw new Error("Error, passwords are not same");
      }
      await register(newUser);
      await handleLogin({
        name: newUser.name,
        password: newUser.password,
      });
    } catch (error: any | Error) {
      if (error.response && error.response.status === 422) {
        if (checkLocale() === "english") {
          errors.value = error.response.data.errors.input[0];
        } else {
          errors.value = error.response.data.errors.inputCze[0];
        }
      } else {
        errors.value = error.message;
      }
    }
  };

  // logout user
  const handleLogout = async () => {
    await logout();
    user.value = null;
  };

  // rules for inputs
  const rules = reactive({
    required: (value: boolean) =>
      !!value || (setLang.value.errors.input as string),
    length: (value: string) =>
      value.length <= 21 || (setLang.value.errors.charLen as string),
  });

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    fetchUser,
    user,
    isLoggedIn,
    plusButton,
    showInputState,
    rules,
    errors,
  };
});
