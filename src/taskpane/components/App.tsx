import * as React from "react";
import { makeStyles, Input, Button, Text } from "@fluentui/react-components";

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
    fontSize: "24px",
    fontWeight: "bold",
  },
  input: {
    marginBottom: "20px",
    width: "300px",
  },
});

const App: React.FC<AppProps> = () => {
  const styles = useStyles();
  const [apiKey, setApiKey] = React.useState("");
  const [isKeyValid, setIsKeyValid] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (apiKey.trim() !== "") {
      setIsLoading(true);
      try {
        const response = await fetch("https://api.openai.com/v1/models", {
          headers: {
            "Authorization": `Bearer ${apiKey.trim()}`
          }
        });
        if (response.ok) {
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
        <Text style={{ fontWeight: 'bold' }}>Welcome! You can now use command+k!</Text>
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
