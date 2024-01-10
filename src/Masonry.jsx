import React, { useEffect, useState } from "react";

/* eslint-disable */

const defaultProps = {
	breakpointCols: undefined,
	className: undefined,
	columnClassName: undefined,
	children: undefined,
	columnAttrs: undefined,
	column: undefined,
};

const DEFAULT_COLUMNS = 2;

const Masonry = (props) => {
	const [columnCount, setColumnCount] = useState(() => {
		if (props.breakpointCols && props.breakpointCols.default) {
			return props.breakpointCols.default;
		} else {
			return parseInt(props.breakpointCols) || DEFAULT_COLUMNS;
		}
	});

	useEffect(() => {
		const reCalculateColumnCountDebounce = () => {
			if (!window || !window.requestAnimationFrame) {
				reCalculateColumnCount();
				return;
			}

			if (window.cancelAnimationFrame) {
				window.cancelAnimationFrame(lastRecalculateAnimationFrame);
			}

			lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
				reCalculateColumnCount();
			});
		};

		const reCalculateColumnCount = () => {
			const windowWidth = (window && window.innerWidth) || Infinity;
			let breakpointColsObject = props.breakpointCols;

			if (typeof breakpointColsObject !== "object") {
				breakpointColsObject = {
					default: parseInt(breakpointColsObject) || DEFAULT_COLUMNS,
				};
			}

			let matchedBreakpoint = Infinity;
			let columns = breakpointColsObject.default || DEFAULT_COLUMNS;

			for (let breakpoint in breakpointColsObject) {
				const optBreakpoint = parseInt(breakpoint);
				const isCurrentBreakpoint =
					optBreakpoint > 0 && windowWidth <= optBreakpoint;

				if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
					matchedBreakpoint = optBreakpoint;
					columns = breakpointColsObject[breakpoint];
				}
			}

			columns = Math.max(1, parseInt(columns) || 1);

			if (columnCount !== columns) {
				setColumnCount(columns);
			}
		};

		const lastRecalculateAnimationFrame = null;

		reCalculateColumnCount();

		if (window) {
			window.addEventListener("resize", reCalculateColumnCountDebounce);
		}

		return () => {
			if (window) {
				window.removeEventListener(
					"resize",
					reCalculateColumnCountDebounce
				);
			}
		};
	}, [props.breakpointCols, columnCount]);

	const itemsInColumns = () => {
		const currentColumnCount = columnCount;
		const itemsInColumns = new Array(currentColumnCount);

		const items = React.Children.toArray(props.children);

		for (let i = 0; i < items.length; i++) {
			const columnIndex = i % currentColumnCount;

			if (!itemsInColumns[columnIndex]) {
				itemsInColumns[columnIndex] = [];
			}

			itemsInColumns[columnIndex].push(items[i]);
		}

		return itemsInColumns;
	};

	const renderColumns = () => {
		const { column, columnAttrs = {}, columnClassName } = props;
		const childrenInColumns = itemsInColumns();
		const columnWidth = `${100 / childrenInColumns.length}%`;
		let className = columnClassName;

		if (className && typeof className !== "string") {
			logDeprecated('The property "columnClassName" requires a string');

			if (typeof className === "undefined") {
				className = "my-masonry-grid_column";
			}
		}

		const columnAttributes = {
			...column,
			...columnAttrs,
			style: {
				...columnAttrs.style,
				width: columnWidth,
			},
			className,
		};

		return childrenInColumns.map((items, i) => {
			return (
				<div {...columnAttributes} key={i}>
					{items}
				</div>
			);
		});
	};

	const logDeprecated = (message) => {
		console.error("[Masonry]", message);
	};

	const {
		children,
		breakpointCols,
		columnClassName,
		columnAttrs,
		column,
		className,
		...rest
	} = props;

	let classNameOutput = className;

	if (typeof className !== "string") {
		logDeprecated('The property "className" requires a string');

		if (typeof className === "undefined") {
			classNameOutput = "my-masonry-grid";
		}
	}

	return (
		<div {...rest} className={classNameOutput}>
			{renderColumns()}
		</div>
	);
};

Masonry.defaultProps = defaultProps;

export default Masonry;
