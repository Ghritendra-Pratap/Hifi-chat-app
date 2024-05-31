const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:'freecoders',
    api_key: '762532815968699',
    api_secret: 'tD3J9vWWlcjTN6d0ksNmUioS2o0'
});

module.exports = cloudinary
