## Intro

This is a simple and small javascript MVC framework for building interfaces.

## Installation

```
npm install --save tursa-js
```

This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like [Webpack](https://webpack.js.org/) or [Browserify](http://browserify.org/) to consume [CommonJS modules](http://webpack.github.io/docs/commonjs.html).

If you don’t yet use [npm](http://npmjs.com/) or a modern module bundler, and would rather prefer a single-file [UMD](https://github.com/umdjs/umd) build that makes  tursa.js` available as a global object, you can grab a pre-built version from [cdnjs](https://cdnjs.com/libraries tursa-js). We *don’t* recommend this approach for any serious application, as most of the library complementary to tursa are only available on [npm](http://npmjs.com/).

## Documentation

We're currently expanding and rewriting our docs content - check back soon for more updates!

## How Does It Work?

Home file:
```
<div>
    {{message}}
</div>
```
Index file:
```
<div o-view>
    // rendered view
</div>

<script>
 Tursa.AddRoute(controller, route, template);

    var route = "home";
    var template = "home.html";

    function controller(model){
        model.message = "Hello World!";
    }
</script>
```
We do a deep dive on how Tursa works in [this readthesource episode](https://www.youtube.com/watch?v=).  
Enjoy!

## License

MIT
