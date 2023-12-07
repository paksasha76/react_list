import { FC } from "react";
import classes from "./MyButton.module.css";

interface Props {
  children: string;
  onClick: any;
  style?: {};
}

export const MyButton: FC<Props> = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};
