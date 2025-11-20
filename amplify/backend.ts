import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //
    // ========================================================
    // 1️⃣ AUTH LAMBDA (existing)
    // ========================================================
    //
    const authFunction = new lambda.Function(this, 'AuthFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/auth'),
      environment: {
        DB_HOST: process.env.DB_HOST!,
        DB_NAME: process.env.DB_NAME!,
        DB_USER: process.env.DB_USER!,
        DB_PASSWORD: process.env.DB_PASSWORD!,
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });

    //
    // ========================================================
    // 2️⃣ PASSWORD RESET LAMBDAS (new)
    // ========================================================
    //
    const resetRequestFunction = new lambda.Function(this, 'ResetRequestFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'request.handler',
      code: lambda.Code.fromAsset('lambda/password-reset'),
      environment: {
        DB_HOST: process.env.DB_HOST!,
        DB_NAME: process.env.DB_NAME!,
        DB_USER: process.env.DB_USER!,
        DB_PASSWORD: process.env.DB_PASSWORD!,
      },
    });

    const resetConfirmFunction = new lambda.Function(this, 'ResetConfirmFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'confirm.handler',
      code: lambda.Code.fromAsset('lambda/password-reset'),
      environment: {
        DB_HOST: process.env.DB_HOST!,
        DB_NAME: process.env.DB_NAME!,
        DB_USER: process.env.DB_USER!,
        DB_PASSWORD: process.env.DB_PASSWORD!,
      },
    });

    //
    // ========================================================
    // 3️⃣ API GATEWAY (manual routing)
    // ========================================================
    //
    const api = new apigw.RestApi(this, 'AuthApi', {
      restApiName: 'AuthApi',
    });

    //
    // AUTH ROUTES (you can add more later)
    //
    const auth = api.root.addResource("auth");
    auth.addResource("action").addMethod("POST", new apigw.LambdaIntegration(authFunction));

    //
    // RESET PASSWORD ROUTES
    //
    const reset = api.root.addResource("reset");

    reset.addResource("request").addMethod(
      "POST",
      new apigw.LambdaIntegration(resetRequestFunction)
    );

    reset.addResource("confirm").addMethod(
      "POST",
      new apigw.LambdaIntegration(resetConfirmFunction)
    );

    //
    // OUTPUT API URL (optional but helpful)
    //
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
    });
  }
}
