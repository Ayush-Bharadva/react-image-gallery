import { createContext, useState } from "react";

export const ModalContext = createContext({
	onModalOpen: () => {},
	onModalClose: () => {},
	modalImageObj: {},
});

function ModalProvider() {
	const [showModal, setshowModal] = useState("");

	return <div>ModalProvider</div>;
}

export default ModalProvider;
