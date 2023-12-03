import { FC } from "react";
import ContentLoader from "react-content-loader";

const MyLoader: FC<{}> = (props) => (
  <ContentLoader
    speed={2}
    width={1000}
    height={100}
    viewBox="0 0 1200 120"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="14" cy="1000" r="5" />
    <rect x="269" y="21" rx="0" ry="50" width="1" height="100" />
    <rect x="6" y="8" rx="0" ry="50" width="1200" height="500" />
    <rect x="401" y="300" rx="0" ry="50" width="24" height="300" />
    <rect x="403" y="400" rx="17" ry="50" width="21" height="370" />
  </ContentLoader>
);

export default MyLoader;
