import { useState, useEffect } from "react";

const withLoading = (WrappedComponent, delay = 1000) => {
  return function WithLoadingWrapper(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => setLoading(false), delay);
      return () => clearTimeout(timeout);
    }, [delay]);

    return <WrappedComponent {...props} loading={loading} />;
  };
};

export default withLoading;
