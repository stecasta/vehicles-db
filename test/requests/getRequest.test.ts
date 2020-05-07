// Test tools
import 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
chai.use(chaiAsPromised);
const expect = chai.expect;
import * as AWS from 'aws-sdk';

// Import external files\
import { VehicleDetails } from '../../src/myInterfaces'
import {GetItemDDB, PutItemDDB } from '../../src/utils'
import { DocClientStub } from '../stubs'


describe('Get Item - Happy path', () => {

    const event = {
        'pathParameters': {
            'vin': '123abc321'
        }
    }
    const key = event.pathParameters;  // Get item key from event path parameter
    const tableName = "vehicles";   // DynamoDB table name

    const item = {
        vin: "123abc321",
        maker: "FCA",
        brand: "Fiat",
        model: "500"
    };

    const correct_response = {
        statusCode: 200,
        headers: {
        "myHeader": "test"
        },
        body: JSON.stringify(item)
    }   

    const docClient = new DocClientStub();

    // Before each 
    beforeEach(() => sinon.stub(AWS.DynamoDB, 'DocumentClient').returns(docClient))
    // After each 
    afterEach(() => sinon.restore());

    it('should return the item from the DB when the key matches the element of the table', async () => {        
        await expect(GetItemDDB(tableName, key)).to.eventually.be.deep.eq(correct_response);
    });
    
});

describe('Get Item - Errors', () => {

    const event = {
        'pathParameters': {
            'vin': '123abc321'
        }
    }
    const key = event.pathParameters;  // Get item key from event path parameter

    const documentClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});    

    const tableName = "vehicles"

    var read_params = {
        TableName: 'vehicles',
        Key: { vin: '123abc321' }
    }

    const expected_answer = {
        statusCode: 403,
        headers: {
            "myHeader": "test"
        },
        body: `Unable to get user data`
    }

    //Before each 
    beforeEach(() => sinon.stub(AWS.DynamoDB, 'DocumentClient').returns(documentClient))
    // After each 
    afterEach(() => sinon.restore());
    
    it('should return an error when the given key is not present in the table', async () => {
        sinon.stub(documentClient, 'get').throws(Error);
        await expect(GetItemDDB(tableName, key)).to.be.eventually.deep.eq(expected_answer);
    });
    
});