module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("avatar.jpg");
  eleventyConfig.addPassthroughCopy("jeeves_chat.jpg");
  eleventyConfig.addPassthroughCopy("notion_database.jpg");

  // Custom date filter: "June 27th"
  eleventyConfig.addFilter("readableDate", function(dateObj) {
    const months = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];
    const d = new Date(dateObj);
    const day = d.getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? "st"
                 : (day % 10 === 2 && day !== 12) ? "nd"
                 : (day % 10 === 3 && day !== 13) ? "rd" : "th";
    return months[d.getMonth()] + " " + day + suffix;
  });

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
    },
    pathPrefix: "/humanediedofanxiety/"
  };
};
