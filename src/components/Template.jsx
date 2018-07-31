import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ErrorBox from './shared/ErrorBoxContainer';
import Header from './shared/Header';
import HomePage from './home/HomePageContainer';
import ReservationsPage from './reservation/ReservationsPageContainer';

const Template = (props) => {
  const { progress } = props;
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <section className="page-content container-fluid">
          <ErrorBox />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/reservations" component={ReservationsPage} />
        </section>
        <div className="loader-wrapper" style={progress > 0 ? { display: 'block' } : { display: 'none' }}>
          <div className="loader-box">
            <div className="loader">Cargando...</div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Template;
