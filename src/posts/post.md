---
tags:
- test
title: How to Create Basic Auth for a Serverless App
date: 2020-08-13T04:00:00Z
slug: basic-auth-serverless-app
author: Avery Smith
coverPhoto: blog/posts/images/Notary-Public-Ink-Stamp-On-Sig-234574582-2020-08-13..jpg
published: true

---
Many people are familiar with the .htaccess way of implementing Basic Authentication but how do you it with serverless?

<!-- endexcerpt -->

Many people are familiar with the .htaccess way of implementing Basic Authentication but how do you it with serverless?

Basic Authentication is a standard HTTP security procedure that enables a browser to prompt a user to submit a username and password in order to grant access to the browser’s response, typically a web page.

Within the AWS world, this is achieved by adding a Lambda@Edge function at the viewer request layer of your CloudFront instance. Refer to the below diagram:

![Serverless Basic Auth Diagram](https://s3.amazonaws.com/averygoodweb-app-prod-earthbucket-media/blog/posts/images/serverless-basic-auth-2020-08-13..svg "Serverless Basic Auth Diagram")

### Occupy Distillery Tote

I'm baby listicle excepteur austin, enim proident occaecat occupy. Raw denim tacos fam locavore, truffaut godard neutra banh mi irure direct trade food truck. Small batch banh mi crucifix aute, sartorial ennui tilde banjo pinterest heirloom 8-bit. Plaid woke est sriracha meditation. Mumblecore magna lorem pitchfork, occupy distillery tote bag plaid eiusmod letterpress. Tempor palo santo occupy live-edge flexitarian velit biodiesel, shabby chic do. Drinking vinegar four loko tattooed schlitz shabby chic normcore.