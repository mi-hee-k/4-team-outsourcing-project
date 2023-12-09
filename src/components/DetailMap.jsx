import React from 'react';
import {CustomOverlayMap, Map, MapMarker, useKakaoLoader} from 'react-kakao-maps-sdk';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

function DetailMap() {
  useKakaoLoader();
  const fixArr = useSelector(state => state.fix.fix);
  console.log('fix', fixArr);
  return (
    <ScMap>
      <Map center={{lat: fixArr.latitude, lng: fixArr.longitude}} style={{width: '100%', height: '100%'}} level={3}>
        <ScMapMarker position={{lat: fixArr.latitude, lng: fixArr.longitude}}></ScMapMarker>
        <CustomOverlayMap position={{lat: fixArr.latitude, lng: fixArr.longitude}} yAnchor={2}>
          <div className="customoverlay">
            <a
              href={`https://map.kakao.com/link/map/${fixArr.buildingName},${fixArr.latitude},${fixArr.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              <ScName className="title">
                <div>
                  <ScH1>{fixArr.buildingName}</ScH1>
                  <div>{fixArr.addrInput}</div>
                </div>
                <ScAllowDiv>▶︎</ScAllowDiv>
              </ScName>
            </a>
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
`;
const ScH1 = styled.h1`
  font-size: 17px;
  margin-bottom: 6px;
`;

const ScAllowDiv = styled.div`
  width: 30%;
  height: 50%;
  background-color: red;
  display: flex;
  align-items: center;
`;
export default DetailMap;
