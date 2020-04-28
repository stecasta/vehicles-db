import * as AWS from 'aws-sdk';
import {VehicleDetails, Response, ReadParams, WriteParams} from './myInterfaces'

export function TransformEvent(event: any){

    const eventBody: VehicleDetails = JSON.parse(event.body);

    // Mapping
    const vehicleDetails: VehicleDetails = {
        vin: eventBody.vin,
        maker: eventBody.maker,
        brand: eventBody.brand,
        model: eventBody.model,
        plate: eventBody.plate,
        color: eventBody.color,
        status: eventBody.status
        // status: {odometer, unit}
        }

    return vehicleDetails;
}

export const PutItemDDB = async (tableName: string, item: VehicleDetails) => {

    // Define DynamoDB object as a documentclient to use more readable JSON format
    const documentClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

    let responseBody: string = "";
    let statusCode: number = 0;

    const params: WriteParams = {
        TableName: tableName,  // DynamoDB table name
        Item: item    
      }

    // Call DynamoDB to add the item to the table
    try{
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;  // Item successfully created  
        }
        catch (err) {
            responseBody = `Unable to put user data`;
            statusCode = 403;
        }
    
    const response: Response = {
    statusCode: statusCode,
    headers: {
        "myHeader": "Test"
    },
    body: responseBody
    }
    return response;
}

export const GetItemDDB = async (tableName: string, key: { vin: string }) => {
    
    // Define DynamoDB object as a documentclient to use more readable JSON format
    const documentClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});    

    let responseBody: string = "";
    let statusCode: number = 0;

    // Item to be read
    var read_params: ReadParams = {
        TableName: tableName,
        Key: key
      }

    // Call DynamoDB to read the item from the table
    try{
        const data = await documentClient.get(read_params).promise();
        responseBody = JSON.stringify(data.Item);
        statusCode = 200;    
      } catch (err){
          responseBody = `Unable to get user data`;
          statusCode = 403;
        }
  
        const response: Response = {
          statusCode: statusCode,
          headers: {
            "myHeader": "test"
          },
          body: responseBody
        }

    return response
}