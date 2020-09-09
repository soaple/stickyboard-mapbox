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


#4 6 types of Map style

1) streets-v11 (default)

![mapbox_Ex2_pitch_bearing](https://user-images.githubusercontent.com/52831199/92392766-bf2cf780-f159-11ea-8550-564b2d5cf1db.PNG)

```bsh
map:{
        canvas:{
            style:0,

```

2) light-v10

![mapbox_Ex4_theme1](https://user-images.githubusercontent.com/52831199/92394812-2bf5c100-f15d-11ea-87fa-eac9eda4d71f.PNG)

```bsh
map:{
        canvas:{
            style:1,
```

3) dark-v10

![mapbox_Ex4_theme2](https://user-images.githubusercontent.com/52831199/92394832-34e69280-f15d-11ea-868e-e6b5ce246884.PNG)


```bsh
map:{
        canvas:{
            style:2,
```
4) satellite-v9

![mapbox_Ex6_satelite-v9](https://user-images.githubusercontent.com/52831199/92487154-ddf9bf80-f227-11ea-94d0-859e3236731a.PNG)

```bsh
map:{
        canvas:{
            style:3,
```

5) satellite-streets-v11

![mapbox_Ex6_satelite-streets-v11](https://user-images.githubusercontent.com/52831199/92487133-d89c7500-f227-11ea-8458-7e09a74b018b.PNG)

```bsh
map:{
        canvas:{
            style:4,
```

6) outdoors-v11

![mapbox_Ex6_outdoors-v11](https://user-images.githubusercontent.com/52831199/92487107-d1756700-f227-11ea-8e36-1fb50f1ce8dc.PNG)

```bsh
map:{
        canvas:{
            style:5,
```



#5 Play map locations as a slidesshow

![mapbox_Ex5_play](https://user-images.githubusercontent.com/52831199/92400489-f950c600-f166-11ea-8349-5f05885d5083.gif)

```bsh
import React from 'react';
import { MapBox } from '@stickyboard/mapbox';

const sampleInputs = {
    data:{
        mapboxKey: 'YOUR MAPBOX KEY VALUE HERE!!!',
        title:'Stickyboard-mapbox example',
        description: 'This component is one of stickers in Stickyboard',
    },
    map:{
        canvas:{
            style:2,
            size:{
                width:'400px',
                height:'400px'
            },
            scrollZoom:true
        },
        camera:{
            center: [-73.9499, 40.626],
            zoom: 11,
            pitch:60,
            bearing:-60,
            centerTheMapOnAClick:true
        },
    },
    slideshow:{
        maxZoom:16,
        minZoom:9,
        timeoutSec:3,
        location : [
            {
                'id': '2',
                'title': 'The Bronx',
                'description':
                "This is where hip-hop was born, where the Yankees became a dynasty and where you can find New York City's leading zoo and botanical garden.",
                'camera': {
                    center: [-73.8709, 40.8255],
                    zoom: 12.21,
                    pitch: 50
                }
            },
            {
                'id': '3',
                'title': 'Brooklyn',
                'description':
                "No matter how hip it looks on TV, NYC's most populous borough is best experienced in person. Read on to find out about live music, Prospect Park, Nets basketball and more.",
                'camera': {
                    center: [-73.9499, 40.626],
                    bearing: -8.9,
                    zoom: 11.68
                }
            },
            {
                'id': '1',
                'title': 'Manhattan',
                'description':
                'Even if you think you know Manhattan—its world-class museums, fine dining and unforgettable views—the borough always has something new and exciting in store.',
                'camera': {
                    center: [-74.007, 40.7437],
                    bearing: 25.3,
                    zoom: 11.5
                }
            },
            {
                'id': '4',
                'title': 'Queens',
                'description':
                "Taste food from around the globe, watch Mets baseball and US Open tennis, see cutting-edge art and more in one of the world's most diverse places.",
                'camera': {
                    center: [-73.8432, 40.6923],
                    bearing: 36,
                    zoom: 11.37
                }
            },
            {
                'id': '5',
                'title': 'Staten Island',
                'description':
                'Take a free ferry ride to an island getaway filled with historic architecture, stunning views, gardens and many family-friendly attractions.',
                'camera': {
                    center: [-74.1991, 40.5441],
                    bearing: 28.4,
                    zoom: 11.64
                }
            },
            {
                'title': 'Boroughs of new york',
                'description':
                'New York City is made up of five boroughs: the Bronx, Brooklyn, Manhattan, Queens and Staten Island. Each one has enough attractions—and enough personality—to be a city all its own.',
                'camera': {
                    center: [-74.0315, 40.6989],
                    zoom: 9.68,
                    bearing: 0,
                    pitch: 0
                }
            }
        ]
    }
}

function MapBoxChart(props) {
    
    return (
        <div >

            <MapBox data={sampleInputs.data} map={sampleInputs.map} slideshow={sampleInputs.slideshow}/>
        </div>
    );
}

export default MapBoxChart;

```


#6 Additional source and layers

![mapbox_Ex5_source_and_layer](https://user-images.githubusercontent.com/52831199/92487195-eb16ae80-f227-11ea-975f-3d5c010c5981.PNG)

 1) vector tile source
 
 ```bsh
    data:{
        ...
    },
    map:{
        ...
    },
    slideshow:{
        ...
    },
    source:[{
        name:'mapbox-terrain',
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
    }],
    layer:[{
        'id': 'terrain-data',
        'type': 'line',
        'source': 'mapbox-terrain',
        'source-layer': 'contour',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#ff69b4',
        'line-width': 1
        }
    }
    ]
 ```
 
 
 
 #7 3d building layers
 
 ![mapbox_Ex7_3d-building](https://user-images.githubusercontent.com/52831199/92612903-4d89b080-f2f5-11ea-99d8-92dccea2c997.PNG)
 
 You can simply set 3d building layers with building3d props value as true
 ```bsh
 data:{
       ...
 },
 map:{
     canvas:{
            ...
         building3d:true,
 ```
 
 Here's an simple sample code of above picture.
 
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
            style:0,
            building3d:true,
            size:{
                width:'600px',
                height:'600px'
            },
            scrollZoom:true
        },
        camera:{
            center: [126.939016,  37.519961],
            zoom: 16.5,
            pitch:30,
            bearing:-20,
            centerTheMapOnAClick:true
        },
    },
}

function MapBoxChart(props) {
    
    return (
        <div >

            <MapBox data={sampleInputs.data} map={sampleInputs.map} slideshow={sampleInputs.slideshow}
            source={sampleInputs.source} layer={sampleInputs.layer}/>
        </div>
    );
}

export default MapBoxChart;
 ```
