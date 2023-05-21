// check importance of note and set the class
export const importanceCheck = (item: string) => {
  switch (item) {
    case "1":
      return "impRed";
    case "2":
      return "impOrange";
    case "3":
      return "impGreen";
    default:
      break;
  }
};