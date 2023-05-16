// open a new window after clicking a link
export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener, noreferrer");
  if (newWindow) newWindow.opener = null;
};
