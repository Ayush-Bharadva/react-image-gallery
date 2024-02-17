import { useCallback, useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Logo from "../header/Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../sidebar/Sidebar";
import SearchInput from "../search-input/SearchInput";
import { SidebarItems } from "../../../utils/constants";

function CommonHeader() {

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => setIsOpenSidebar(prev => !prev);

  const handleScroll = useCallback(function handleScroll() {
    setIsScrolled(() => window.scrollY >= 600);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <div className={`main-header ${isScrolled ? "fixed-header" : "absolute-header"}`}>
        <div className="left">
          <Logo textColor={isScrolled ? "black" : "white"} />
          {isScrolled && <SearchInput />}
        </div>
        <div className="right">
          <ul className="header-items">
            <li>Explore</li>
            <li>License</li>
            <button>Upload</button>
            <button className="upload-btn">
              <FiUpload />
            </button>
            <button className="sidebar-btn">
              <GiHamburgerMenu onClick={toggleSidebar} />
            </button>
          </ul>
        </div>
      </div>
      {!isScrolled && <header className="hero-section">
        <div className="hero">
          <h1 className="heading">
            The best free stock photos, royalty free images & videos shared by creators
          </h1>
          <SearchInput />
        </div>
      </header>}
      <Sidebar
        items={SidebarItems}
        closeSidebar={toggleSidebar}
        sidebarOpen={isOpenSidebar}
      />
    </>
  )
}

export default CommonHeader;