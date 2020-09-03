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

import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

const Wrapper = styled.div`
    height: 100%;
    padding: 8px;
    overflow: hidden;
`;

const getMarkerStyle= (icon) => {
  return {
    backgroundImage: icon,
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
    const styles = {
      width: props.map.canvas.size.width,
      height: props.map.canvas.size.height,
    }

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
        props.map.marker.forEach( (mark)=>{
  
          let reactMarker = React.createElement('div',getMarkerStyle(mark.img),'styled');
          let marker = new mapboxgl.Marker(reactMarker).setLngLat(mark.coordinates).setPopup(new mapboxgl.Popup({offset:25,closeOnClick: mark.closeOnClick }).setHTML('<h3>'+mark.title + '</h3><p>'+mark.description +'</p>')).addTo(map);          
          if(mark.display)
            marker.getPopup().addTo(map);
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
    canvas:PropTypes.shape({
      size:PropTypes.shape({
        width:PropTypes.string,
        height:PropTypes.string
      })
    }),
    camera:PropTypes.shape({
      center: PropTypes.array,
      zoom: PropTypes.number
    }),
    
    marker: PropTypes.arrayOf(PropTypes.shape({
      img:PropTypes.string,//defaultIcon,
      coordinates: PropTypes.array,
      title: PropTypes.string,
      description: PropTypes.string,
      display:PropTypes.bool
      
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
