import React from "react";

const withLogger = (WrappedComponent, componentName) => {
  return class WithLoggerWrapper extends React.Component {
    componentDidMount() {
      console.log(`Component mounted: ${componentName}`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withLogger;
