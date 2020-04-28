export interface VehicleDetails{
    vin: string,
    maker: string,
    brand: string,
    model: string,
    plate: string | number,
    color: string, 
    status: any,
}

export interface Response{
    statusCode: number,
    headers: { "myHeader": string},
    body: string
}

export interface ReadParams{
    TableName: string,
    Key: {
        vin: string
    }
}

export interface WriteParams{
    TableName: string,
    Item: VehicleDetails
}