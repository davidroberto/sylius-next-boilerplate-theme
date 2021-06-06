A next.js + Typescript boilerplate (blank) theme for the new Sylius API (includes Mailchimp contact form integration + stripe payment gateway integration). 

This is the first version so there is a lot of room for improvements, bugfixes etc!

You can see a real world implemententation of this theme here: https://www.cloralys-bijoux.fr/

## Install and configure the Sylius API

- Install Sylius (https://docs.sylius.com/en/1.9/book/installation/installation.html) 
- Install the Sylius Extra API Plugin: https://github.com/davidroberto/SyliusExtraApiPlugin
- Create a davidroberto_sylius_extra_plugin.yaml file in your config/packages file and import the plugin config file in it:

```
imports:
    - { resource: "@DavidRobertoSyliusExtraApiPlugin/Resources/app/config/config.yml" }
```

- If you want to use Stripe, create in your Stripe account a new "payment_intent.succeeded hook", calling this URL (replace the domain name with yours): 
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

- Configure the nelmio cors bundle to match your next js frontend url.
- In your admin, in the "channel" section, set this values:
-- "Ignore shipping selection step where only one shipping method exists": TRUE
-- "Ignore payment selection step where only one payment method exists": TRUE
-- "The account verification is mandatory": FALSE
- In your admin, foreach product, set the "variant selection method" to "Variant choice"

- The plugin has a dependency on the Nelmio Cors Bundle. So you need to it to match your next js frontend url (https://github.com/nelmio/NelmioCorsBundle)

Important:
- The theme don't work well yet with taxons slug containing slashes, so remove them if you want to test the theme.
- Depending on yout nelmio cors configuration, the theme might not be able to perform the fetch request if you use https for your local sylius api url. You can fix it using http (only for localhost).
- This theme was created with only one payment method and shipping method. So if you want to test theme theme, keep only one payment method and one shipping method. You you have multiple ones, you have to implement the select logic by your own.


## Install and configure the next.js boilerplate theme

- Clone this repo
- Fill the .env variables into a .env.local file
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
- Tnstall the dependencies: 
```
yarn install
```
- Change the default locale (if needed) in lib/config/locales.ts
- Launch the local dev server:

```
yarn dev
```

- it's done ! You can browse you shop!
