import * as React from "react";
import { Text } from "@fluentui/react-components";

const Instructions: React.FC = () => (
  <>
    <Text style={{ fontWeight: 'bold' }}>Instructions:</Text>
    <ol>
      <li>Highlight text in your document.</li>
      <li>Click on this window.</li>
      <li>Press CMD+K.</li>
      <li>Type your instructions and press enter to execute!</li>
    </ol>
  </>
);

export default Instructions;