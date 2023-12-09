import {useEffect, useRef, useState} from 'react';
import {Map, MapMarker, MarkerClusterer} from 'react-kakao-maps-sdk';

const MapComponent = () => {
  // State 정의

  const [positions, setPositions] = useState([]);
  const map = useRef();

  const {kakao} = window;

  const clusterPositionsData = {
    positions: [
      {
        lat: 37.566826,
        lng: 126.9786567,
      },
      {
        lat: 38.566826,
        lng: 126.9786567,
      },
      {
        lat: 31.566826,
        lng: 126.9786567,
      },
    ],
  };

  useEffect(() => {
    setPositions(clusterPositionsData.positions);
  }, []);

  // 키워드 검색 함수
  // const search = () => {
  //   if (!map) return;
  //   const ps = new kakao.maps.services.Places();

  //   ps.keywordSearch(searchAddress, (data, status, _pagination) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       const bounds = new kakao.maps.LatLngBounds();
  //       let newMarkers = [];

  //       for (let i = 0; i < data.length; i++) {
  //         newMarkers.push({
  //           position: {
  //             lat: data[i].y,
  //             lng: data[i].x,
  //           },
  //           content: data[i].place_name,
  //         });
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //       }
  //       setMarkers(newMarkers);
  //       map.setBounds(bounds);
  //     }
  //   });
  // };

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
