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
Basic Authentication is a standard HTTP security procedure that enables a browser to prompt a user to submit a username and password in order to grant access to the browser’s response, typically a web page.

This security strategy is a nice lightweight measure to restrict access to a webpage to only users who have the correct username and password credentials. These credentials are stored in a data source that the server request references in order to authenticate the user.

<!-- endexcerpt -->

Basic Authentication is a standard HTTP security procedure that enables a browser to prompt a user to submit a username and password in order to grant access to the browser’s response, typically a web page.

This security strategy is a nice lightweight measure to restrict access to a webpage to only users who have the correct username and password credentials. These credentials are stored in a data source that the server request references in order to authenticate the user.

The concept of Basic Authentication has been traditionally implemented in the LAMP Stack and is commonly associated with a .htaccess file. That file would have rules in it, and read something like:

    AuthType Basic
    AuthName "Secure Content"
    AuthUserFile /home/myuser/public_html/.htpasswd
    Require valid-user

This .htaccess file would then be stored in the directory that you want to protect.

That’s great for an Apache Server but what if you have no server at all? Serverless web development is an efficient way to deploy a web app but along with benefits comes the paradigm shift of achieving basic authentication that doesn’t require a .htaccess file or, any server directory at all.

This is accomplished by adding a Lambda@Edge function at the viewer request layer of your CloudFront instance. Refer to the below diagram:

![Serverless Basic Auth Diagram](https://s3.amazonaws.com/averygoodweb-app-prod-earthbucket-media/blog/posts/images/serverless-basic-auth-2020-08-13..svg "Serverless Basic Auth Diagram")

### Occupy Distillery Tote

I'm baby listicle excepteur austin, enim proident occaecat occupy. Raw denim tacos fam locavore, truffaut godard neutra banh mi irure direct trade food truck. Small batch banh mi crucifix aute, sartorial ennui tilde banjo pinterest heirloom 8-bit. Plaid woke est sriracha meditation. Mumblecore magna lorem pitchfork, occupy distillery tote bag plaid eiusmod letterpress. Tempor palo santo occupy live-edge flexitarian velit biodiesel, shabby chic do. Drinking vinegar four loko tattooed schlitz shabby chic normcore.