import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuBox.module.css';
import navContent from '../../constants/navcontent';
import authContent from '../../constants/authContent';

export default function MenuBox({ path }) {
    const isAuthPath = path === '/auth' || path.startsWith('/auth/');
    const currentMenu = isAuthPath ? authContent : navContent.find(item => item.path === path);

    return (
        <div className={styles.wrapper}>
            <div className={styles.contaniner}>
                {currentMenu && (
                    <div className={styles.menuItem}>
                        <Link to={currentMenu.path} className={styles.mainMenu}>
                            {currentMenu.name}
                        </Link>
                        <div className={styles.subMenu}>
                            {currentMenu.dropdownItems.map((subItem) => (
                                <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    className={`${styles.subMenuItem} ${path === subItem.path ? styles.active : ''}`}
                                >
                                    {subItem.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}