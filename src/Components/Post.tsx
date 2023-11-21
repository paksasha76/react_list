import React, { FC } from "react";

import { MyButton } from "./UI/button/MyButton";

interface Props {
  number: number;
  title: string;
  description: string;
  id: number;
  remove: () => {
    remove(post: any): any;
  };
}

export const Post: FC<Props> = ({ number, title, description, remove }) => {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {number}. {title}
        </strong>
        <div>{description}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={remove}>DELETE</MyButton>
      </div>
    </div>
  );
};
