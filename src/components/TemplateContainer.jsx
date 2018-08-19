import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../actions/authentication';

import Template from './Template';

class TemplateContainer extends Component {
  constructor(props) {
    super(props);

    this.checkUserSession = this.checkUserSession.bind(this);
  }

  componentWillMount() {
    // Before the component mounts, check for an existing user session
    this.checkUserSession();
  }

  checkUserSession() {
    const { dispatch } = this.props;
    dispatch(checkSession());
  }

  render() {
    const { authentication, progress } = this.props;
    return (
      <Template authentication={authentication} progress={progress} />
    );
  }
}

const mapStateToProps = state => ({
  progress: state.progress,
  authentication: state.authentication,
});

export default connect(mapStateToProps)(TemplateContainer);
