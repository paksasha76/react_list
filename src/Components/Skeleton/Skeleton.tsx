import React from "react";
import ContentLoader from "react-content-loader";

export const MyLoader = (props: {}) => (
  <ContentLoader
    speed={2}
    width={1000}
    height={100}
    viewBox="0 0 1000 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="14" cy="483" r="5" />
    <rect x="269" y="71" rx="0" ry="0" width="1" height="0" />
    <rect x="6" y="23" rx="0" ry="0" width="800" height="100" />
    <rect x="401" y="40" rx="0" ry="0" width="46" height="5" />
    <rect x="403" y="32" rx="17" ry="17" width="116" height="37" />
  </ContentLoader>
);
