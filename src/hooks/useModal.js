import { useState } from "react";

function useModal() {
	const [isShowing, setIsShowing] = useState(false);

	const openModal = () => {
		setIsShowing(true);
	};

	const closeModal = () => {
		setIsShowing(false);
	};

	const toggle = () => {
		setIsShowing(!isShowing);
	};

	return {
		isShowing,
		openModal,
		closeModal,
		toggle
	};
}

export default useModal;
