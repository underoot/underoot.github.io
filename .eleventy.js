const htmlmin = require('html-minifier');
const csso = require('csso');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('fonts');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('CNAME');

  eleventyConfig.addTransform('html:minify', (content, outputPath) =>{
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
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
      return csso.minify(content).css;
    }

    return content;
  });
}
