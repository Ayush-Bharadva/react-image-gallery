import { useCallback, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { FiUpload } from "react-icons/fi";
import Logo from "../logo/Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../sidebar/Sidebar";
import SearchInput from "../search-input/SearchInput";
import './Header.scss'

function Header({ searchQuery, isSearchPage }) {

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => setIsOpenSidebar(prev => !prev);

  const handleScroll = useCallback(() => {
    const hasScrolled = window.scrollY >= 500;
    setIsScrolled(hasScrolled)
  }, []);

  useEffect(() => {
    if (!isSearchPage) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll, isSearchPage]);

  return (
    <div className="main-header">
      <div className={`nav-bar ${isScrolled || isSearchPage ? "fixed-nav-bar" : "absolute-nav-bar"}`}>
        <div className="nav-bar-left">
          <Logo textColor={isScrolled || isSearchPage ? "black" : "white"} />
          {(isSearchPage || isScrolled) && <SearchInput searchQuery={searchQuery} />}
        </div>
        <div className="nav-bar-right">
          <button type="button" className="text-button" >Explore</button>
          <button type="button" className="text-button" >License</button>
          <button type="button" className="filled-button" >Upload</button>
          <button type="button" className="upload-icon-button" > <FiUpload /> </button>
          <button type="button" className="sidebar-button" onClick={toggleSidebar} > <GiHamburgerMenu /> </button>
        </div>
      </div>
      {!isSearchPage && <header className="hero-section">
        <div className="hero">
          <h1 className="heading">
            The best free stock photos, royalty free images & videos shared by creators
          </h1>
          <SearchInput />
        </div>
      </header>}
      <Sidebar
        closeSidebar={toggleSidebar}
        isSidebarOpen={isOpenSidebar}
      />
    </div>
  )
}

export default Header;

Header.propTypes = {
  searchQuery: PropTypes.string,
  isSearchPage: PropTypes.bool
}