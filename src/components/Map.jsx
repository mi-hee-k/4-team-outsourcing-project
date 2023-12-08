import {useEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';

const MapComponent = () => {
  // State 정의
  const [info, setInfo] = useState(); // 마커 클릭 시 정보를 담는 상태
  const [markers, setMarkers] = useState([]); // 키워드 검색 결과 마커 정보를 담는 상태
  const [map, setMap] = useState(); // 지도 객체를 담는 상태
  const [searchAddress, setSearchAddress] = useState(''); // 검색어를 담는 상태
  const [position, setPosition] = useState(); // 클릭한 위치 좌표를 담는 상태
  const [isOpen, setIsOpen] = useState(false); // 마커 여닫기

  const {kakao} = window; // 카카오 맵 API

  useEffect(() => {
    // 주소를 좌표로 변환하는 함수
    const searchAddrFromCoords = (coords, callback) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    };

    // 좌표를 상세한 주소로 변환하는 함수
    const searchDetailAddrFromCoords = (coords, callback) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    };

    // 지도 중심 좌표에 대한 주소 정보를 표시하는 함수
    const displayCenterInfo = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // centerAddr 엘리먼트 찾기
        let infoDiv = document.getElementById('centerAddr');

        if (!infoDiv) {
          // 존재하지 않으면 엘리먼트 생성
          infoDiv = document.createElement('div');
          infoDiv.id = 'centerAddr';
          // 여기서 필요한 스타일이나 속성을 추가할 수 있습니다.
          // 예: infoDiv.style.color = '#000';
          // ...

          // 생성한 엘리먼트를 어딘가에 추가 (예: body에 추가)
          document.body.appendChild(infoDiv);
        }

        // 검색 결과가 있을 때 주소 정보 표시
        for (let i = 0; i < result.length; i++) {
          if (result[i].region_type === 'H') {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    };

    // 지도가 생성되었을 때 이벤트 핸들러 등록
    if (map) {
      // 마커 클릭 시 상세 주소 표시 이벤트
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            // const {address_name} = result[0].road_address;
            const {address_name} = result[0].address;
            console.log(address_name);
            let detailAddr = !!result[0].road_address
              ? result[0].road_address.address_name + '</div>'
              : result[0].address.address_name;
            const content = '<div class="bAddr">' + detailAddr + '</div>';
            const marker = new kakao.maps.Marker();
            const infowindow = new kakao.maps.InfoWindow({zindex: 1});
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);
            infowindow.setContent(content);
            infowindow.open(map, marker);

            console.log('클릭한 위치의 주소:', result[0].address.address_name);
          }
        });
      });

      // 지도 중심 좌표 변경 시 이벤트
      kakao.maps.event.addListener(map, 'idle', function () {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      });
    }
  }, [map, searchAddress]);

  // 검색어 입력 핸들러
  const handleSearchAddress = e => {
    setSearchAddress(e.target.value);
  };

  // 키워드 검색 함수
  const search = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchAddress, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let newMarkers = [];

        for (let i = 0; i < data.length; i++) {
          newMarkers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(newMarkers);
        map.setBounds(bounds);
      }
    });
  };

  // 컴포넌트 렌더링
  return (
    <>
      {/* 지도 컴포넌트 */}
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: '100%',
          height: '500px',
        }}
        level={3}
        onCreate={setMap}
        onClick={(_, mouseEvent) => {
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          });
          search(); // 클릭 이벤트에서 search 함수 호출
        }}
      >
        {/* 클릭한 위치에 마커 표시 */}
        {position && <MapMarker position={position} />}
        {/* 검색 결과 마커 표시 */}
        {markers.map(marker => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
            onMouseOver={
              // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
              () => setIsOpen(true)
            }
            onMouseOut={
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              () => setIsOpen(false)
            }
            draggable={true}
            clickable={true}
            removable={true}
          >
            {/* 클릭한 마커에 대한 정보 표시 */}
            {info && info.content === marker.content && (
              <div style={{color: '#000', width: '100px', height: '50px'}}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
      {/* 검색어 입력창과 버튼 */}
      <div>
        <input value={searchAddress} onChange={handleSearchAddress}></input>
        <button onClick={search}>클릭</button>
      </div>
    </>
  );
};

export default MapComponent;
