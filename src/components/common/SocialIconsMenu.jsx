import { FaLinkedinIn, FaPinterest, FaTwitter } from "react-icons/fa";
import { GrTumblr } from "react-icons/gr";
import { ImFacebook2 } from "react-icons/im";

function SocialIconsMenu() {
	return (
		<menu>
			<li className="social-icon pinterest-icon-bg">
				<FaPinterest className="pinterest-icon-color" />
			</li>
			<li className="social-icon twitter-icon-bg">
				<FaTwitter className="twitter-icon-color" />
			</li>
			<li className="social-icon linkedin-icon-bg">
				<FaLinkedinIn className="linkedin-icon-color" />
			</li>
			<li className="social-icon facebook-icon-bg">
				<ImFacebook2 className="facebook-icon-color" />
			</li>
			<li className="social-icon tumbler-icon-bg">
				<GrTumblr className="tumbler-icon-color" />
			</li>
		</menu>
	);
}

export default SocialIconsMenu;
