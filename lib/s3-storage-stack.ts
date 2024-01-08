import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface StorageStackProps extends StackProps {
    readonly stage: string;
}

export class S3StorageStack extends Stack {
    public readonly bucketName: CfnOutput;
    public readonly bucketARN: CfnOutput;

    constructor(scope: Construct, id: string, props: StorageStackProps) {
        super(scope, id, props);

        const bucketName = `${props.stage}-CoffeeRunner-Coffee-Type-Images`;

        const bucket = new Bucket(this, bucketName, {});

        this.bucketARN = new CfnOutput(this, 'BucketARN', {
            value: bucket.bucketArn,
        });

        this.bucketName = new CfnOutput(this, 'BucketName', {
            value: bucket.bucketName,
        });
    }
}