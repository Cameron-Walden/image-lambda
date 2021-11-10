'use Strict';

const AWS = require('aws-sdk');
let s3 = new AWS.S3();

exports.handler = async (event) => {
    
    // console.log(s3);
    // console.log(JSON.stringify(event));

    
    let imageInfo = event.Records[0].s3.object;
    // let name = event.Records[0].s3.bucket.name;
    let imageArray = [];
    let temp = [];
    
    temp.push(imageInfo);
    
    for(imageInfo.key in temp) {
        imageArray.push(imageInfo);
    }
    
    // imageArray.push(name, size);
    
    const response = {
        statusCode: 200,
        // body: JSON.stringify('Hello from Lambda!'),
        // name: name,
        // size:size 
        body: imageArray,
    };
    return response;
};
