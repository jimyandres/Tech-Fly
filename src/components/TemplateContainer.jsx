import React from 'react';
import { connect } from 'react-redux';

import Template from './Template';

const TemplateContainer = ({ progress }) =>
  <Template progress={progress} />

const mapStateToProps = (state) => {
  return {
    progress: state.progress,
  };
};

export default connect(mapStateToProps)(TemplateContainer);
