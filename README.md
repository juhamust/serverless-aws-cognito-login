# serverless-aws-cognito-login

> Simple example projects with instructions how to create serverless login using AWS Cognito.

These notes and snippets were created after spending too much time figuring out how to setup serverless authentication using AWS Cognito and Facebook login. Hope you find it useful!

### Step: Facebook App

1. Navigate to Facebook: https://developers.facebook.com/
2. Create new app in My Apps
3. Add Facebook Login in Products
4. Collect Facebook app id and secret (needed later)
5. Use specificed domain name in Valid OAuth redirect:
  `https://servicex.auth.eu1.central1.1.amazoncognito.com/` (the part "servicex" you can name yourself, but it needs to match with the name used in AWS Congnito)

### Step: AWS Cognito

1. Login to AWS and Cognito service
2. Create user pool in Cognito
3. Collect Pool Id (needed later)
4. Define domain in Open App integration > Domain name, say: servicex
5. Navigate back to AWS Cognito
6. Enable Facebook in Facebook in Federation > Identity providers
7. Create client in App clients (no secret needed)
8. Open App client settings
9. Collect app id (needed later)
10. Enable identity providers
11. Define callback & sign out urls. Example: https://localhost:3000/
12. Select Allowed OAuth Flows: Implicit grant
13. Select Allowed Oauth Scopes: email, openid
14. Create new identity pool in Cognito, say: servicex
15. Open user pool and Edit identity pool
16. Collect the identity pool id
17. Create role for unauthenticated and authenticated (see policy examples)
18. Select Authentication providers and set user Pool id and app client id

### Step: Frontend App

19. Write app.js (see attached example) and host it in https://localhost:3000/
