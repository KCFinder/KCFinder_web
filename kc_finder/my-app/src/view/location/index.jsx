import React, { useState, useEffect } from 'react';
import styles from './Location.module.css';
import MenuBox from '../../component/menuBox';
import location from '../../asset/img/location.jpg'
import location_icon from '../../asset/icon/location.svg'

// const NAVER_MAP_API = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=`;
// const apiKey = process.env.REACT_APP_NAVER_API;

export default function Location() {
  // const [latLng, setLatLng] = useState(null);
  // const [map, setMap] = useState(null);

  // useEffect(() => {
  //   setLatLng({
  //     lat: 35.1524181,
  //     lng: 129.0596052
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!latLng) return;

  //   const loadMap = () => {
  //     const script = document.createElement("script");
  //     script.src = `${NAVER_MAP_API}${apiKey}&modules=geocoder`;
  //     script.async = true;

  //     script.onload = () => {
  //       console.log("Naver maps script loaded");
  //       console.log("Window.naver:", window.naver);

  //       if (!window.naver || !window.naver.maps) {
  //         console.error("네이버 지도 라이브러리 로드 실패");
  //         return;
  //       }

  //       try {
  //         const newMap = new window.naver.maps.Map("map", {
  //           center: new window.naver.maps.LatLng(latLng.lat, latLng.lng),
  //           zoom: 25,
  //           scaleControl: false,
  //           logoControl: false,
  //           mapDataControl: false,
  //           zoomControl: true,
  //           minZoom: 6,
  //           zoomControlOptions: {
  //             position: window.naver.maps.Position.TOP_RIGHT
  //           },
  //         });

  //         new window.naver.maps.Marker({
  //           position: new window.naver.maps.LatLng(latLng.lat, latLng.lng),
  //           map: newMap,
  //         });

  //         setMap(newMap);
  //       } catch (error) {
  //         console.error("지도 생성 중 오류:", error);
  //       }
  //     };

  //     script.onerror = (error) => {
  //       console.error("지도 스크립트 로드 실패", error);
  //     };

  //     document.head.appendChild(script);

  //     return () => {
  //       if (document.head.contains(script)) {
  //         document.head.removeChild(script);
  //       }
  //     };
  //   };

  //   loadMap();
  // }, [latLng, apiKey]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path="/introduction" />
        <div className={styles.box}>
          <h2>오시는 길</h2>
          <div>
            <div>
              <div className={styles.locationMap}>
                <img style={{ width: '100%' }} src={location} alt="오시는 길" />
              </div>
              <div className={styles.locationInfo}>
                <span><img src={location_icon} width={30} alt="위치 아이콘" /></span>
                <span>부산광역시 동구 초량동 1194-5 205호</span>
              </div>
            </div>

            {/* <div className={styles.map}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" }}>
                <div
                  id="map"
                  style={{ width: "1000px", height: "700px", borderRadius: "5px", backgroundColor: "#f5f5f5" }}
                />
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
}