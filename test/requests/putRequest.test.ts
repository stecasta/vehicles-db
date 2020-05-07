// Test tools
import 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
chai.use(chaiAsPromised);
const expect = chai.expect;
import * as AWS from 'aws-sdk';
import { DocumentClient } from "aws-sdk/clients/dynamodb";


// Import external files\
import { VehicleDetails } from '../../src/myInterfaces'
import {GetItemDDB, PutItemDDB } from '../../src/utils'
import { DocClientStub } from '../stubs'

describe('Put Item - Happy path', () => {

    const event = {
    'pathParameters': {
        'vin': ''}}

    const tableName = "vehicles"

    const docClient = new DocClientStub();
    
    const item: VehicleDetails = {
        vin: 'abc',
        maker: 'FCA',
        brand: 'Fiat',
        model: "500",
        plate: 'ABC123ABC',
        color: 'black', 
        status: 1
    }
    const response = {
        ConsumedCapacity: {TableName: 'vehicles', CapacityUnits: 1}
    }
    const expected_answer = {
        statusCode: 201,
        headers: {
            "myHeader": "test"
        },
        body: JSON.stringify(response)
    }
    //Before each 
    beforeEach(() => sinon.stub(AWS.DynamoDB, 'DocumentClient').returns(docClient))
    // After each 
    afterEach(() => sinon.restore());
    
    it('should return the object added to the table', async () => {    
        await expect(PutItemDDB(tableName, item)).to.be.eventually.deep.eq(expected_answer);
    });
  
  });
  

describe('Put Item - Errors', () => {

    const documentClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});    

    const tableName = "unknown name"

    const item: VehicleDetails = {
        vin: 'abc',
        maker: 'FCA',
        brand: 'Fiat',
        model: "500",
        plate: 'ABC123ABC',
        color: 'black', 
        status: 1
    }

    const expected_answer = {
        statusCode: 403,
        headers: {
            "myHeader": "test"
        },
        body: `Unable to put user data`
    }

    //Before each 
    beforeEach(() => sinon.stub(AWS.DynamoDB, 'DocumentClient').returns(documentClient))
    // After each 
    afterEach(() => sinon.restore());

    it('should return an error when the table name is wrong', async () => {
        sinon.stub(documentClient, 'put').throws(Error);
        await expect(PutItemDDB(tableName, item)).to.be.eventually.deep.eq(expected_answer);
    });

});