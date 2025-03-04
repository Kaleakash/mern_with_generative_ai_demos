import { useState } from 'react'
import { recipesData } from './data/recipes'
import './App.css'

function App() {
  const [recipes, setRecipes] = useState(recipesData)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe)
  }

  const handleClose = () => {
    setSelectedRecipe(null)
  }

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    
    if (term === '') {
      setRecipes(recipesData)
    } else {
      const filteredRecipes = recipesData.filter(recipe => 
        recipe.title.toLowerCase().includes(term) ||
        recipe.category.toLowerCase().includes(term) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(term)
        )
      )
      setRecipes(filteredRecipes)
    }
  }

  return (
    <div className="app">
      <h1>My Recipe Book</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes by name, category or ingredients..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="recipes-container">
        {recipes.map(recipe => (
          <div 
            key={recipe.id} 
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe)}
          >
            <div className="recipe-image">
              <img src={recipe.image} alt={recipe.title} />
            </div>
            <div className="recipe-card-content">
              <h2>{recipe.title}</h2>
              <div className="recipe-meta">
                <span>{recipe.category}</span>
                <span>⏰ {recipe.prepTime}</span>
                <span>👥 {recipe.servings} servings</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="recipe-modal-overlay" onClick={handleClose}>
          <div className="recipe-modal" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>&times;</button>
            <div className="recipe-detail">
              <div className="recipe-detail-image">
                <img src={selectedRecipe.image} alt={selectedRecipe.title} />
              </div>
              <h2>{selectedRecipe.title}</h2>
              <div className="recipe-meta">
                <span>Category: {selectedRecipe.category}</span>
                <span>Prep: {selectedRecipe.prepTime}</span>
                <span>Cook: {selectedRecipe.cookTime}</span>
                <span>Servings: {selectedRecipe.servings}</span>
              </div>
              <div className="recipe-content">
                <div className="ingredients">
                  <h3>Ingredients</h3>
                  <ul>
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="instructions">
                  <h3>Instructions</h3>
                  <ol>
                    {selectedRecipe.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
