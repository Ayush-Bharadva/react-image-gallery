import { PropTypes } from "prop-types";
import "./UI-Styles.scss";

function DropDown({ title, listItems }) {
	return (
		<div className="dd-container">
			<div className="dd-header">
				<div className="dd-header-title">{title}</div>
			</div>
			<div className="dd-list">
				{listItems.map(item => (
					<li key={Math.random()}>
						<button>{item}</button>
					</li>
				))}
				<button className="dd-list-item">item1</button>
				<button className="dd-list-item">item2</button>
				<button className="dd-list-item">item3</button>
			</div>
		</div>
	);
}

DropDown.propTypes = {
	title: PropTypes.string,
	listItems: PropTypes.array,
};

export default DropDown;
