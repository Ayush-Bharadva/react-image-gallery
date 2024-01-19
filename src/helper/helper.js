export const calculateColumns = () => {
	const windowWidth = window.innerWidth;
	if (windowWidth >= 300 && windowWidth < 600) {
		return 1;
	} else if (windowWidth >= 600 && windowWidth < 900) {
		return 2;
	} else {
		return 3;
	}
};
