import classes from "./MyButton.module.css";

import React from "react"

interface Props {
    children: string;
    onClick?: any;
    style?: {}
}

export function MyButton({ children, ...props }: Props) {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
}
