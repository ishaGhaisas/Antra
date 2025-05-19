import useLoading from "../hooks/useLoading";

const Loading = () => {
  const loading = useLoading(1500);

  return (
    <div>
      <h3>Loading Example (Hook)</h3>
      {loading ? <p>Loading...</p> : <p>Data loaded</p>}
    </div>
  );
};

export default Loading;
