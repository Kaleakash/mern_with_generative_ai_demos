import React, { useState } from 'react';
import './App.css';
import sampleRecipes from './sampleData';

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', image: '' });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleAddRecipe = () => {
    setRecipes([...recipes, newRecipe]);
    setNewRecipe({ name: '', ingredients: '', image: '' });
  };

  const handleCardClick = (recipe) => {
    setSelectedRecipe(selectedRecipe === recipe ? null : recipe);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe App</h1>
      </header>
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <section className="recipe-grid">
          {filteredRecipes.map((recipe, index) => (
            <div 
              key={index} 
              className={`recipe-card ${selectedRecipe === recipe ? 'expanded' : ''}`}
              onClick={() => handleCardClick(recipe)}
            >
              <div className="recipe-card-content">
                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                <h3>{recipe.name}</h3>
                {selectedRecipe === recipe && (
                  <div className="recipe-details">
                    <p><strong>Ingredients:</strong></p>
                    <p>{recipe.ingredients}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
        <section className="add-recipe-form">
          <h2>Add a New Recipe</h2>
          <input
            type="text"
            name="name"
            placeholder="Recipe Name"
            value={newRecipe.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients"
            value={newRecipe.ingredients}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newRecipe.image}
            onChange={handleInputChange}
          />
          <button onClick={handleAddRecipe}>Add Recipe</button>
        </section>
      </main>
    </div>
  );
}

export default App;
