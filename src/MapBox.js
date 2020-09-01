// src/MapBox.js

/*******************************************************************************************************************************
 * File : MapBox.js
 * In this file, Mapbox component is implemented with react hook.
 * Markers and lines can be displayed in Mapbox map with props.map.marker.coordinates / props.map.line.coordinates
 * Author : Jeesub Kim
 *******************************************************************************************************************************/
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import Box from '@material-ui/core';

import defaultIcon from './mapbox-icon.png'
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

/**********************Sample input ********************************************************************************************
 * 
 * const sampleInputs = {
  data:{
      mapboxKey:'pk.eyJ1IjoiamVlc3ViIiwiYSI6ImNrZTAxemlnOTBmZmYycnA3aG8wcmo1eWkifQ.wTZ5zzP0m-nh8JrhcIu94A',
      title:'Stickyboard-mapbox example',
      description: 'This component is one of stickers in Stickyboard',
  },
  map:{
      camera:{
      center: [-122.486052, 37.830348],
      zoom: 10
      },
      
      marker: [{
      coordinates: [-77.032, 38.913],
      title: 'Mapbox',
      description: 'Washington, D.C.'
      },{
          coordinates: [-122.414, 37.776],
          title: 'Mapbox',
          description: 'San Francisco, California'
      }],
      
      line:[{
      paint:{
          lineColor : '#888',
          lineWidth: 8
      },
      coordinates: [
          [-122.48369693756104, 37.83381888486939],
          [-122.48348236083984, 37.83317489144141],
          [-122.48339653015138, 37.83270036637107],
          [-122.48356819152832, 37.832056363179625],
          [-122.48404026031496, 37.83114119107971],
          [-122.48404026031496, 37.83049717427869],
          [-122.48348236083984, 37.829920943955045],
          [-122.48356819152832, 37.82954808664175],
          [-122.48507022857666, 37.82944639795659],
          [-122.48610019683838, 37.82880236636284],
          [-122.48695850372314, 37.82931081282506],
          [-122.48700141906738, 37.83080223556934],
          [-122.48751640319824, 37.83168351665737],
          [-122.48803138732912, 37.832158048267786],
          [-122.48888969421387, 37.83297152392784],
          [-122.48987674713133, 37.83263257682617],
          [-122.49043464660643, 37.832937629287755],
          [-122.49125003814696, 37.832429207817725],
          [-122.49163627624512, 37.832564787218985],
          [-122.49223709106445, 37.83337825839438],
          [-122.49378204345702, 37.83368330777276]
      ],
      title: 'line#1',
      description: 'line#1 description here'
      
      },{
          paint:{
              lineColor : '#222',
              lineWidth: 8
          },
          coordinates: [
              [-112.48369693756104, 37.83381888486939],
              [-112.48348236083984, 37.83317489144141],
              [-112.48339653015138, 37.83270036637107],
              [-112.48356819152832, 37.832056363179625],
              [-112.48404026031496, 37.83114119107971],
              [-112.48404026031496, 37.83049717427869],
              [-112.48348236083984, 37.829920943955045],
              [-112.48356819152832, 37.82954808664175],
              [-112.48507022857666, 37.82944639795659],
              [-112.48610019683838, 37.82880236636284],
              [-112.48695850372314, 37.82931081282506],
              [-112.48700141906738, 37.83080223556934],
              [-112.48751640319824, 37.83168351665737],
              [-112.48803138732912, 37.832158048267786],
              [-112.48888969421387, 37.83297152392784],
              [-112.48987674713133, 37.83263257682617],
              [-112.49043464660643, 37.832937629287755],
              [-112.49125003814696, 37.832429207817725],
              [-112.49163627624512, 37.832564787218985],
              [-112.49223709106445, 37.83337825839438],
              [-112.49378204345702, 37.83368330777276]
          ],
          title: 'line#1',
          description: 'line#1 description here'
      }],
  }
}

 ******************************************************************************************************************************************/
const styles = {
    width: "100vw",
    height: "calc(100vh - 80px)",
    position: "absolute"
  };

const Wrapper = styled.div`
    height: 100%;
    padding: 8px;
    overflow: scroll;
`;

const getMarkerStyle= (icon) => {
  return {
    backgroundImage: `url(${icon})`,
    backgroundSize: 'cover',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    cursor: 'pointer'
  }
}

function MapBox(props) {
    mapboxgl.accessToken = props.data.mapboxKey;

    
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    
    const initMap = ({setMap, mapContainer}) =>{
      const mMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: props.map.camera.center,
        zoom: props.map.camera.zoom
      });
      
      mMap.on('load', () =>{
        mMap.resize();
        setMap(mMap);
        
      });
    };

    const drawMarkers = ()=>{

      if(map){
        console.log(props.map.marker);
        props.map.marker.forEach( (mark)=>{
  
          console.log(mark);
          // let markerElement = document.createElement('div');

          let reactMarker = React.createElement('div',getMarkerStyle(mark.img?mark.img:defaultIcon),'styled');
          // markerElement.style = getMarkerStyle(mark.img?mark.img:defaultIcon);
          // markerElement.style.cssText=`background-image: url(${defaultIcon});
          // background-size: cover;
          // width: 50px;
          // height: 50px;
          // border-radius: 50%;
          // cursor: pointer;`;
          

          new mapboxgl.Marker(reactMarker).setLngLat(mark.coordinates).setPopup(new mapboxgl.Popup({offset:25}).setHTML('<h3>'+mark.title + '</h3><p>'+mark.description +'</p>')).addTo(map);          
        })
      }
      
    }

    const drawLines = ()=>{

      if(map){
        props.map.line.forEach ( (line,idx)=>{
          
          let id = 'route'+idx;
          let route = {
            type : 'geojson',
            data : {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: line.coordinates
                  },
                  properties:{
                    title:line.title,
                    description:line.description
                  }
                }
              ]
            }
          }
          let layer = {
            id: 'layer'+idx,
            type: 'line',
            source: id,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': line.paint.lineColor,
              'line-width': line.paint.lineWidth
            }
          }

          console.log(id,route,layer);
          map.addSource(id,route);
          map.addLayer(layer);
        })
      }
      
    }
    useEffect( ()=>{
        if(!map)
          initMap({setMap, mapContainer});

        drawMarkers();
        drawLines();
    },[map]);
      
    return (
      <Wrapper>    
          <div>
              <div ref = {el => mapContainer.current = el} style={styles}/>
          </div>
      </Wrapper>
    )
}

MapBox.propTypes ={
  data:PropTypes.shape({
    mapboxKey:PropTypes.string.isRequired,
    title:PropTypes.string,
    description: PropTypes.string,
  }),
  map:PropTypes.shape({
    camera:{
      center: PropTypes.array,
      zoom: PropTypes.number
    },
    
    marker: PropTypes.arrayOf(PropTypes.shape({
      img:PropTypes.string,//defaultIcon,
      coordinates: PropTypes.array,
      title: PropTypes.string,
      description: PropTypes.string
      
    })),
    
    line:PropTypes.arrayOf(PropTypes.shape({
      paint:{
        lineColor : PropTypes.string,
        lineWidth: PropTypes.number
      },
      coordinates: PropTypes.arrayOf(PropTypes.array),
      title: PropTypes.string,
      description: PropTypes.string
      
    })),


  })
}
export default MapBox;
