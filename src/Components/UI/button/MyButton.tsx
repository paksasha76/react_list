import classes from "./MyButton.module.css";

import {FC} from "react";

interface Props {
  children: string;
  onClick: any;
  style?: {};
}

export const MyButton:FC<Props> = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};
