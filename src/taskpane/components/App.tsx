import * as React from "react";
import { makeStyles, Input, Button, Text, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions } from "@fluentui/react-components";
import { validateOpenAIApiKey, editTextWithGPT4o } from "../openai";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: "20px",
    width: "300px",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
});

const App: React.FC<AppProps> = () => {
  const styles = useStyles();
  const [apiKey, setApiKey] = React.useState("");
  const [isKeyValid, setIsKeyValid] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [instruction, setInstruction] = React.useState("");
  const [selectedText, setSelectedText] = React.useState("");
  const [loadingDots, setLoadingDots] = React.useState(".");

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

  React.useEffect(() => {
    Office.onReady((info) => {
      if (info.host === Office.HostType.Word) {
        // Add keydown event handler to the document
        document.addEventListener('keydown', handleKeyPress);
      }
    });

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isKeyValid]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === "....") return ".";
          return prev + ".";
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async () => {
    if (apiKey.trim() !== "") {
      setIsLoading(true);
      try {
        const validated = await validateOpenAIApiKey(apiKey.trim());
        if (validated) {
          setIsKeyValid(true);
        } else {
          setIsKeyValid(false);
          setApiKey("");
        }
      } catch (error) {
        setIsKeyValid(false);
        setApiKey("");
      }
      setIsLoading(false);
    }
  };

  const handleInstructionSubmit = async () => {
    if (instruction.trim() !== "" && selectedText.trim() !== "") {
      setIsLoading(true);
      try {
        const editedText = await editTextWithGPT4o(apiKey, selectedText, instruction);
        // @ts-ignore (to suppress potential TypeScript errors if Word is not recognized)
        Word.run(async (context) => {
          let range = context.document.getSelection();
          range.insertText(editedText, Word.InsertLocation.replace);
          await context.sync();
        });
        setIsDialogOpen(false);
        setInstruction("");
      } catch (error) {
        console.error("Error editing text:", error);
        setMessage("Error editing text. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handleInstructionKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      handleInstructionSubmit();
    }
  };

  return (
    <div className={styles.root}>
      {isKeyValid === null ? (
        <>
          <Input
            className={styles.input}
            placeholder="OpenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={isLoading}
          />
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <span>
                Validating
                <span style={{ display: 'inline-block', animation: 'rotate 1s linear infinite' }}>...</span>
              </span>
            ) : "Submit"}
          </Button>
        </>
      ) : isKeyValid ? (
        <>
          <Text style={{ fontWeight: 'bold' }}>Instructions:</Text>
          <ol>
            <li>Highlight text in your document.</li>
            <li>Click on this window.</li>
            <li>Press CMD+K.</li>
            <li>Type your instructions and press enter to execute!</li>
          </ol>
          {message && <Text style={{ marginTop: '20px' }}>{message}</Text>}
          <Dialog open={isDialogOpen} onOpenChange={(_, data) => setIsDialogOpen(data.open)}>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Edit Instructions:</DialogTitle>
                <DialogContent className={styles.dialogContent}>
                  <Input
                    placeholder="(press enter to submit)"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    onKeyPress={handleInstructionKeyPress}
                    disabled={isLoading}
                  />
                  {isLoading && (
                    <Text>
                      Executing{loadingDots}
                    </Text>
                  )}
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Cancel</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </>
      ) : (
        <>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Invalid API key. Please try again.</Text>
          <Input
            className={styles.input}
            placeholder="OpenAI API Key:"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </>
      )}
    </div>
  );
};

export default App;
