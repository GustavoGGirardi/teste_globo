import React from 'react';

import PropTypes from 'prop-types';

import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

function Route({ isPrivate = false, component: Component, ...rest }) {
  const { user } = useAuth();
  const isSigned = !!user;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === isSigned ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/login' : '/posts',
              state: {
                from: location,
              },
            }}
          />
        );
      }}
    />
  );
}

Route.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

Route.defaultProps = {
  isPrivate: false,
};

export default Route;
