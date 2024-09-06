import * as React from "react";
import { Input, Button, Text, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions } from "@fluentui/react-components";
import { useStyles } from "../styles/styles";
import { useLoadingDots } from "../hooks/useLoadingDots";

interface EditDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  instruction: string;
  setInstruction: (instruction: string) => void;
  handleInstructionSubmit: () => void;
  isLoading: boolean;
}

const EditDialog: React.FC<EditDialogProps> = ({ isOpen, setIsOpen, instruction, setInstruction, handleInstructionSubmit, isLoading }) => {
  const styles = useStyles();
  const loadingDots = useLoadingDots(isLoading);

  const handleInstructionKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      handleInstructionSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(_, data) => setIsOpen(data.open)}>
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
  );
};

export default EditDialog;