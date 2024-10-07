export interface MessageBoxHandles {
  clearInputValue: () => void;
  getTextValue: () => string;
  reset: () => void;
  resizeTextArea: () => void;
  focusTextarea: () => void;
  pasteText: (text: string) => void;
}
