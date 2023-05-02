import { defineStore } from "pinia";
import { csrfCookie, login, getUser, register, logout } from "@/http/auth-api";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const errors = ref({});

  const isLoggedIn = computed(() => !!user.value);

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

  const handleLogin = async (credentials: any) => {
    await csrfCookie();
    try {
      await login(credentials);
      await fetchUser();
      errors.value = {};
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleRegister = async (newUser: {
    name: string;
    password: string;
  }) => {
    try {
      await register(newUser);
      await handleLogin({
        name: newUser.name,
        password: newUser.password,
      });
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    user.value = null;
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    fetchUser,
    user,
    isLoggedIn,
  };
});
