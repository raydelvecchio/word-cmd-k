import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
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
