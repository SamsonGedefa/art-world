import styles from "./Wrapper.module.css";
import clsx from "clsx";

const Wrapper = ({ children, className }) => {
  return <div className={clsx(styles.wrapper, className)}>{children}</div>;
};

export default Wrapper;
