// Load the AWS SDK for Node.js
import * as AWS from 'aws-sdk';
import {VehicleDetails} from './myInterfaces'

// Set the region 
AWS.config.update({region: 'eu-west-1'});

// Create the DynamoDB service object
// const ddb: any = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event: any, context: any) => {
  console.log(event);
  // Define documentclient to use more readable JSON format
  const documentClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});
  if (event.httpMethod == "PUT"){
    // WRITE ITEM
  
    let responseBody: string = "";
    let statusCode: number = 0;
  
    // TODO: fai funzione transform event
    const eventBody = JSON.parse(event.body);
    // const { vin, maker, brand, model, plate, color, status } = JSON.parse(event.body);
  
    // Mapping
    const vehicleDetails: VehicleDetails = {
      vin: event.vin,
      maker: event.maker
    }
    // New item
    var params = {
      TableName: "vehicles",
      Item: {
        vin: vehicleDetails.vin,
        maker: vehicleDetails.maker,
        brand: vehicleDetails.brand,
        model: vehicleDetails.model,
        plate: vehicleDetails.plate,
        color: vehicleDetails.color,
        status: vehicleDetails.status
        // status: {odometer, unit}
      }
    }
  
    // Call DynamoDB to add the item to the table
    try{
      const data = await documentClient.put(params).promise();
      const mydata = documentClient
      responseBody = JSON.stringify(data);
      statusCode = 201;  // Item successfully created  
    }
      catch (err) {
        responseBody = `Unable to put user data`;
        statusCode = 403;
      }
  
      const response: any = {
        statusCode: statusCode,
        headers: {
          "myHeader": "Test"
        },
        body: responseBody
      }
  
      return response;
  }

    if(event.httpMethod == "GET"){
    // READ ITEM
  
    let responseBodyRead: string = "";
    let statusCodeRead: number = 0;
    const { vin } = event.pathParameters;
  
    // Item to be read
    var read_params: any = {
      TableName: 'vehicles',
      Key: {
        vin: vin
      }
    };
  
    // Call DynamoDB to read the item from the table
    try{
      const data = await documentClient.get(read_params).promise();
      responseBodyRead = JSON.stringify(data.Item);
      statusCodeRead = 200;    
    } catch (err){
        responseBodyRead = `Unable to get user data`;
        statusCodeRead = 403;
      }
  
      const responseRead: any = {
        statusCode: statusCodeRead,
        headers: {
          "myHeader": "test"
        },
        body: responseBodyRead
      }
  
      return responseRead;
  }
  }

