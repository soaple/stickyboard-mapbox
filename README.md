# stickyboard-mapbox
MapBox component for StickyBoard

[![Version](https://img.shields.io/npm/v/@stickyboard/mapbox.svg)](https://npmjs.org/package/@stickyboard/mapbox)
[![Downloads/week](https://img.shields.io/npm/dw/@stickyboard/mapbox.svg)](https://npmjs.org/package/@stickyboard/mapbox)
[![License](https://img.shields.io/npm/l/@stickyboard/mapbox.svg)](https://github.com/soaple/@stickyboard/mapbox/blob/master/package.json)

# Webpack watch
```bsh
$ npm start
```

# Build
```bsh
$ npm run build
```

# Publish to npm
```bsh
$ npm run publish
```

# License
This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).




# Sample code
This is a sample code, please make your inputs and try

#1 Basic marker and line sample

![mapbox_Ex1](https://user-images.githubusercontent.com/52831199/92392592-783f0200-f159-11ea-993c-a3f44b32315f.PNG)

```bsh
import React from 'react';
import { MapBox } from '@stickyboard/mapbox';

const sampleInputs = {
    data:{
        mapboxKey:'YOUR MAPBOX KEY VALUE HERE!!!',
        title:'Stickyboard-mapbox example',
        description: 'This component is one of stickers in Stickyboard',
    },
    map:{
        canvas:{
            size:{
                width:'400px',
                height:'400px'
            }
        },
        camera:{
            center: [-77.04, 38.907],
            zoom: 10
        },
        
        marker: [{
        coordinates: [-77.038659, 38.931567],
        title: 'Mapbox Sticker Example#1',
        description: '<strong>Make it Mount Pleasant</strong>',
        display:true,
        closeOnClick:true
        },{
            coordinates: [-77.003168, 38.894651],
            title: 'Mapbox Sticker Example#2',
            description: '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
            closeOnClick:true
        },{
            coordinates: [-77.090372, 38.881189],
            title: 'Mapbox Sticker Example#3',
            description: '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.</p>',
            closeOnClick:true
        },{
            coordinates: [-77.111561, 38.882342],
            title: 'Mapbox Sticker Example#4',
            description: '<strong>Ballston Arts & Crafts Market</strong>',
            display:true,
            closeOnClick:true
        },
    
    ],
        
        line:[{
        paint:{
            lineColor : '#888',
            lineWidth: 8
        },
        coordinates: [
            [-77.038659, 38.931567],
            [-77.003168, 38.894651],
            [-77.090372, 38.881189],
            [-77.111561, 38.882342]
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

function MapBoxChart(props) {
    
    return (
        <div >

            <MapBox data={sampleInputs.data} map={sampleInputs.map}/>
        </div>
    );
}

export default MapBoxChart;
```


#2 Pitch and bearing 

![mapbox_Ex2_pitch_bearing](https://user-images.githubusercontent.com/52831199/92392766-bf2cf780-f159-11ea-8550-564b2d5cf1db.PNG)

```bsh
map:{
        canvas:{
           ...
        },
        camera:{
            center: [-77.04, 38.907],
            zoom: 11,
            pitch:60,
            bearing:-60
        },
        ...
```


#3 enable / disable scroll Zoom

Default is disable.

![mapbox_Ex3_scrollable](https://user-images.githubusercontent.com/52831199/92394161-fdc3b180-f15b-11ea-862f-8140c4ef087f.PNG)

```bsh
map:{
        canvas:{
            size:{
          ...
            },
            scrollZoom:true
        },
 ```


#4 3 type of Map styles

1) streets-v11 (default)

![mapbox_Ex2_pitch_bearing](https://user-images.githubusercontent.com/52831199/92392766-bf2cf780-f159-11ea-8550-564b2d5cf1db.PNG)

```bsh
map:{
        canvas:{
            style:0, //1, 2

```

2) light-v10

![mapbox_Ex4_theme1](https://user-images.githubusercontent.com/52831199/92394812-2bf5c100-f15d-11ea-87fa-eac9eda4d71f.PNG)

```bsh
map:{
        canvas:{
            style:1,
```

3) dark=v10

![mapbox_Ex4_theme2](https://user-images.githubusercontent.com/52831199/92394832-34e69280-f15d-11ea-868e-e6b5ce246884.PNG)


```bsh
map:{
        canvas:{
            style:2,
```
