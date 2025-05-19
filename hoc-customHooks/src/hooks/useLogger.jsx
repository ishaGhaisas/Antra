import { useEffect } from "react";

const useLogger = (componentName) => {
  useEffect(() => {
    console.log(`Component mounted: ${componentName}`);
  }, []);
};

export default useLogger;
