import classes from "./MyButton.module.css";

import React from "react"

export function MyButton({ children, ...props }: any) {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
}
