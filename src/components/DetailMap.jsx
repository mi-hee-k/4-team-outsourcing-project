import React from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import {useSelector} from 'react-redux';

function DetailMap() {
  const fixArr = useSelector(state => state.fix.fix);
  console.log('fix', fixArr);
  return (
    <Map center={{lat: 37.5291904009702, lng: 127.123806229957}} style={{width: '800px', height: '600px'}} level={3}>
      <MapMarker position={{lat: 37.5291904009702, lng: 127.123806229957}}> </MapMarker> // 마커 좌표
    </Map>
  );
}

export default DetailMap;
