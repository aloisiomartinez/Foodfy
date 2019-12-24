const fs = require('fs')
const data = require("../data")


exports.index = function(req, res) {
  return res.render("admin/revenues", {items: data.recipes})
}

exports.show = function(req, res) {
  const id = req.params.id

  const recipe = data.recipes.find(function(recipe) {
    if (recipe.id == id) {
      return true;
    }
  });

  if (!recipe) {
    return res.send("Receita não encontrada");
  }

  return res.render("admin/recipe", { item: recipe });
}

exports.edit = function(req, res) {


  const {id} = req.params

  const foundRecipe = data.recipes.find(function(recipe) {
    return id == recipe.id
  })

  if (!foundRecipe) return res.send("Recipe not found!")


  const recipe = {
    ...foundRecipe
  }

  return res.render('admin/edit', {recipe})
}

exports.create = function(req, res) {
  return res.render("admin/create")
}

exports.post = function(req, res) {

  //Constructor. Cria um array de "chaves" 
  const keys = Object.keys(req.body)

  for ( key of keys ) {
    //req.body.key(avatar_url, name, etc)
    if (req.body[key] == "")
      return res.send('Please, fill all fields.')

  }

  let id = 1
  const lastRecipe = data.recipes[data.recipes.length -1]

  if (lastRecipe) {
    id = lastRecipe.id + 1
  }


  data.recipes.push({
    id: Number(id),
    ...req.body
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2),function(err) {
    if (err) return res.send("Write file error")

    return res.redirect(`/admin`)
  })
  
}

exports.put = function(req, res) {
  const { id } = req.body
  let index = 0

  const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
    if (id == recipe.id) {
      index = foundIndex
      return true
    }
  })

  if ( !foundRecipe ) return res.send("Member not Found!")

  const recipe = {
    ...foundRecipe,
    ...req.body,
    id: Number(req.body.id)
  }
 
  data.recipes[index] = recipe


  const emptyPrep = recipe.preparation.indexOf("")
  const emptyIng = recipe.ingredients.indexOf("")
  
  if (emptyPrep != -1) {
    
    data.recipes[index].preparation.splice(emptyPrep, 1) 
  }

  if (emptyIng != -1) {

    data.recipes[index].ingredients.splice(emptyIng, 1)
  }

 
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('File writing error!')

    return res.redirect(`/admin/recipes`)
  })

}

exports.delete = function(req, res) {
  const { id } = req.body

  const filteredRecipes = data.recipes.filter(function(recipe) {
    return recipe.id != id
  })

  data.recipes = filteredRecipes

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('File writing error!')

    return res.redirect(`/admin/recipes`)
  })

}