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

export const computeColumnsFromWidth = (allImages, columnsCount) => {
	// const columns = {
	// 	column1: [],
	// 	column2: [],
	// 	column3: [],
	// };

	const columns = {};
	for (let i = 1; i <= columnsCount; i++) {
		columns[`column${i}`] = [];
	}
	allImages.forEach((image, index) => {
		const columnIndex = index % columnsCount;
		columns[`column${columnIndex + 1}`].push(image);
	});
	return columns;
};
