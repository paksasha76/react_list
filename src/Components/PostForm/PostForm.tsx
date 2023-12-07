import React, { useState } from "react";
import { MyButton } from "../UI/button/MyButton";
import { MyInput } from "../UI/input/MyInput";

interface Props {
  create: Function;
  setDate: Function;
}

const PostForm = ({ create, setDate }: Props) => {
  const currentDate = new Date();
  const createdAt = currentDate.toLocaleString("ru-RU", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [post, setPost] = useState<{ title: string; body: string }>({
    title: "",
    body: "",
  });

  function addPostHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const newPost = { ...post, id: Date.now() };
    create(newPost);
    setPost({ title: "", body: "" });
    setDate(createdAt);
  }

  return (
    <div>
      <form>
        <MyInput
          type="text"
          placeholder="Название поста"
          value={post.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPost({ ...post, title: e.target.value })
          }
        />
        <MyInput
          type="text"
          placeholder="Описание поста"
          value={post.body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPost({ ...post, body: e.target.value })
          }
        />
        <MyButton onClick={addPostHandler}>Добавить</MyButton>
      </form>
    </div>
  );
};

export default PostForm;
