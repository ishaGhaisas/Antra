import useLogger from "../hooks/useLogger";

const Logger = () => {
  useLogger("Logger");

  return <p>Logger (Hook)</p>;
};

export default Logger;
