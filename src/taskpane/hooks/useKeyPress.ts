import * as React from "react";

export const useKeyPress = (
  isKeyValid: boolean | null,
  setSelectedText: (text: string) => void,
  setIsDialogOpen: (isOpen: boolean) => void
) => {
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k' && isKeyValid) {
        console.log("Cmd+K or Ctrl+K pressed");
        event.preventDefault();
        
        // @ts-ignore (to suppress potential TypeScript errors if Word is not recognized)
        Word.run(async (context) => {
          console.log("Word.run started for Cmd+K or Ctrl+K press");
          let range = context.document.getSelection();
          range.load("text");
          await context.sync();
          setSelectedText(range.text);
          setIsDialogOpen(true);
        }).catch(function (error) {
          console.error("Error in Word.run for Cmd+K or Ctrl+K press:", error);
        });
      }
    };

    Office.onReady((info) => {
      if (info.host === Office.HostType.Word) {
        document.addEventListener('keydown', handleKeyPress);
      }
    });

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isKeyValid, setSelectedText, setIsDialogOpen]);
};