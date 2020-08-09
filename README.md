# A Very Good Web App - EarthBucket

![EarthBucket Icon](./src/assets/img/icon-earth.svg)

Prerequisites
- [An AWS Account with programmatic permission](https://aws.amazon.com/)
- [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
- A [Gatsby](https://gatsbyjs.com/) Cloud Account

## Project Description

This is a the front-end website for [averygoodweb.app](https://averygoodweb.app).

**EarthBucketStack** is declared in the [averygoodwebapp-infrastructure](https://github.com/averygoodidea/averygoodwebapp-infrastructure) repo.

It is a Gatsby generated site that provides a curated photo stream user experience similar Instagram and a blog user experience similar to Medium, or Wordpress.

The photo data is managed through WaterApi, which is AVeryGoodWebApp's AWS API service.

Each time Gatsby is run, it fetches the photo stream data from WaterApi, and stores it as json at:
`src/data/auth/albumPosts.json`.

EarthBucket is hosted in an AWS S3 Bucket, and cached behind AirCdn, AVeryGoodWebApp's AWS CDN layer.

### Local Development

#### Initialize Repo

In order for local development to happen, Gatsby settings adjusted first. Please follow these steps:

1. Inside this repo, install the project node modules:
`npm install`

**Since this repo uses nvm v13 or higher. If there is any trouble running the repo, simply run the following command:**

`nvm use` and then re-run `npm install`

2. Update the EarthBucket `.env.development` and `.env.production` files with the following credentials:

| variable                     | value                                           | description                                                                                                                                                                                                   |
|------------------------------|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AWS_ACCESS_KEY_ID            | `<awsAccessKeyId>`                              | this value can be found by running the following command `sudo nano ~/.aws/credentials`. You can find it under the aws profile you have been using for this installation guide.                               |
| AWS_SECRET_ACCESS_KEY        | `<awsSecretAccessKey>`                          | this value can be found by running the following command `sudo nano ~/.aws/credentials`. You can find it under the aws profile you have been using for this installation guide.                               |
| AWS_REGION                   | `<awsRegion>`                                   | This value can be found at https://console.aws.amazon.com/console/home in the upper-right hand corner, immediately to the right of your profile name. If in doubt, use us-east-1.                             |
| AWS_EARTHBUCKET_APP_BUCKET   | `<domainNamespace>`-`<environment>`-earthbucket-app   | you can copy and paste the EarthBucket app bucket value from: https://console.aws.amazon.com/cloudformation/home `<domainNamespace>`-prod-stack > Outputs. Get the value from Key awsEarthBucketAppBucket     |
| AWS_EARTHBUCKET_MEDIA_BUCKET | `<domainNamespace>`-`<environment>`-earthbucket-media | you can copy and paste the EarthBucket media bucket value from: https://console.aws.amazon.com/cloudformation/home `<domainNamespace>`-prod-stack > Outputs. Get the value from Key awsEarthBucketMediaBucket |
| GATSBY_EARTHBUCKET_HOSTNAME  | [`<environment>`.]`<domainName>`                | the fully qualified domain name. If this is the production environment, use the project domain name, ie: averygoodweb.app. IF a lower environment, include the sub-domain, ie: dev.averygoodweb.app.          |
| GATSBY_TINYLETTER_USERNAME   | `<tinyLetterUsername>`                          | your username created at tinyletter.com. This enables your web app to collect user emails out of the box.                                                                                                     |
| GATSBY_WATERAPI_KEY          | `<prodAwsWaterApiKey>`                          | the water api key which you can copy and paste from: https://console.aws.amazon.com/cloudformation/home `<domainNamespace>`-prod-stack > Outputs. Copy the "apikey" generated from the url located at awsWaterApiKey           |
| VALINE_LEANCLOUD_APP_ID      | `<valineLeanCloudAppId>`                        | this value can be copied and pasted from https://console.leancloud.app/applist.html#/apps > `<appTitle>` > Settings > App keys. Copy the value from AppID.                                                    |
| VALINE_LEANCLOUD_APP_KEY     | `<valineLeanCloudAppKey>`                       | this value can be copied and pasted from https://console.leancloud.app/applist.html#/apps > `<appTitle>` > Settings > App keys. Copy the value from AppKey.                                                   |

The WaterApi api key restricts requests to all `/api/1/admin/` routes that are performed by EarthBucket. The value can be found at:

https://console.aws.amazon.com/apigateway/home?region=us-east-1#/api-keys/

Under `<domainNamespace>-<environment>-WaterApiKey`

3. Initialize the EarthBucket codebase

`sh ./scripts/init.sh prod <awsProfile>`

4. Run Gatsby in development mode.

`gatsby develop`

### Deployment

#### For Upper Production Environment Deployments

This website is deployed via a pipeline of Github, Gatsby Cloud and AWS.

In order to deploy changes to the production web app, simply merge all github branches to the master branch.

#### For Lower Non-Production Environment Deployments

`sh ./scripts/deploy.sh <environment> <awsProfile>`

There are two types of site updates:
1. Content Updates (generally fast, conducted by an author)
2. App Updates (generally slow, conducted by a developer)

### Content Updates

There are two kinds of content: an Album Post, and a Blog Post.

## Managing an Album Post

To create, edit or delete an album post, the author must access:
<siteUrl>/author/album/.

When an author creates, edits, or deletes a album post, WaterApi notifies Gatsby Cloud via a webhook, that data has changed. Gatsby Cloud then receives the notification and triggers a rebuild of the site. Gatsby is configured to make a new request to WaterApi, and receive the updated data, of which is stores in `src/data/auth/inventoryItems.json` and then continues to _incrementally_ build the site based on the new data.

Once the new build is complete, Gatsby is then configured to deploy the build to AWS S3.

Once the deployment is completed, AirCdn needs to be notified to clear its cache. That is done by pressing the "Deploy Site Changes" button found at <siteUrl>/author/site-settings.

## Managing a Blog Post

To create, edit or delete a blog post, an author must create a markdown file in: `./src/posts`.

These can be managed by creating an account at https://forestry.io.

Then create a github "content" branch and connect the content branch to Forestry.

When you are done with the creation of your blog post, go to github and merge the content branch into the master branch.

...

### App Updates

An app update refers to the presentation and functional layer of the website. It is not necessarily the words and images that are accessed but really all of the look and feel that surrounds the words and images.

App updates are separate from content updates, and require a push to github in order to trigger a _full_ build on Gatsby Cloud. A full build is different than an incremental build, as Gatsby use its cached version of its previous full build. It forgoes that and generates a new full build.

A developer should for the github earthbucket repo, then open a terminal window and conduct the following commands:
```
git clone git@github.com:<mygithubusername>/averygoodwebapp-earthbucket.git
cd averygoodwebapp-earthbucket
nvm use
npm install
gatsby develop
```
Gatsby will spin up a local server, something like "http://localhost:8000". You can access that url in your web browser,

Then in a separate terminal window cd into the averygoodwebapp-earthbucket directory again, and conduct your code changes.

Gatsby will hot-reload your changes into the web browser.

To learn more about how to develop in Gatsby, visit https://gatsbyjs.org/

Once you are satisfied with your changes, turn off the local Gatsby server. To do that, navigate to the server terminal and press the keyboard combination, 'Control+C'.

Then run the following commands:

```
gatsby build
sh ./scripts/deploy.sh <awsProfile>
```

### Tests

Jest Tests can be run by the following command:
```
npm run test
```

Storybook Visual Tests can be run by the following command:
```
npm run storybook
```

Your Storybook Style Guide can be deployed with the following command:
```
sh ./publish.sh <awsProfile>
```