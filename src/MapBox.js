// src/MapBox.js

/****************************************
 * File : MapBox.js
 * In this file, Mapbox is implemented with react hook.
 * 
 * Author : Jeesub Kim
 ****************************************/
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = process.env.REACT_MAPBOX_KEY;

const styles = {
    width: "100vw",
    height: "calc(100vh - 80px)",
    position: "absolute"
  };

const Wrapper = styled.div``;

function MapBox(props) {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    useEffect( ()=>{
    
        const initMap = ({setMap, mapContainer}) =>{
          const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [5,34],
            zoom: 2
          });
    
          map.on('load', () =>{
            setMap(map);
            map.resize();
          });
        };
    
        if(!map)
          initMap({setMap, mapContainer});
    
      },[map]);
      
      return (
        <Wrapper>
            <div>
                <div ref = {el => mapContainer.current = el} style={styles}/>
            </div>
        </Wrapper>
      )
}

export default MapBox;
