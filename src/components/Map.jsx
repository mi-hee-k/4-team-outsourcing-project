// import React from 'react';
// import styled from 'styled-components';
// import {useEffect} from 'react';
// import {useDispatch} from 'react-redux';
// import {useParams} from 'react-router-dom';
// import {__getFix} from '../redux/modules/DetailSlice';
// import {useSelector} from 'react-redux';
// import {Map, MapMarker} from 'react-kakao-maps-sdk';

// const {kakao} = window;

// function Map() {
//   const dispatch = useDispatch();
//   const {id} = useParams();
//   const mapAdrres = useSelector(state => state.fix.fix);

//   console.log('받아온 정보', mapAdrres);

//   useEffect(() => {
//     dispatch(__getFix(id));
//   }, []);

//   useEffect(() => {
//     kakao.maps.load(() => {
//       const container = document.getElementById('map');
//       const option = {
//         center: new kakao.maps.LatLng(mapAdrres.latitude, mapAdrres.longitude),
//         level: 3,
//       };
//       const map = new kakao.maps.Map(container, option);
//     });
//   }, []);

//   const markerPosition = new kakao.maps.LatLng(mapAdrres.latitude, mapAdrres.longitude);

//   return (
//     <ScMap>
//       <Map center={{lat: 33.5563, lng: 126.79581}} style={{width: '100%', height: '360px'}}>
//         <MapMarker position={{lat: 33.55635, lng: 126.795841}}>
//           <div style={{color: '#000'}}>Hello World!</div>
//         </MapMarker>
//       </Map>
//     </ScMap>
//   );
// }
// const ScMap = styled.div`
//   margin: 50px auto 0px auto;
//   width: 70%;
//   height: 230px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: var(--light-blue);
// `;
// export default Map;
// å
