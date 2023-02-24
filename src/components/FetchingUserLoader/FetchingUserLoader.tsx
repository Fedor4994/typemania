import s from "./FetchingUserLoader.module.scss";
import { MagnifyingGlass } from "react-loader-spinner";

const FetchingUserLoader = () => {
  return (
    <div className={s.loaderPage}>
      <h2 className={s.loaderTitle}>Downloading user data</h2>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

export default FetchingUserLoader;
