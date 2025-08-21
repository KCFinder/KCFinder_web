// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. AuthContext 생성
const AuthContext = createContext();

// 2. AuthProvider 컴포넌트 구현
export const AuthProvider = ({ children }) => {
    // 상태 초기화 시 로컬 스토리지에서 사용자 정보 불러오기
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('user');
    });

    // 로그인 함수: 사용자 정보를 받아 상태 업데이트 후 로컬 스토리지에 저장
    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // 로그아웃 함수: 상태 초기화 후 로컬 스토리지에서 삭제
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    // user 또는 isAuthenticated 상태가 변경될 때마다 로컬 스토리지에 동기화
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('user');
            setIsAuthenticated(false);
        }
    }, [user]);
    
    // 이 예시에서는 loading 상태를 사용하지 않으므로 제거합니다.
    // 만약 로그인 확인 로직이 비동기라면 loading 상태가 필요할 수 있습니다.

    // value에 login과 logout 함수를 포함시킵니다.
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. 커스텀 훅으로 사용하기 쉽게 만들기
export const useAuth = () => {
    return useContext(AuthContext);
};