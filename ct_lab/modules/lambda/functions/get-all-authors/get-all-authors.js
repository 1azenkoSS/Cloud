const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: "eu-central-1",
  apiVersion: "2012-08-10"
});

exports.handler = (event, context, callback) => {
  const params = {
    TableName: "authors"
  };
  dynamodb.scan(params, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      const courses = data.Items.map(item => {
        return {
          id: item.id.S,
          firstName: item.firstName.S,
          lastName: item.lastName.S,
        };
      });
      callback(null, courses);
    }
  });
}

