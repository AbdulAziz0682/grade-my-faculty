/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { addToast } from '../redux/toastsActions';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    this.props.addToast({ message: 'An unexpected error occured, try logging in again!', severity: 'error' });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      this.setState({ hasError: false });
      return <Redirect push to="/" />;
    }

    return children;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToast: (data) => dispatch(addToast({ message: data.message, severity: data.severity })),
  };
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
  addToast: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ErrorBoundary);
