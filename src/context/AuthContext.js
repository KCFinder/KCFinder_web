// src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

// 1. AuthContext 생성
const AuthContext = createContext();

// 2. AuthProvider 컴포넌트 구현
export const AuthProvider = ({ children }) => {
  // 상태는 초기값으로 설정됩니다. 새로고침하면 이 값들로 돌아갑니다.
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // 새로고침 시 로그인 상태를 복원하는 로직이 필요 없으므로 useEffect 훅을 제거합니다.

  // 로그인 함수: 사용자 정보만 받아 상태를 업데이트합니다.
  const login = userData => {
    // 로컬 스토리지에 토큰을 저장하는 로직이 필요 없습니다.
    setUser(userData);
    setIsAuthenticated(true);
  };

  // 로그아웃 함수: 상태를 초기화합니다.
  const logout = () => {
    // 로컬 스토리지에서 토큰을 삭제하는 로직이 필요 없습니다.
    setUser(null);
    setIsAuthenticated(false);
  };

  // value에 login과 logout 함수를 포함시킵니다.
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3. 커스텀 훅으로 사용하기 쉽게 만들기
export const useAuth = () => {
  return useContext(AuthContext);
};
