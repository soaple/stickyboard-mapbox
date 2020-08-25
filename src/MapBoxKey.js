import YOUR_MAPBOX_KEY_HERE from './YourKey'
if (process.env.NODE_ENV === 'production'){
    module.exports = YOUR_MAPBOX_KEY_HERE;
}
else{

    module.exports = '';
}
