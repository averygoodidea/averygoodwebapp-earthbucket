#!/bin/sh
ENVIRONMENT="$1"
AWS_PROFILE="$2"
[[ $ENVIRONMENT = 'prod' ]] && ENV_FILE=.env.production || ENV_FILE=.env.development
export $(grep -v '^#' $ENV_FILE | xargs)
DOMAIN_NAME_LENGTH=$(echo "$GATSBY_EARTHBUCKET_HOSTNAME" | awk '{n=split($0, array, ".")} END{print n }')
if [ $DOMAIN_NAME_LENGTH = 3 ]; then
	DOMAIN_NAME=$(echo $GATSBY_EARTHBUCKET_HOSTNAME | awk -F. '{print $2 "." $3}')
else
	DOMAIN_NAME=$(echo $GATSBY_EARTHBUCKET_HOSTNAME | awk -F. '{print $1 "." $2}')
fi
NAMESPACE=$(sed -e "s,\.,-," <<< $DOMAIN_NAME)
aws s3 cp ./scripts/earthbucket-blog-post-seed.png s3://"$AWS_EARTHBUCKET_MEDIA_BUCKET"/blog/posts/images/ --profile $AWS_PROFILE
DISTRIBUTION_ID=$(aws cloudformation list-exports --query "Exports[?Name=='${NAMESPACE}-${ENVIRONMENT}-AirCdnDistributionId'].Value" --output text --profile $AWS_PROFILE)
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths '/*' --profile $AWS_PROFILE
sh ./scripts/publish.sh	$ENVIRONMENT $AWS_PROFILE