# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Question I have while Building the Remix Project.

- How to make a Action Request without using redirect.

1.  the request is having two setCookies one with correct value and other with empty value. cant determine how that happens.
2.  The Ui is not getting updated with the latest state or the loader are not picking the latest values. keeping the ui updated to the preivous values.

- Didnt understand how can i pass the parameter of input in the submit hook. Instead using the default api call to action . and taking the data from there.
