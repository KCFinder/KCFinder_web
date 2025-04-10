import React, { useState, useEffect, useRef } from 'react';
import styles from './Location.module.css';
import MenuBox from '../../component/menuBox';
import location_icon from '../../asset/icon/location.svg'

export default function Location() {
  const mapElement = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NAVER_MAP_API_KEY;

    const mapScript = document.createElement('script');
    mapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}`;
    mapScript.async = true;

    mapScript.onload = () => {
      setIsMapLoaded(true);
    };

    document.head.appendChild(mapScript);

    return () => {
      mapScript.onload = null;
    };
  }, []);

  useEffect(() => {
    if (isMapLoaded && window.naver && mapElement.current) {
      const location = new window.naver.maps.LatLng(35.1182355805027, 129.042437247852);

      const mapOptions = {
        center: location,
        zoom: 18
      };

      const map = new window.naver.maps.Map(mapElement.current, mapOptions);

      const marker = new window.naver.maps.Marker({
        map,
        position: location,
      });
    }
  }, [isMapLoaded]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path="/introduction" />
        <div className={styles.box}>
          <h2>오시는 길</h2>
          <div>
            <div>
              <div ref={mapElement} style={{ width: '100%', height: '500px' }} />
              <div className={styles.locationInfo}>
                <span><img src={location_icon} width={30} alt="위치 아이콘" /></span>
                <span>부산광역시 동구 초량동 1194-5 205호</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}