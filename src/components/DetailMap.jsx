import React from 'react';
import {CustomOverlayMap, Map, MapMarker} from 'react-kakao-maps-sdk';

import {useSelector} from 'react-redux';
import styled from 'styled-components';

function DetailMap() {
  const fixArr = useSelector(state => state.fix.fix);
  console.log('fix', fixArr);
  return (
    <>
      <Map center={{lat: fixArr.latitude, lng: fixArr.longitude}} style={{width: '800px', height: '600px'}} level={3}>
        <ScMapMarker position={{lat: fixArr.latitude, lng: fixArr.longitude}}></ScMapMarker>
        <CustomOverlayMap position={{lat: fixArr.latitude, lng: fixArr.longitude}} yAnchor={2.5}>
          <div className="customoverlay">
            <a
              href={`https://map.kakao.com/link/map/${fixArr.buildingName},${fixArr.latitude},${fixArr.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              <ScName className="title">
                <span>{fixArr.buildingName}</span>
                <span></span>
              </ScName>
            </a>
          </div>
        </CustomOverlayMap>
        {/* 마커 좌표 */}
      </Map>
    </>
  );
}

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
`;
export default DetailMap;
