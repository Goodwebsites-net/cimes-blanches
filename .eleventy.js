module.exports = function (eleventyConfig) {
  // Copier tels quels les assets statiques vers le site final
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // ── Collections ───────────────────────────────────────────────
  // Chiots : tries par ordre (champ "ordre" croissant)
  eleventyConfig.addCollection("chiots", function (api) {
    return api.getFilteredByGlob("src/chiots/*.md").sort((a, b) => {
      return (a.data.ordre || 99) - (b.data.ordre || 99);
    });
  });

  // Galerie : triee par ordre
  eleventyConfig.addCollection("galerie", function (api) {
    return api.getFilteredByGlob("src/galerie/*.md").sort((a, b) => {
      return (a.data.ordre || 99) - (b.data.ordre || 99);
    });
  });

  // Temoignages : tries par ordre
  eleventyConfig.addCollection("temoignages", function (api) {
    return api.getFilteredByGlob("src/temoignages/*.md").sort((a, b) => {
      return (a.data.ordre || 99) - (b.data.ordre || 99);
    });
  });

  // ── Filtres utilitaires ───────────────────────────────────────
  // Repete une chaine (pour les etoiles des temoignages)
  eleventyConfig.addFilter("stars", function (n) {
    const count = Math.max(0, Math.min(5, parseInt(n) || 5));
    return "★".repeat(count) + "☆".repeat(5 - count);
  });

  // Prix formate suisse : 2900 -> 2'900
  eleventyConfig.addFilter("prixCH", function (n) {
    if (!n) return "";
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  });

  // Decoupe une chaine multiligne en tableau de lignes non vides
  eleventyConfig.addFilter("lignes", function (str) {
    if (!str) return [];
    return String(str)
      .split("\n")
      .map(s => s.trim())
      .filter(s => s.length > 0);
  });

  // Limite un tableau aux N premiers elements
  eleventyConfig.addFilter("limite", function (arr, n) {
    if (!Array.isArray(arr)) return arr;
    return arr.slice(0, n);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
