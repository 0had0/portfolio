import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import Router from "./Routes/Router";
import reducer from "./reducers";
import AppContext from "./contexts/appContext";
import theme from "./components/theme";

import Footer from "./components/Footer";
import ErrorNotifier from "./components/ErrorNotifier";

import WebFont from "webfontloader";

import "gestalt/dist/gestalt.css";
import "./index.css";

import dotenv from "dotenv";
dotenv.config();

WebFont.load({
	google: {
		families: ["Rubik", "Roboto"],
	},
});

const initialState = {
	theme: theme,
	posts: null,
	error: false,
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const _toggleError = React.useCallback(
		() => dispatch({ type: "toggle_error" }),
		[]
	);
	return (
		<AppContext.Provider value={{ state, dispatch, _toggleError }}>
			<ErrorNotifier error={state.error} toggleError={_toggleError} />
			<Router />
			<Footer />
		</AppContext.Provider>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
