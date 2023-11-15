import React, { useState } from "react";

import { Post } from "./Post";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export function PostList({ posts, title, remove }) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => {
          return (
            <CSSTransition key={post.id} timeout={500} classNames="post">
              <Post
                title={post.title}
                id={post.id}
                description={post.description}
                number={index + 1}
                remove={() => {
                  remove(post);
                }}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}
