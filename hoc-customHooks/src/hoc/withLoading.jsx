import React from "react";

const withLoading = (WrappedComponent, delay = 2000) => {
  return class WithLoadingWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
      this.timeoutId = null;
    }

    componentDidMount() {
      this.timeoutId = setTimeout(() => {
        this.setState({ loading: false });
      }, delay);
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutId);
    }

    render() {
      return <WrappedComponent {...this.props} loading={this.state.loading} />;
    }
  };
};

export default withLoading;
