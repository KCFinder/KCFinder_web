import React from 'react'
import styles from './Dropdown.module.css';
import { useNavigate } from 'react-router';

export default function Dropdown({ navContent, activeDropdown, setActiveDropdown }) {
  const navigate = useNavigate();
  return (
    <>
      {activeDropdown && (
        <div className={styles.dropdownWrapper}
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}>

          <div className={styles.dropdown}>
            <div style={{ width: "150px", height: "40px" }}>
            </div>
            <div className={styles.dropdownItems}>
              <ul>
                {navContent.map((item) => (
                  <li key={item.name}>
                    <ul className={styles.dropdownItems}>
                      {item.dropdownItems.map((subItem) => (
                        <li
                          key={subItem.name}
                          onClick={() => navigate(subItem.path)}
                          style={{ cursor: 'pointer' }}
                        >
                          {subItem.name}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>)}
    </>
  );
}
