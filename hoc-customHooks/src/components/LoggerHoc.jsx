import withLogger from "../hoc/withLogger";

const LoggerHoc = () => {
  return <p>Logger (HOC)</p>;
};

export default withLogger(LoggerHoc, "Logger Hoc");
