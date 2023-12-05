import { FC } from "react";
import ContentLoader from "react-content-loader";

const MyLoader: FC<{}> = (props) => (
  <ContentLoader
    speed={2}
    width={1400}
    height={150}
    viewBox="0 0 1400 150"
    backgroundColor="grey"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="19" y="912" rx="11" ry="11" width="552" height="101" />
    <rect x="383" y="703" rx="0" ry="0" width="46" height="1" />
    <rect x="386" y="710" rx="0" ry="0" width="1" height="0" />
    <rect x="16" y="43" rx="0" ry="0" width="107" height="0" />
    <rect x="17" y="25" rx="10" ry="10" width="1000" height="115" />
  </ContentLoader>
);

export default MyLoader;
