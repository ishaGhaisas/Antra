import React from "react";

const withFetch = (WrappedComponent, url) => {
  return class WithFetchWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        error: null,
      };
    }

    componentDidMount() {
      fetch(url)
        .then((res) => {
          if (!res.ok) throw Error("could not fetch data");
          return res.json();
        })
        .then((data) => {
          this.setState({ data, error: null });
        })
        .catch((err) => {
          this.setState({ error: err.message });
        });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          data={this.state.data}
          error={this.state.error}
        />
      );
    }
  };
};

export default withFetch;
