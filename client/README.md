# client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Architecture

-src/App.vue contains top level component containing simply a <router-view> tag. and hooks into our main html page.
src/main.js starts the server by importing our vue-router and vue-app and mounting it into public/index.html.
-src/router.js contains all of the routes to our views.