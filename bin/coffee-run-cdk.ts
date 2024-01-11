#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CoffeeRunCdkStack } from '../lib/coffee-run-cdk-stack';
import { S3StorageStack } from '../lib/s3-storage-stack';
import * as config from '../config.json';
import { AppRunnerStack } from '../lib/app-runner-stack';

const app = new cdk.App();
new CoffeeRunCdkStack(app, 'CoffeeRunCdkStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
  env: { region: 'us-east-1' }
});

const storage = new S3StorageStack(app, 'CoffeeRunStorageStack', {
  stage: config.stage,
  env: { region: 'us-east-1' }
});

const appRunner = new AppRunnerStack(app, 'CoffeeRunAppRunnerStack', {
  stage: config.stage,
  env: { region: 'us-east-1' }
})