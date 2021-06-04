A next.js + Typescript boilerplate (blank) theme for the new Sylius API (includes Mailchimp contact form integration + stripe payment gateway integration). This is the first version so there is a lot of room for improvement. Y

## Install and configure the Sylius API

- Install Sylius
- Install the Sylius Extra API Plugin has to be installed in order to use the theme
- If you want to use Stripe, create in your Stripe account a new payment_intent.succeeded hook, calling this URL: 
https://yourSyliusAPIDomainName/api/v2/shop/payments/stripe/notify/success
- Add this env variables into your .env.local file:

```
# your stripe secret key
STRIPE_SECRET_KEY=sk_test_51IWnwaGhkxw8ABpLx60ZYzWcq2ffcxLkDaFPtZULJtBDyjQgOnaTHABSCzzIrbEL34EnJj5eVPRZBDAjDC4mpTaV00KAZYhe3n
# your stripe payment_intent.succeeded webhook secret key
STRIPE_SUCCESS_ENDPOINT_SECRET_KEY=whsec_3jwQgifKzj8TKoOQGwASPdEdPbPvgxvq
# the Next.js front end URL
CLIENT_URL=
# the front end url for the stripe payment success (by default "https://yourNextBoilerPlateThemeDomainName/cart/confirmation")
CLIENT_URL_PAYMENT_SUCCESS=
# the front end url for the stripe payment failure (by default "https://yourNextBoilerPlateThemeDomainName/cart/failed")
CLIENT_URL_PAYMENT_FAILED=
```

## Install and configure the next.js boilerplate theme

- clone this repo
- fill the .env variables into a .env.local file
```
# Your Sylius API URL. Exemple: "https://yourSyliusAPIDomainName/api/v2/"
NEXT_PUBLIC_API_RESOURCE_BASE_URL=
# Your Sylius API base URL (without the /api/v2). Exemple: "https://yourSyliusAPIDomainName")
NEXT_PUBLIC_API_PUBLIC_URL=
# Your Sylius API Hostname (without the protocol). Exemple: "yourSyliusAPIDomainName"
API_HOST_NAME=
# your stripe public key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
# Your Mailchimp Newsletter Form Action URL
MAILCHIMP_URL=
```
- install the node modules
- launch the local dev server:

```
yarn dev
```

- it's done ! You can browse you shop!
