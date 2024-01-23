// import { useState } from "react";
// // import { CustomNavBar } from "./SearchePage";
// import { useNavigate } from "react-router-dom";

function Photo() {
	// const [searchString, setSearchString] = useState("");
	// const navigate = useNavigate();

	// const onNavigateToHome = () => {
	// 	if (location.pathname === "/") {
	// 		console.log(location.pathname);
	// 		// toggleSidebar();
	// 	}
	// 	navigate("/", { replace: true });
	// };
	// const onSearchStringChange = ({ target: { value } }) => {
	// 	setSearchString(value);
	// };
	// const onSubmitSearch = event => {
	// 	event.preventDefault();
	// 	// const newQuery = searchString;
	// 	// if (!newQuery.trim()) {
	// 	// 	navigate("/");
	// 	// 	return;
	// 	// }
	// 	// setQuery(newQuery);
	// 	// navigate(`/search/${newQuery}`);
	// };
	return (
		<p>Photo</p>
		// <CustomNavBar
		// 	onNavigateToHome={onNavigateToHome}
		// 	searchString={searchString}
		// 	onSearchStringChange={onSearchStringChange}
		// 	onSubmitSearch={onSubmitSearch}
		// />
	);
}

export default Photo;
