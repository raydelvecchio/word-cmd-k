import { getCommandKSystemPrompt, getCommandKUserPrompt } from "./prompts";

export async function validateOpenAIApiKey(apiKey: string): Promise<boolean> {
    /*
    Validates OpenAI API Key with a call to the models endpoint.
    */
  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        "Authorization": `Bearer ${apiKey.trim()}`
      }
    });
    return response.ok;
  } catch (error) {
    console.error("Error validating API key:", error);
    return false;
  }
}

export async function editTextWithGPT4o(apiKey: string, selectedText: string, instruction: string): Promise<string> {
    /*
    Makes a call to edit text with GPT4o.
    */
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: getCommandKSystemPrompt() },
          { role: "user", content: getCommandKUserPrompt(selectedText, instruction) }
        ],
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}
