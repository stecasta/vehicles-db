"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'eu-west-1' });
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
exports.handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var documentClient, responseBody, statusCode, _a, vin, maker, brand, model, plate, color, status_1, params, data, err_1, response, responseBodyRead, statusCodeRead, vin, params, data, err_2, responseRead;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                documentClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
                if (!(event.httpMethod == "PUT")) return [3 /*break*/, 5];
                responseBody = "";
                statusCode = 0;
                _a = JSON.parse(event.body), vin = _a.vin, maker = _a.maker, brand = _a.brand, model = _a.model, plate = _a.plate, color = _a.color, status_1 = _a.status;
                params = {
                    TableName: "vehicles",
                    Item: {
                        vin: vin,
                        maker: maker,
                        brand: brand,
                        model: model,
                        plate: plate,
                        color: color,
                        status: status_1
                        // status: {odometer, unit}
                    }
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, documentClient.put(params).promise()];
            case 2:
                data = _b.sent();
                responseBody = JSON.stringify(data);
                statusCode = 201; // Item successfully created  
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                responseBody = "Unable to put user data";
                statusCode = 403;
                return [3 /*break*/, 4];
            case 4:
                response = {
                    statusCode: statusCode,
                    headers: {
                        "myHeader": "Test"
                    },
                    body: responseBody
                };
                return [2 /*return*/, response];
            case 5:
                if (!(event.httpMethod == "GET")) return [3 /*break*/, 10];
                responseBodyRead = "";
                statusCodeRead = 0;
                vin = event.pathParameters.vin;
                params = {
                    TableName: 'vehicles',
                    Key: {
                        vin: vin
                    }
                };
                _b.label = 6;
            case 6:
                _b.trys.push([6, 8, , 9]);
                return [4 /*yield*/, documentClient.get(params).promise()];
            case 7:
                data = _b.sent();
                responseBodyRead = JSON.stringify(data.Item);
                statusCodeRead = 200;
                return [3 /*break*/, 9];
            case 8:
                err_2 = _b.sent();
                responseBodyRead = "Unable to get user data";
                statusCodeRead = 403;
                return [3 /*break*/, 9];
            case 9:
                responseRead = {
                    statusCode: statusCodeRead,
                    headers: {
                        "myHeader": "test"
                    },
                    body: responseBodyRead
                };
                return [2 /*return*/, responseRead];
            case 10: return [2 /*return*/];
        }
    });
}); };
