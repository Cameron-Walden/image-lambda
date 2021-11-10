const AWS = require('aws-sdk');
let s3 = new AWS.S3();

exports.handler = async (event) => {
    
    // console.log(s3);
    // console.log(JSON.stringify(event));
    let bucketName = event.Records[0].s3.bucket.name;
    let fileName = event.Records[0].s3.object.key;
    let fileSize = event.Records[0].s3.object.size;
    
    console.log(bucketName, fileName, fileSize);
    
    const params = {
        Bucket: bucketName,
        Key: "images.json"
    };
    
    try{
        const manifest = await s3.getObject(params).promise();
        console.log('current manifest', manifest);
        
    }catch(error){
        console.log(error);
        const newManifest = {
            Bucket: bucketName,
            Key: 'images.json',
            Body: JSON.stringify([{name: fileName, size: fileSize, type: 'image'}]),
            ContentType: 'application/json',
        };
        const manifest = await s3.putObject(newManifest).promise();
    }
    
    // console.log('JSON file fetched fromthe bucket', manifest);
    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
