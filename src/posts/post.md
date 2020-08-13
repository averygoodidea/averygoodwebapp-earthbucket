---
tags:
- security
title: How to Create Basic Auth for a Serverless App
date: 2020-08-13T04:00:00.000+00:00
slug: basic-auth-serverless-app
author: Avery Smith
coverPhoto: blog/posts/images/33345241326_29b651fa21_b-2020-08-13..jpg
published: true

---
Many people are familiar with the .htaccess way of implementing Basic Authentication but how do you it with serverless?

<!-- endexcerpt -->

Basic Authentication is a standard HTTP security procedure that enables a browser to prompt a user to submit a username and password in order to grant access to the browser’s response, typically a web page.

Within the AWS world, this is achieved by adding a Lambda@Edge function at the viewer request layer of your CloudFront instance. Refer to the below diagram:

![Serverless Basic Auth Diagram](https://s3.amazonaws.com/averygoodweb-app-prod-earthbucket-media/blog/posts/images/serverless-basic-auth-2020-08-13..svg "Serverless Basic Auth Diagram")

## Lambda@Edge

Lambda@Edge is an AWS Lambda function that is associated with CloudFront and pushed out to "edge" locations throughout the world. The cool thing about Lambda@Edge is that it enables you to manipulate HTTP requests and responses as they're in transit.

This Lambda can be sandwiched in between [four different points of transit](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html):

* Viewer Request (Client to CloudFront)
* Origin Request (CloudFront to Origin)
* Origin Response (Origin to CloudFront)
* Viewer Response (CloudFront to Client)

Since we need to restrict requests on their way _into_ our system, we should place a Lambda@Edge at the _Viewer Request_ transition point.

Example CloudFormation YAML Code:

    LambdaFunctionAssociations:
    	- EventType: viewer-request
    	  LambdaFunctionARN: !Ref EarthBucketBasicAuthLambdaEdgeVersion

[Full code example located here.](https://github.com/averygoodidea/averygoodwebapp-infrastructure/blob/d81ef47fb6a7c02115caecfb3a81a1f8c2e5cc04/cloudformation/aircdn.yaml#L41)

Now that we have identified where and how the Lambda gets positioned into the request path but we need to consider what goes in it to create a Basic Authentication.

## Basic Auth Logic

The Basic Authentication Logic needs to follow these steps:

1. observe the **request** object
2. if the host value is the top level domain
   1. return **request** object
3. else if the host value is not the top level domain
   1. add the basic authentication header to a **response** object
   2. if request contains authorization header
      1. if DynamoDB Table contains authorization header values
         1. return **request** object
      2. else if DynamoDB Table doesn't contain authorization header values
         1. return **response** object
   3. if request doesn't contain authorization header
      1. return **response** object

```
    exports.handler = (event, context, callback) => {
      // basic auth script, for more information, visit - https://medium.com/hackernoon/serverless-password-protecting-a-static-website-in-an-aws-s3-bucket-bfaaa01b8666
      const { request } = event.Records[0].cf
      const host = request.headers.host[0].value
      const hostPieces = host.split('.')
      const environment = (hostPieces.length === 2) ? 'prod' : hostPieces[0]
      if (environment === 'prod') {
        callback(null, request)
      } else {
        // Get request headers
        const { headers } = request
        // Configure authentication
        // const authUser = '<authUser>'
        // const authPass = '<authPass>'
        // const authString = `Basic ${authUser}:${authPass}`
        // const authStrings = [
        //   `Basic ${authUser}:${authPass}` // share this authentication with others
        // ]
        const AWS = require('aws-sdk')
        AWS.config.update({region: 'us-east-1'})
        const getAuthUsers = () => new Promise( async (resolve, reject) => {
          var params = {
              KeyConditionExpression: 'partitionKey = :partitionKey',
              ExpressionAttributeValues: {
                  ':partitionKey': 'published'
              },
              TableName: `averygoodweb-app-${environment}-EarthBucketBasicAuthTable`
          }
          try {
            const dynamo = new AWS.DynamoDB.DocumentClient()
            const data = await dynamo.query(params).promise()
            const authStrings = data.Items.map( ({ authUser, authPass }) => `Basic ${authUser}:${Buffer.from(authPass, 'base64').toString('ascii')}`)
            resolve(authStrings)
          } catch (err) {
            reject(err)
          }
        })
        let submitted
        const body = 'Unauthorized access.'
        const response = {
            status: '401',
            statusDescription: 'Unauthorized',
            body: body,
            headers: {
                'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
            }
        }
        if (headers.authorization) {
          submitted = `Basic ${Buffer.from(headers.authorization[0].value.split('Basic ')[1], 'base64').toString('ascii')}`
          getAuthUsers().then( authStrings => {
            if (authStrings.includes(submitted)) {
              callback(null, request)
            } else {
              callback(null, response)
            }
          }).catch( err => {
            callback(null, response)
          })
        } else {
          callback(null, response)
        }
      }
    }
```

[You can view the full code example here](https://github.com/averygoodidea/averygoodwebapp-infrastructure/blob/master/earthbucket-lambda-edge/index.js).

## Basic Authentication Table

In order to create a username and password combination, follow these steps:

1. Navigate to (https://console.aws.amazon.com/dynamodb/home?region=us-east-1#tables:)\[https://console.aws.amazon.com/dynamodb/home?region=us-east-1#tables:\]
2. Click '`<environment>-EarthBucketBasicAuthTable`' > 'Items'
3. Click, 'Create Item', then add the following values, replacing `<authUser>` and `<authPass>` with their corresponding base64 values.

| name | value | description |
| --- | --- | --- |
| partitionKey | published | a required string for each record in this table |
| authUser | <authUser> | enter a username value. Be sure to then store this string in a safe place, like lastpass.com. |
| authPass | <authPass> | Generate an authPass string value from Random.org Then Base64 this string at https://www.base64encode.net/. Be sure to then store this string in a safe place, like lastpass.com. |

In order to add the `<authPass>`, you should:
4\. Click the plus button to the left of "authUser".
5\. In the drop-down box, Click 'Append' > 'String'
6\. In the "field" input, "authPass"
7\. In the "value" input, enter your random password string.
8\. Click, 'Save'.
9\. Now, navigate to `<environment>`.`<domainName>` and enter the `<authUser>` and `<authPass>`. You should now be able to sign into the lower environment.

To add, update and/or delete auth users at a later date, just edit the '`<environment>-EarthBucketBasicAuthTable`', accordingly.

To recap, the aim of this blog post has been to demonstrate how you can achieve Basic Authentication in an AWS Serverless environment. I hope that you have found this helpful.