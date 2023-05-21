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


export const checkTextAbove = () => {
  const getLocaleTextAbove = window.localStorage.getItem(
    "rr-notes_v2_textAbove"
  ) as string;

  if (getLocaleTextAbove) {
    return Boolean(+getLocaleTextAbove);
  } else {
    window.localStorage.setItem("rr-notes_v2_textAbove", "1");
    return Boolean(1);
  }

}