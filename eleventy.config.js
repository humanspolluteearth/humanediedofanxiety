module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("avatar.jpg");
  eleventyConfig.addPassthroughCopy("jeeves_chat.jpg");
  eleventyConfig.addPassthroughCopy("notion_database.jpg");

  // Collection to group posts by year
  eleventyConfig.addCollection("postsByYear", function(collectionApi) {
    const posts = collectionApi.getFilteredByTag("posts").reverse();
    const years = {};
    posts.forEach(post => {
      const year = post.date.getFullYear();
      if (!years[year]) {
        years[year] = [];
      }
      years[year].push(post);
    });
    
    // Convert to an array of objects sorted by year descending
    return Object.keys(years).sort((a, b) => b - a).map(year => {
      return {
        year: year,
        posts: years[year]
      };
    });
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
