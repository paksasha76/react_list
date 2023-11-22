import React, { forwardRef, Ref } from "react";

import styles from "./MyInput.module.css";

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const MyInput = forwardRef(
  (props: MyInputProps, ref: Ref<HTMLInputElement>) => {
    return <input className={styles.myInput} ref={ref} {...props} />;
  }
);
