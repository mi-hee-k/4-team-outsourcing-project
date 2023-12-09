import {useEffect, useRef, useState} from 'react';
import {Map, MapMarker, MarkerClusterer} from 'react-kakao-maps-sdk';

const MapComponent = ({coordinates}) => {
  // State 정의

  const [positions, setPositions] = useState([]);
  const map = useRef();

  console.log('latArr', coordinates);

  useEffect(() => {
    setPositions(coordinates);
  }, []);

  // 컴포넌트 렌더링
  return (
    <>
      {/* 지도 컴포넌트 */}
      <Map
        ref={map}
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: '100%',
          height: '500px',
        }}
        level={14}
      >
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {positions.map(pos => (
            <MapMarker
              key={`${pos.lat}-${pos.lng}`}
              position={{
                lat: pos.lat,
                lng: pos.lng,
              }}
            />
          ))}
        </MarkerClusterer>
      </Map>
    </>
  );
};

export default MapComponent;
