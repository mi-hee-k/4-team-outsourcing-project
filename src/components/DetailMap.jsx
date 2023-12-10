import React from 'react';
import {CustomOverlayMap, Map, MapMarker, useKakaoLoader} from 'react-kakao-maps-sdk';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

function DetailMap() {
  useKakaoLoader();
  const fixArr = useSelector(state => state.fix.fix);
  return (
    <ScMap>
      <Map center={{lat: fixArr.latitude, lng: fixArr.longitude}} style={{width: '100%', height: '100%'}} level={3}>
        <ScMapMarker
          position={{lat: fixArr.latitude, lng: fixArr.longitude}}
          image={{
            src: 'https://velog.velcdn.com/images/jetiiin/post/6eff67e2-349b-4fe4-854f-12d1e384536a/image.png', // 마커이미지의 주소입니다
            size: {
              width: 64,
              height: 69,
            },
            options: {
              offset: {
                x: 27,
                y: 69,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        ></ScMapMarker>
        <CustomOverlayMap position={{lat: fixArr.latitude, lng: fixArr.longitude}} yAnchor={2.1}>
          <div className="customoverlay">
            <Link
              to={`https://map.kakao.com/link/map/${fixArr.buildingName},${fixArr.latitude},${fixArr.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              <ScName className="title">
                <div>
                  <ScH1>{fixArr.buildingName}</ScH1>
                  <div>{fixArr.addrInput}</div>
                </div>
                <ScAllowDiv>go</ScAllowDiv>
              </ScName>
            </Link>
          </div>
        </CustomOverlayMap>
      </Map>
    </ScMap>
  );
}
const ScMap = styled.div`
  margin: 100px auto 0px auto;
  width: 70%;
  height: 24%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ScMapMarker = styled(MapMarker)`
  width: max-content;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 1px solid bisque;
`;
const ScName = styled.div`
  width: max-content;
  height: max-content;
  background-color: white;
  border: 1px solid;
  border-radius: 5px;
  padding: 5px;
  color: black;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ScH1 = styled.h1`
  font-size: 17px;
  margin-bottom: 6px;
`;

const ScAllowDiv = styled.div`
  width: 30%;
  height: 100%;
  background-color: #7cb3ff;
  padding: 10% 5px 10% 5px;
  display: flex;
  align-items: center;
  border-radius: 0px 5px 5px 0;
`;
export default DetailMap;
