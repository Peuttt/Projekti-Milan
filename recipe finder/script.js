document.addEventListener('DOMContentLoaded', function () {
    const ingredientList = document.getElementById('ingredient-list');
    const ingredientInput = document.getElementById('ingredientInput');
    const SrcBtn = document.querySelector('.SrcBtn');
    let recipesData = []; 

    fetch('recipes.json')
        .then(response => response.json())
        .then(data => {
            recipesData = data; 

            displayIngredients(data);

            SrcBtn.addEventListener('click', function () {
                const inputIngredients = ingredientInput.value.toLowerCase().split(',').map(ingredient => ingredient.trim());
                const filteredData = recipesData.filter(recipe => {
                    return inputIngredients.every(inputIngredient => {
                        return recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(inputIngredient));
                    });
                });
                displayIngredients(filteredData);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));

    function displayIngredients(data) {
        ingredientList.innerHTML = ''; 
        data.forEach(recipe => {
            const ingredientItem = document.createElement('div');
            ingredientItem.classList.add('ingredient-item');
            const randomImageURL = 'https://source.unsplash.com/random/200x200?sig=' + Math.floor(Math.random() * 1000);
            ingredientItem.style.backgroundImage = 'url(' + randomImageURL + ')';
            
            const ingredientText = document.createElement('div');
            ingredientText.classList.add('ingredient-text');
            ingredientText.textContent = recipe.ingredients.join(', ');
            ingredientItem.appendChild(ingredientText);

            ingredientList.appendChild(ingredientItem);
        });
    }
});
