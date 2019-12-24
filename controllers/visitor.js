const data = require("../data");

//Page index
exports.index = function(req, res) {
  return res.render("visitors/index", { items: data.recipes });
};

//Page About
exports.about = function(req, res) {
  return res.render("visitors/about");
};

//Page Revenues
exports.revenues = function(req, res) {
  return res.render("visitors/revenues", { items: data.recipes });
};

//Page Recipe
exports.recipe = function(req, res) {
  const id = req.query.id;

  const recipe = data.recipes.find(function(recipe) {
    if (recipe.id == id) {
      return true;
    }
  });

  if (!recipe) {
    return res.send("Receita não encontrada");
  }

  return res.render("visitors/recipe", { item: recipe });
};
