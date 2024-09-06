/* global Office, Word */

console.log("==================");
console.log("commands.ts loaded");
console.log("==================");

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    console.log("Word is ready, adding event listener");
    document.addEventListener("keydown", handleKeyPress);
  }
});

function handleKeyPress(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    console.log("Cmd+K or Ctrl+K pressed");
    event.preventDefault();
    
    // @ts-ignore (to suppress potential TypeScript errors if Word is not recognized)
    Word.run(async (context) => {
      console.log("Word.run started");
      let range = context.document.getSelection();
      range.font.color = "red";
      await context.sync();
      console.log("Text color changed to red");
    }).catch(function (error) {
      console.error("Error in Word.run:", error);
    });
  }
}
