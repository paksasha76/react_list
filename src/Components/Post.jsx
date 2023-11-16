import React from "react";

import { MyButton } from "./UI/button/MyButton";

export function Post({ number, title, description, remove }) {
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
}
