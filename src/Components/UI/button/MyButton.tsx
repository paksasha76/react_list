import classes from "./MyButton.module.css";

interface Props {
  children: string;
  onClick?: any;
  style?: {};
}

export const MyButton = ({ children, ...props }: Props) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};
