ENVIRONMENT=${1:-dev}
AWS_PROFILE=$2
[[ $ENVIRONMENT = 'prod' ]] && ENV_FILE=.env.production || ENV_FILE=.env.development
export $(grep -v '^#' $ENV_FILE | xargs) >> /dev/null
DOMAIN_NAME=$GATSBY_EARTHBUCKET_HOSTNAME
NAMESPACE=$(sed -e "s,\.,-," <<< $DOMAIN_NAME)
npm run build-storybook
aws s3 sync ./storybook-static s3://$AWS_EARTHBUCKET_DOCS_BUCKET/ui/1/docs --delete --exclude '*.DS_Store' --profile $AWS_PROFILE
CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudformation list-exports --query "Exports[?Name=='${NAMESPACE}-${ENVIRONMENT}-AirCdnDistributionId'].Value" --output text --profile $AWS_PROFILE)
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths '/*' --profile $AWS_PROFILE
[[ $ENVIRONMENT != prod ]] && SUBDOMAIN="$ENVIRONMENT". || SUBDOMAIN=""
echo "------------------"
echo "${DOMAIN_NAME} ui docs published! You can view them here:"
echo "https://${DOMAIN_NAME}/ui/1/docs/"
echo "------------------"