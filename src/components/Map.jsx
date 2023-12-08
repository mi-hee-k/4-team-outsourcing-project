import React from 'react';
import styled from 'styled-components';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {__getFix} from '../redux/modules/Detail';
import {useSelector} from 'react-redux';

const {kakao} = window;

function Map() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const mapAdrres = useSelector(state => state.fix.fix);
  console.log('받아온 정보', mapAdrres);

  useEffect(() => {
    dispatch(__getFix(id));
  }, []);

  useEffect(() => {
    kakao.maps.load(() => {
      const container = document.getElementById('map');
      const option = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakao.maps.Map(container, option);
    });
  }, []);

  const markerPosition = new kakao.maps.LatLng();

  return (
    <ScMap>
      <div id="map" style={{width: '100%', height: '100%'}}></div>
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
