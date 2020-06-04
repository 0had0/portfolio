export default (state, action) => {
	switch (action.type) {
		case "toggle_menu": {
			return { ...state, toggleMenu: !state.toggleMenu };
		}
		case "add_posts": {
			return { ...state, posts: [...action.payload] };
		}
		case "toggle_error": {
			return { ...state, error: !state.error };
		}
		default: {
			return state;
		}
	}
};
