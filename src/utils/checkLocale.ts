// check if is language set in browser, if not, create one or set one
export const checkLocale = () => {
  const getLocaleLang = window.localStorage.getItem(
    "rr-notes_v2_lang"
  ) as string;

  if (getLocaleLang) {
    return getLocaleLang;
  } else {
    window.localStorage.setItem("rr-notes_v2_lang", "english");
    return "english";
  }
};
