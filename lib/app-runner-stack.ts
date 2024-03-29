import { Stack, StackProps } from 'aws-cdk-lib';
import * as apprunner from '@aws-cdk/aws-apprunner-alpha';
import { Construct } from 'constructs';

interface AppRunnerStackProps extends StackProps {
    readonly stage: string;
}

export class AppRunnerStack extends Stack {
    constructor(scope: Construct, id: string, props: AppRunnerStackProps) {
        super(scope, id, props);

        new apprunner.Service(this, 'CoffeeRunService', {
            serviceName: `${props.stage}-CoffeeRun-AppRunner-Service`,

            source: apprunner.Source.fromGitHub({
                repositoryUrl: 'https://github.com/karu-lk/coffee-run',
                branch: 'main',
                configurationSource: apprunner.ConfigurationSourceType.REPOSITORY,
                connection: apprunner.GitHubConnection.fromConnectionArn('arn:aws:apprunner:us-east-1:822803399835:connection/CoffeeRunGitHubConnection/3d3b3a57a5a5408582fb89de3f8e5684'),
            })
        })
    }
}
