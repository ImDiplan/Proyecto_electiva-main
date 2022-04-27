const awsIot = require("aws-iot-device-sdk");

const device  =  awsIot.device({
  keyPath: './awsCerts/42afe4804820145dc2fbeea8d219470d61103cb67405a7bc53c1dd6466dd9093-private.pem.key',
  certPath: './awsCerts/42afe4804820145dc2fbeea8d219470d61103cb67405a7bc53c1dd6466dd9093-certificate.pem.crt',
  caPath: './awsCerts/AmazonRootCA1.pem',
  host: 'a1p4f3krv5l5ew-ats.iot.us-east-1.amazonaws.com',
  clientId: 'Proyecto_Final',
  region: 'us-east-1',
});



module.exports = { device };
