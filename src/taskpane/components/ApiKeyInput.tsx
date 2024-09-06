import * as React from "react";
import { Input, Button, Text } from "@fluentui/react-components";
import { useStyles } from "../styles/styles";
import { useLoadingDots } from "../hooks/useLoadingDots";

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
  isInvalid?: boolean;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey, handleSubmit, isLoading, isInvalid }) => {
  const styles = useStyles();
  const loadingDots = useLoadingDots(isLoading);

  return (
    <>
      {isInvalid && <Text style={{ color: 'red', fontWeight: 'bold' }}>Invalid API key. Please try again.</Text>}
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
            <span style={{ display: 'inline-block', animation: 'rotate 1s linear infinite' }}>{loadingDots}</span>
          </span>
        ) : "Submit"}
      </Button>
    </>
  );
};

export default ApiKeyInput;