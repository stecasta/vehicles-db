// Load the AWS SDK for Node.js
import * as AWS from 'aws-sdk';

// Import external files
import {VehicleDetails} from './myInterfaces'
import { PutItemDDB, GetItemDDB } from './utils'

// Set the region 
AWS.config.update({region: 'eu-west-1'});

exports.handler = async (event: any, context: any) => {
  console.log(event);

  if (event.httpMethod == "PUT"){
    // Write item to table
    const vehicleDetails: VehicleDetails = JSON.parse(event.body);    // Get vehicle information from event body

    const tableName = "vehicles";  // DynamoDB table name
    
    const response = PutItemDDB(tableName, vehicleDetails);  // Add item to the DynamoDB table
  
    return response; 
  }

  if(event.httpMethod == "GET"){
    // Read item from the table
    const key = event.pathParameters;  // Get item key from event path parameter

    const tableName = "vehicles";   // DynamoDB table name

    const response = GetItemDDB(tableName, key);  // Read item from DynamoDB table

    return response;
    }

  return;    
} 

