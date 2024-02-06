import ReactLoading from "react-loading";
import "./Loader.scss";

export function SpinLoader() {
	return (
		<div className="loader-container">
			<ReactLoading
				type="spin"
				color="#37455f"
				height="64px"
				width="64px"
				className="loader"
			/>
		</div>
	);
}

export function BallsLoader() {
	return (
		<ReactLoading
			type="balls"
			color="#aaa"
			className="balls-loader"
		/>
	);
}
