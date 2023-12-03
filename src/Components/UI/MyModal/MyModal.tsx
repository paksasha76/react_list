import classes from "./MyModal.module.css";

import { FC } from "react";

interface Props {
  children: any;
  visible: Boolean;
  setVisible: Function;
}

export const MyModal: FC<Props> = ({ children, visible, setVisible }) => {
  const rootClasses = [classes.myModal];
  if (visible) {
    rootClasses.push(classes.active);
  }
  return (
    <div
      className={rootClasses.join(" ")}
      onClick={() => {
        setVisible(false);
      }}
    >
      <div
        className={classes.myModalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
