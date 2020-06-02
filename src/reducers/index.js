export default (state, action) => {
	switch (action.type) {
		case "toggle_menu": {
			return { ...state, toggleMenu: !state.toggleMenu };
		}
		case "add_posts": {
			return { ...state, posts: [...action.payload] };
		}
		default: {
			return state;
		}
	}
};
