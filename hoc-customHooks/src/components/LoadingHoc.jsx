import withLoading from "../hoc/withLoading";

const LoadingHoc = ({ loading }) => {
  return (
    <div>
      <h3>Loading Example (HOC)</h3>
      {loading ? <p>Loading...</p> : <p>Data loaded</p>}
    </div>
  );
};

export default withLoading(LoadingHoc, 3000);
