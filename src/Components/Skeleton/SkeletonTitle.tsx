import {FC } from "react";
import classes from "./SkeletonTitle.module.css"

const SkeletonTitle: FC = () => {
  return (
    <h1 className={classes["skeletonTitle"]}>ИДЕТ ЗАГРУЗКА...</h1>
  );
};

export default SkeletonTitle;
