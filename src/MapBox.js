// src/MapBox.js

/*******************************************************************************************************************************
 * File : MapBox.js
 * In this file, Mapbox component is implemented with react hook.
 * Markers and lines can be displayed in Mapbox map with props.map.marker.coordinates / props.map.line.coordinates
 * Author : Jeesub Kim
 *******************************************************************************************************************************/
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import mapboxgl from 'mapbox-gl';
import Axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css';


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 8px;
    overflow: hidden;
`;

const getMarkerStyle = (icon) => {
    return {
        backgroundImage: icon,
        backgroundSize: 'cover',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        cursor: 'pointer',
    };
};

const mapboxStyle = [
    'mapbox://styles/mapbox/streets-v11',
    'mapbox://styles/mapbox/light-v10',
    'mapbox://styles/mapbox/dark-v10',
    'mapbox://styles/mapbox/satellite-v9',
    'mapbox://styles/mapbox/satellite-streets-v11',
    'mapbox://styles/mapbox/outdoors-v11',
];

const building3dLayer = {
    id: '3d-buildings',
    source: 'composite',
    'source-layer': 'building',
    filter: ['==', 'extrude', 'true'],
    type: 'fill-extrusion',
    minzoom: 15,
    paint: {
        'fill-extrusion-color': '#aaa',

        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height'],
        ],
        'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height'],
        ],
        'fill-extrusion-opacity': 0.6,
    },
};

const add3dBuildingLayer = (map) => {
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

    map.addLayer(building3dLayer, labelLayerId);
};

function MapBox(props) {
    mapboxgl.accessToken = props.data.mapboxKey;

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);


    const initMap = ({setMap, mapContainer}) =>{
      let mapOption = {
            container: mapContainer.current,
            style:
                props.map.canvas.style !== undefined
                    ? mapboxStyle[props.map.canvas.style]
                    : 'mapbox://styles/mapbox/streets-v11',
            center: props.map.camera.center,
            zoom: props.map.camera.zoom,
        };
        if (props.map.camera.pitch !== undefined)
            mapOption.pitch = props.map.camera.pitch;
        if (props.map.camera.bearing !== undefined)
            mapOption.bearing = props.map.camera.bearing;
        if (props.slideshow !== undefined) {
            mapOption.maxZoom = props.slideshow.maxZoom;
            mapOption.minZoom = props.slideshow.minZoom;
        }

        const mMap = new mapboxgl.Map(mapOption);

        if (!props.map.canvas.scrollZoom) mMap.scrollZoom.disable();
      
        mMap.on('load', () => {
          mMap.resize();
          if(props.map.canvas.building3d){
            add3dBuildingLayer(mMap);
          }

          if(props.map.canvas.geoLocation)
          {
            if(!navigator.geolocation){
              console.log('Geolocation is not supported by this browser');
            } else {
              console.log('Getting current position');
              navigator.geolocation.getCurrentPosition( position => {

                const urlByGps = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + props.data.openweathermapKey;

                const loc = {
                  center:[position.coords.longitude,position.coords.latitude],
                  zoom:14,
                  pitch:60,
                  bearing:-60,
                }
                mMap.flyTo(loc);
                Axios.get(urlByGps).then( res => {
                      const data = res.data;
                      console.log(data);
                      const weatherInformation = {
                        name : data.name,
                        rain : data.rain['1h'],
                        clouds : data.clouds.all,
                        weather : data.weather[0],
                        feels_like : (data.main.feels_like - 273).toFixed(2),
                        humidity : data.main.humidity,
                        pressure : data.main.pressure,
                        temp : (data.main.temp - 273).toFixed(2),
                        temp_max : (data.main.temp_max - 273).toFixed(2),
                        temp_min : (data.main.temp_min - 273).toFixed(2),
                        wind : data.wind,
                        loading : false,
                      }
                      const imgSrc = 'http://openweathermap.com/img/w/' + weatherInformation.weather.icon + '.png';

                      mMap.once('moveend', () => {
                        let markerElement = document.createElement('div');
                        markerElement.style.cssText=`background-image: url(${imgSrc});
                        background-size: cover;
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        cursor: pointer;`;

                        let marker = new mapboxgl.Marker(markerElement).setLngLat(loc.center).setPopup(new mapboxgl.Popup({offset:25})
                        .setHTML(`<h2> ${weatherInformation.name} </h2>
                         <p> <h3> It's ${weatherInformation.weather.main}y (${weatherInformation.weather.description})<br>
                         Feels like ${weatherInformation.feels_like} 'C <br> </h3>

                         Rain : ${weatherInformation.rain} per hour<br>
                         Temperature : ${weatherInformation.temp} 'C <br>
                                       - MAX : ${weatherInformation.temp_max} 'C <br>
                                       - MIN : ${weatherInformation.temp_min} 'C <br>
                         Humidity : ${weatherInformation.humidity}, 
                         Clouds : ${weatherInformation.clouds}<br>
                         Wind : Speed - ${weatherInformation.wind.speed}, Degree : ${weatherInformation.wind.deg}<br><br> </p>`)).addTo(mMap);
                         marker.getPopup().addTo(mMap);
                      });
                }).catch( err => console.log(err) );


             })
           }
        } 
        
        setMap(mMap);
        
      });
       
    };

    const drawMarkers = () => {
        if (map) {
            if (props.map.marker !== undefined) {
                props.map.marker.forEach((mark) => {
                    let reactMarker = React.createElement(
                        'div',
                        getMarkerStyle(mark.img),
                        'styled'
                    );
                    let marker = new mapboxgl.Marker(reactMarker)
                        .setLngLat(mark.coordinates)
                        .setPopup(
                            new mapboxgl.Popup({
                                offset: 25,
                                closeOnClick: mark.closeOnClick,
                            }).setHTML(
                                '<h3>' +
                                    mark.title +
                                    '</h3><p>' +
                                    mark.description +
                                    '</p>'
                            )
                        )
                        .addTo(map);

                    if (mark.display) marker.getPopup().addTo(map);
                });
            }
        }
    };

    const drawLines = () => {
        if (map) {
            if (props.map.line !== undefined) {
                props.map.line.forEach((line, idx) => {
                    let id = 'route' + idx;
                    let route = {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: line.coordinates,
                                    },
                                    properties: {
                                        title: line.title,
                                        description: line.description,
                                    },
                                },
                            ],
                        },
                    };
                    let layer = {
                        id: 'layer' + idx,
                        type: 'line',
                        source: id,
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round',
                        },
                        paint: {
                            'line-color': line.paint.lineColor,
                            'line-width': line.paint.lineWidth,
                        },
                    };

                    map.addSource(id, route);
                    map.addLayer(layer);
                });
            }
        }
    };

    const addSources = () => {
        if (map) {
            props.source.map((source) => {
                map.addSource(source.name, {
                    type: source.type,
                    url: source.url,
                });
            });
        }
    };

    const addLayers = () => {
        if (map) {
            props.layer.map((layer) => {
                map.addLayer(layer);
            });
        }
    };

    const storeLocationsForPlay = () => {
        let locations = props.slideshow.location.map((loc) => {
            return {
                id: loc.id,
                title: loc.title,
                description: loc.description,
                camera: loc.camera,
            };
        });

        playback(0, locations);
    };

    const playback = (index, locations) => {
        if (map) {
            map.flyTo(locations[index].camera);
            map.once('moveend', () => {
                let reactMarker = React.createElement(
                    'div',
                    getMarkerStyle(undefined),
                    'styled'
                );
                let marker = new mapboxgl.Marker(reactMarker)
                    .setLngLat(locations[index].camera.center)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }).setHTML(
                            '<h3>' +
                                locations[index].title +
                                '</h3><p>' +
                                locations[index].description +
                                '</p>'
                        )
                    )
                    .addTo(map);
                marker.getPopup().addTo(map);

                window.setTimeout(
                    () => {
                        marker.remove();
                        index = index + 1 === locations.length ? 0 : index + 1;

                        playback(index, locations);
                    },
                    props.timeoutSec !== undefined ? props.timeoutSec : 3000
                );
            });
        }
    };

    useEffect(() => {
        if (!map) initMap({ setMap, mapContainer });

        drawMarkers();
        drawLines();

        if (props.slideshow) storeLocationsForPlay();
        if (props.source) addSources();
        if (props.layer) addLayers();
    }, [map]);

    return (
        <Wrapper>
            <div
                ref={(el) => (mapContainer.current = el)}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </Wrapper>
    );
}

MapBox.propTypes = {
    data: PropTypes.shape({
        mapboxKey: PropTypes.string.isRequired,
        openweathermapKey:PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    map: PropTypes.shape({
        canvas: PropTypes.shape({
            style: PropTypes.number,
            building3d: PropTypes.bool,
            scrollZoom: PropTypes.bool,
            geoLocation:PropTypes.bool,
            interactive:PropTypes.bool
        }),
        camera: PropTypes.shape({
            center: PropTypes.array,
            zoom: PropTypes.number,
            pitch: PropTypes.number,
            bearing: PropTypes.number,
        }),
        marker: PropTypes.arrayOf(
            PropTypes.shape({
                img: PropTypes.string, //defaultIcon,
                coordinates: PropTypes.array,
                title: PropTypes.string,
                description: PropTypes.string,
                display: PropTypes.bool,
            })
        ),
        line: PropTypes.arrayOf(
            PropTypes.shape({
                paint: {
                    lineColor: PropTypes.string,
                    lineWidth: PropTypes.number,
                },
                coordinates: PropTypes.arrayOf(PropTypes.array),
                title: PropTypes.string,
                description: PropTypes.string,
            })
        ),
    }),
    slideshow: PropTypes.shape({
        maxZoom: PropTypes.number,
        minZoom: PropTypes.number,
        timeoutSec: PropTypes.number,
        location: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                title: PropTypes.string,
                description: PropTypes.string,
                camera: PropTypes.shape({
                    center: PropTypes.array,
                    zoom: PropTypes.number,
                    pitch: PropTypes.number,
                    bearing: PropTypes.number,
                }),
            })
        ),
    }),
    source: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string,
            url: PropTypes.string,
        })
    ),
    layer: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            type: PropTypes.string,
            source: PropTypes.string,
            'source-layer': PropTypes.string,
            layout: PropTypes.shape({
                'line-join': PropTypes.string,
                'line-cap': PropTypes.string,
            }),
            paint: PropTypes.shape({
                'line-color': PropTypes.string,
                'line-width': PropTypes.number,
            }),
        })
    ),
};

export default MapBox;
