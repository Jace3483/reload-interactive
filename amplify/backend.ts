import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const authFunction = new lambda.Function(this, 'AuthFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/auth'), // your Lambda code folder
      environment: {
        DB_HOST: process.env.DB_HOST!,
        DB_NAME: process.env.DB_NAME!,
        DB_USER: process.env.DB_USER!,
        DB_PASSWORD: process.env.DB_PASSWORD!,
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });

    new apigw.LambdaRestApi(this, 'AuthApi', {
      handler: authFunction,
      proxy: false,
      restApiName: 'AuthApi',
    });
  }
}
