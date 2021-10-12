const {DynamoDB} = require('aws-sdk');

const db = new DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

module.exports.create = async event => {
    const newBook = {
        name: event.body.name,
        age: event.body.pages,
        author: event.body.author,
    };

    await db.put({
        TableName,
        Item: newBook
    }).promise();

    return {statusCode: 200, body: JSON.stringify(newBook)}
}

module.exports.list = async event => {
    const books = await db.scan({
      TableName,
    }).promise();
  
    return { statusCode: 200, body: JSON.stringify(books) };
  };
  
  module.exports.delete = async event => {  
    await db.delete({
      TableName,
      Key: {
        name: event.pathParameters.name
      }
    }).promise();
  
    return { statusCode: 200 };
  };
    
