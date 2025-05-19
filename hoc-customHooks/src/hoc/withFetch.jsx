import { useEffect, useState } from "react";

const withFetch = (WrappedComponent, url) => {
  return function WithFetchWrapper(props) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) throw Error("could not fetch data");
          return res.json();
        })
        .then((data) => {
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, [url]);

    return (
      <WrappedComponent
        {...props}
        data={data}
        error={error}
      />
    );
  };
};

export default withFetch;
