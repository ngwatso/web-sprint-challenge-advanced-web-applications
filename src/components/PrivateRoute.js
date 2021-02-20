import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...compProps }) => {
	return (
		<Route
			{...compProps}
			render={(props) => {
				if (localStorage.getItem('token')) {
					return <Component {...props} />;
				} else {
					return <Redirect to="/login" />;
				}
			}}
		/>
	);
};

export default PrivateRoute;

// * Task List:
// * 1. Build a PrivateRoute component that redirects if user is not logged in
