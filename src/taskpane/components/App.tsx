import * as React from "react";
import { Text } from "@fluentui/react-components";
import { validateOpenAIApiKey, editTextWithGPT4o } from "../functions/openai";
import ApiKeyInput from "./ApiKeyInput";
import Instructions from "./Instructions";
import EditDialog from "./EditDialogue";
import { useKeyPress } from "../hooks/useKeyPress";
import { useStyles } from "../styles/styles";

const App: React.FC = () => {
  const styles = useStyles();
  const [apiKey, setApiKey] = React.useState("");
  const [isKeyValid, setIsKeyValid] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [instruction, setInstruction] = React.useState("");
  const [selectedText, setSelectedText] = React.useState("");

  useKeyPress(isKeyValid, setSelectedText, setIsDialogOpen);

  const handleSubmit = async () => {
    if (apiKey.trim() !== "") {
      setIsLoading(true);
      try {
        const validated = await validateOpenAIApiKey(apiKey.trim());
        setIsKeyValid(validated);
        if (!validated) setApiKey("");
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

  return (
    <div className={styles.root}>
      {isKeyValid === null ? (
        <ApiKeyInput
          apiKey={apiKey}
          setApiKey={setApiKey}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ) : isKeyValid ? (
        <>
          <Instructions />
          {message && <Text style={{ marginTop: '20px' }}>{message}</Text>}
          <EditDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            instruction={instruction}
            setInstruction={setInstruction}
            handleInstructionSubmit={handleInstructionSubmit}
            isLoading={isLoading}
          />
        </>
      ) : (
        <ApiKeyInput
          apiKey={apiKey}
          setApiKey={setApiKey}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isInvalid={true}
        />
      )}
    </div>
  );
};

export default App;
