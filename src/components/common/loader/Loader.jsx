import ReactLoading from "react-loading";
import "./Loader.scss";

export const SpinLoader = () => {
	return (
		<ReactLoading
			type="spin"
			color="#37455f"
			height="64px"
			width="64px"
			className="spin-loader"
		/>
	);
}

export const BallsLoader = () => {
	return (
		<ReactLoading
			type="balls"
			color="#aaa"
			className="balls-loader"
		/>
	);
}
