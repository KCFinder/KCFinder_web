import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../asset/logo/mainLogo.svg";
import styles from './Nav.module.css';
import Dropdown from "../dropdown";
import navContent from "../../constants/navcontent";
import { useAuth } from "../../context/AuthContext";

export default function Nav() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuthenticated, logout, user } = useAuth();


  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleNavItemClick = (item) => {
    navigate(item.path);
  };

  const handleLogout = () => {
    logout(); // AuthContext의 로그아웃 함수 호출
    navigate('/auth/login'); // 로그아웃 후 로그인 페이지로 이동
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
              {isAuthenticated ? ( // 로그인 상태에 따라 조건부 렌더링
                  // 로그인 되어 있을 경우 '로그아웃' 버튼 표시
                  <>
                    <li onClick={handleLogout}>로그아웃</li>
                  </>
              ) : (
                  // 로그인 되어 있지 않을 경우 '로그인'과 '회원가입' 버튼 표시
                  <>
                    <li onClick={() => navigate('/auth/login')}>로그인</li>
                    <li onClick={() => navigate('/auth/sign-up')}>회원가입</li>
                  </>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <Dropdown className={styles.dropdown} navContent={navContent} activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}/>

    </>
  );
}