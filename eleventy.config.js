module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("avatar.jpg");
  eleventyConfig.addPassthroughCopy("jeeves_chat.jpg");
  eleventyConfig.addPassthroughCopy("notion_database.jpg");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
