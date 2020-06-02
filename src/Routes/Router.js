import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useLocation,
} from "react-router-dom";

import Navigation from "../components/Navigation";
import Menu from "../components/Menu";
import MenuContext from "../contexts/menuContext";

import * as Views from "../Views";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

export default () => {
	const [toggleMenu, toggle] = React.useReducer((state) => !state, false);

	return (
		<Router>
			<ScrollToTop />
			<MenuContext.Provider value={{ toggleMenu, toggle }}>
				<Menu />
				<Navigation />
			</MenuContext.Provider>
			<Switch>
				<Route path="/blog/:id" component={Views.BlogItem} />
				<Route exact path="/blog" component={Views.Blog} />
				<Route path="/contact" component={Views.Contact} />
				<Route exact path="/" component={Views.Home} />
			</Switch>
		</Router>
	);
};
