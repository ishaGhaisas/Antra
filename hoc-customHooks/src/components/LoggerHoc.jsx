import React from "react";
import withLogger from "../hoc/withLogger";

class LoggerHoc extends React.Component {
  render() {
    return <p>Logger (HOC)</p>;
  }
}

export default withLogger(LoggerHoc, "Logger Hoc");
