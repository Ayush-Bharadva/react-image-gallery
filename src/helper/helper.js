export const calculateColumns = () => {
	const windowWidth = window.innerWidth;
	if (windowWidth >= 300 && windowWidth < 700) {
		return 1;
	} else if (windowWidth >= 700 && windowWidth < 1100) {
		return 2;
	} else {
		return 3;
	}
};
