module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('fonts');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('CNAME');

  eleventyConfig.addTransform('html:minify', (content, outputPath) =>{
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = require('html-minifier').minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });

      return minified;
    }

    return content;
  });

  eleventyConfig.addTransform('css:minify', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.css')) {
      return require('csso').minify(content).css;
    }

    return content;
  });

  eleventyConfig.setLibrary(
    'md', require('markdown-it')({ html: true })
      .use(require('markdown-it-highlightjs/core'), {
        hljs: ((hljs) => {
          hljs.configure({
            classPrefix: ''
          });

          return hljs;
        })(require('highlight.js'))
      })
      .use(require('markdown-it-link-attributes'), {
        matcher(href, config) {
          return href.startsWith("https:");
        },
        attrs: {
          target: '_blank'
        }
      })
  );
}
