export const getCommandKSystemPrompt = () => {
    /*
    The system prompt for command k.
    */
   return `You are a helpful assistant to a user in Microsoft Word. You help them make edits to their documents according to their instructions. You will receive
the text they want you to edit, as well the changes they desire. You will execute this, outputting ONLY the correct text.`
}

export const getCommandKUserPrompt = (selectedText: string, instruction: string) => {
    /*
    Gets the user prompt for making the LLM API call.
    */
   return `SELECTED TEXT TO EDIT:\n${selectedText}\n\nUSER INSTRUCTION:\n${instruction}\n\nCORRECTION:`
}
