import React from 'react';
import styled from 'styled-components';
import {useEffect} from 'react';

const {kakao} = window;

function Map() {
  useEffect(() => {
    const container = document.getElementById('map');
    const option = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, option);
  }, []);

  return (
    <ScMap>
      <map id="map" style={{width: '100%', height: '100%'}}></map>
    </ScMap>
  );
}
const ScMap = styled.div`
  margin: 50px auto 0px auto;
  width: 70%;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-blue);
`;
export default Map;
