export interface LangAll {
  h1: string;
  h2: string;
  p: string;
  back: string;
  label: string;
  password: string;
  login: string;
  login2: string;
  h3: string;
  logout: string;
  h4: string;
  h4_1: string;
  h4_2: string;
  save: string;
  edit: string;
  delete: string;
  confirm: string;
  confirm_btn: string;
  cancel: string;
  labelHeading: string;
  labelNote: string;
  labelImportance1: string;
  labelImportance2: string;
  labelImportance3: string;
  enter: string;
  register: string;
  register_2: string;
  passConfirm: string;
  noteCreated: string;
  noteUpdate: string;
  noteDeleted: string;
}

// components for translate the text
type LangTypes =
  | "mainPage"
  | "loginPage"
  | "theContent"
  | "theFooter"
  | "noteDetail"
  | "editForm"
  | "inputForm"
  | "navBar"
  | "authPage";

// english language
export const engLang: Record<LangTypes, Partial<LangAll>> = {
  mainPage: {
    h1: "Your saved notes",
    p: "(click on a note for details)",
  },
  loginPage: {
    back: "Back",
    label: "Name",
    password: "Password",
    login: "Login",
    login2: "Login",
    passConfirm: "Password confirm",
    noteCreated: "Note created!",
  },
  theContent: {
    h3: "Not logged in",
    logout: "Logout",
    h4: "Text above notes",
    h4_1: "Set language",
    h4_2: "Save notes to a file (.json)",
    save: "Save",
  },
  theFooter: {
    p: "Created by Robert Rozehnal, 2023",
  },
  noteDetail: {
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm deleteting the note",
    confirm_btn: "Confirm",
    cancel: "Cancel",
    noteDeleted: "Note deleted!",
  },
  editForm: {
    h2: "Edit a note",
    labelHeading: "Heading (max 20 characters)",
    labelNote: "Note...",
    labelImportance1: "Very important",
    labelImportance2: "Important",
    labelImportance3: "Not so important",
    edit: "Edit note",
    noteUpdate: "Note updated!",
  },
  inputForm: {
    h2: "Enter a note",
    enter: "Enter note",
  },
  navBar: {
    h3: "Not logged in",
  },
  authPage: {
    h1: "Welcome to",
    login: "Login",
    register: "Register",
    register_2: "Register",
  },
};

// czech language
export const czeLang: Record<LangTypes, Partial<LangAll>> = {
  mainPage: {
    h1: "Vaše uložené poznámky",
    p: "(klikni na poznámku pro detail)",
  },
  loginPage: {
    back: "Zpět",
    label: "Jméno",
    password: "Heslo",
    login: "Přihlásit",
    login2: "Přihlášení",
    passConfirm: "Heslo znovu",
    noteCreated: "Poznámka vytvořena!",
  },
  theContent: {
    h3: "Nepřihlášen",
    logout: "Odhlásit",
    h4: "Text nad poznámkami",
    h4_1: "Nastav jazyk",
    h4_2: "Uložit poznámky do souboru (.json)",
    save: "Uložit",
  },
  theFooter: {
    p: "Vytvořil Robert Rozehnal, 2023",
  },
  noteDetail: {
    edit: "Změnit",
    delete: "Smazat",
    confirm: "Potvrď smazání poznámky",
    confirm_btn: "Potvrdit",
    cancel: "Zrušit",
    noteDeleted: "Poznámka smazána!",
  },
  editForm: {
    h2: "Změnit poznámku",
    labelHeading: "Nadpis (maximálně 20 písmen)",
    labelNote: "Poznámka...",
    labelImportance1: "Hodně důležitá",
    labelImportance2: "Důležitá",
    labelImportance3: "Ne moc důležitá",
    edit: "Změnit",
    noteUpdate: "Poznámka změněna!",
  },
  inputForm: {
    h2: "Vložit poznámku",
    enter: "Vložit",
  },
  navBar: {
    h3: "Nepřihlášen",
  },
  authPage: {
    h1: "Vítejte v",
    login: "Přihlásit",
    register: "Registrovat",
    register_2: "Registrace",
  },
};
