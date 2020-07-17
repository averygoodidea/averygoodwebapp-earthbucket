#!/bin/sh
ENVIRONMENT="$1"
AWS_PROFILE="$2"
if [ $ENVIRONMENT = 'prod' ]; then
    echo "Environment $ENVIRONMENT is deployed through merging to the github master branch."
    echo "This script is intended for non-production environments."
    echo "Please use a different environment."
    exit 1
else
	export $(grep -v '^#' .env.development | xargs)
	aws s3 sync ./public s3://"$AWS_EARTHBUCKET_APP_BUCKET" --delete --exclude '*.DS_Store' --profile $AWS_PROFILE
fi