import { useEffect } from "react";

const withLogger = (WrappedComponent, componentName) => {
  return function WithLoggerWrapper(props) {
    useEffect(() => {
      console.log(`Component mounted: ${componentName}`);
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withLogger;
