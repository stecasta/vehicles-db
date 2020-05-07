import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const VALID_REMOTE_STATUS_ITEM = {
    vin: "123abc321",
    maker: "FCA",
    brand: "Fiat",
    model: "500"
};

export class DocClientStub extends DocumentClient {

    readonly STATE_UNDEFINED_RESPONSE = 'STATE_UNDEFINED_RESPONSE';
    readonly STATE_EMPTY_RESPONSE = 'STATE_EMPTY_RESPONSE';
    readonly STATE_VALID_RESPONSE = 'STATE_VALID_RESPONSE';
    readonly STATE_NULL_RESPONSE = 'STATE_NULL_RESPONSE';
    readonly STATE_CONDITIONAL_CHECK_FAILED = 'STATE_CONDITIONAL_CHECK_FAILED';
    readonly STATE_DEFAULT = 'STATE_DEFAULT';

    private state?: string;

    get(getItemInput: any, callback: any): any {
        [getItemInput, callback];
        const self = this;
        self.state = 'STATE_VALID_RESPONSE'
        console.log(self.state);
        return {
            promise: async function () {
                switch (self.state) {
                    case self.STATE_UNDEFINED_RESPONSE:
                        return { Item: undefined, ConsumedCapacity: 128 };
                    case self.STATE_NULL_RESPONSE:
                        return { Item: null, ConsumedCapacity: 128 };
                    case self.STATE_EMPTY_RESPONSE:
                        return { ConsumedCapacity: 128 };
                    case self.STATE_VALID_RESPONSE:
                        return {
                            Item: VALID_REMOTE_STATUS_ITEM,
                            ConsumedCapacity: 128
                        };
                    default:
                        throw new Error('Unmapped get state');
                }
            }
        }
    }

    put(putItemInput: any, callback: any): any {
        [putItemInput, callback];
        const self = this;
        self.state = 'STATE_VALID_RESPONSE';
        return {
            promise: async function () {
                switch (self.state) {
                    case self.STATE_UNDEFINED_RESPONSE:
                        return undefined;
                    case self.STATE_EMPTY_RESPONSE:
                        return {};
                    case self.STATE_NULL_RESPONSE:
                        return null;
                    case self.STATE_CONDITIONAL_CHECK_FAILED:
                        const error: any = {};
                        error.code = 'ConditionalCheckFailedException';
                        throw error;
                    case self.STATE_VALID_RESPONSE:
                        return {
                            ConsumedCapacity: { TableName: 'vehicles', CapacityUnits: 1 } 
                        };
                    default:
                        throw new Error('Unmapped state');
                }
            }
        }
    }
}
