import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../asset/logo/mainLogo.svg";
import styles from './Nav.module.css';
import Dropdown from "../dropdown";
import navContent from "../../constants/navcontent";

export default function Nav() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleNavItemClick = (item) => {
    navigate(item.path);
  };


  return (
    <>
      <div
        className={styles.navWrapper}
        onMouseLeave={handleMouseLeave}
      >
        <nav className={styles.nav}>
          <div className={styles.logoSection} onClick={() => navigate('/main')}>
            <img
              src={logo}
              alt="KC Finder 로고"
            />
          </div>

          <div className={styles.navContent}>
            <ul>
              {navContent.map((item) => (
                <li
                  key={item.path}
                  onClick={() =>
                    handleNavItemClick(item)
                  }
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  className={activeDropdown === item.name ? styles.active : ''}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.authSection}>
            <ul>
              <li onClick={() => navigate('/auth/login')}>로그인</li>
              <li onClick={() => navigate('/auth/sign-up')}>회원가입</li>
            </ul>
          </div>
        </nav>
      </div>
      <Dropdown className={styles.dropdown} navContent={navContent} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />

    </>
  );
}