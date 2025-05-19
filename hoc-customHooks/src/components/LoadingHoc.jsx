import React from "react";
import withLoading from "../hoc/withLoading";

class LoadingHoc extends React.Component {
  render() {
    const { loading } = this.props;

    return (
      <div>
        <h3>Loading Example (HOC)</h3>
        {loading ? <p>Loading...</p> : <p>Data loaded</p>}
      </div>
    );
  }
}

export default withLoading(LoadingHoc, 3000);
