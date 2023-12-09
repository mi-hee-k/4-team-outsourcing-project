import React from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import {useSelector} from 'react-redux';

function DetailMap() {
  const fixArr = useSelector(state => state.fix.fix);
  console.log('fix', fixArr);
  return (
    <Map center={{lat: fixArr.latitude, lng: fixArr.longitude}} style={{width: '800px', height: '600px'}} level={3}>
      <MapMarker position={{lat: fixArr.latitude, lng: fixArr.longitude}}> </MapMarker> // 마커 좌표
    </Map>
  );
}

export default DetailMap;
