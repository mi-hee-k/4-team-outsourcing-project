import {useEffect, useState} from 'react';
import {Map, MapMarker, MarkerClusterer} from 'react-kakao-maps-sdk';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import useKakaoLoader from './useKaKaoLoader';

const MapComponent = ({coordinates}) => {
  useKakaoLoader();
  // State 정의

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions(coordinates);
  }, [coordinates]);

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
          width: '80%',
          height: '500px',
        }}
        level={14}
      >
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {positions.map((pos, index) => (
            <MapMarker
              key={`${pos.lat}-${pos.lng}`}
              position={{
                lat: pos.lat,
                lng: pos.lng,
              }}
              clickable={true}
              onClick={() => {
                setPositions(prevPositions => {
                  const updatedPositions = [...prevPositions];
                  updatedPositions[index].isOpen = true;
                  return updatedPositions;
                });
              }}
              image={{
                src: 'https://velog.velcdn.com/images/jetiiin/post/6eff67e2-349b-4fe4-854f-12d1e384536a/image.png', // 마커이미지의 주소입니다
                size: {
                  width: 64,
                  height: 69,
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 27,
                    y: 69,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                },
              }}
            >
              {pos.isOpen && (
                <ScInfoWindow>
                  <Link to={`/detail/${pos.id}`}>
                    <div>
                      <p>{pos.title}</p>
                      <section>
                        <ScImgWrapper>
                          <img src={pos.image} alt="" />
                        </ScImgWrapper>
                      </section>
                    </div>
                  </Link>
                  <span
                    onClick={() =>
                      setPositions(prevPositions => {
                        const updatedPositions = [...prevPositions];
                        updatedPositions[index].isOpen = false;
                        return updatedPositions;
                      })
                    }
                  >
                    ❌
                  </span>
                </ScInfoWindow>
              )}
            </MapMarker>
          ))}
        </MarkerClusterer>
      </Map>
    </>
  );
};

const ScInfoWindow = styled.div`
  width: 200px;
  height: 150px;
  position: absolute;
  top: -125px;
  left: -30px;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid #858585;
  padding: 0 10px;

  p {
    width: 80%;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  div {
    height: 130%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: var(--black);
  }

  span {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`;

const ScImgWrapper = styled.figure`
  img {
    width: 100%;
  }
`;

export default MapComponent;
