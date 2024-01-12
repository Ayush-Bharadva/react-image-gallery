import { Children } from "react";

function Each({ render, of }) {
	return Children.toArray(of.map((item, index) => render(item, index)));
}

export default Each;
