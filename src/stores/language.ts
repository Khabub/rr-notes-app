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
  emptyDB: string;
  input: string;
  charLen: string;
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
  | "authPage"
  | "errors";

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
  errors: {
    login: "The data entered is incorrect",
    emptyDB: "No notes",
    input: "Required",
    charLen: "Maximum 20 characters",
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
  errors: {
    login: "Zadané údaje jsou nesprávné",
    emptyDB: "Žádné poznámky",
    input: "Nutné vyplnit",
    charLen: "Maximálně 20 písmen",
  },
};

// german language
export const gerLang: Record<LangTypes, Partial<LangAll>> = {
  mainPage: {
    h1: "Ihre gespeicherten Notizen",
    p: "(Klicken Sie auf eine Notiz für Details)",
  },
  loginPage: {
    back: "Zurück",
    label: "Name",
    password: "Passwort",
    login: "Anmelden",
    login2: "Anmelden",
    passConfirm: "Passwort bestätigen",
    noteCreated: "Notiz erstellt!",
  },
  theContent: {
    h3: "Nicht angemeldet",
    logout: "Abmelden",
    h4: "Text über den Notizen",
    h4_1: "Sprache festlegen",
    h4_2: "Notizen in eine Datei speichern (.json)",
    save: "Speichern",
  },
  theFooter: {
    p: "Erstellt von Robert Rozehnal, 2023",
  },
  noteDetail: {
    edit: "Bearbeiten",
    delete: "Löschen",
    confirm: "Notiz löschen bestätigen",
    confirm_btn: "Bestätigen",
    cancel: "Abbrechen",
    noteDeleted: "Notiz gelöscht!",
  },
  editForm: {
    h2: "Notiz bearbeiten",
    labelHeading: "Überschrift (max. 20 Zeichen)",
    labelNote: "Notiz...",
    labelImportance1: "Sehr wichtig",
    labelImportance2: "Wichtig",
    labelImportance3: "Nicht so wichtig",
    edit: "Notiz bearbeiten",
    noteUpdate: "Notiz aktualisiert!",
  },
  inputForm: {
    h2: "Notiz eingeben",
    enter: "Notiz eingeben",
  },
  navBar: {
    h3: "Nicht angemeldet",
  },
  authPage: {
    h1: "Willkommen bei",
    login: "Anmelden",
    register: "Registrieren",
    register_2: "Registrieren",
  },
  errors: {
    login: "Die eingegebenen Daten sind nicht korrekt",
    emptyDB: "Keine Notizen",
    input: "Erforderlich",
    charLen: "Maximal 20 Zeichen",
  },
};
