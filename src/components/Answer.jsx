import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  button: {
    borderColor: "#ffb549",
    color: "#ffb549",
    fontWeight: 600,
    marginBottom: "8px",
    "&:hover": {
      backgroundColor: "#ffb549",
      color: "#fff",
    },
  },
});

const Answer = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="outlined"
      onClick={() => props.select(props.content, props.nextId)}
    >
      {props.content}
    </Button>
  );
};

export default Answer;
