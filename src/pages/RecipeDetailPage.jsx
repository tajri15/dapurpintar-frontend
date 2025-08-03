import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const API_URL = 'http://127.0.0.1:8000/api/v1';

function RecipeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${API_URL}/recipes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                // Debug: log the API response
                console.log('API Response:', response.data);
                
                if (response.data && response.data.meals) {
                    // Handle TheMealDB API response format
                    setRecipe(response.data.meals[0]);
                } else if (response.data && response.data.strMeal) {
                    // Handle your custom API response format
                    setRecipe(response.data);
                } else {
                    setError('Recipe data format not recognized');
                }
            } catch (err) {
                setError('Failed to load recipe details');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, token]);

    const getIngredientsList = () => {
        const ingredients = [];
        if (!recipe) return ingredients;

        // Handle both TheMealDB and custom API formats
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`] || recipe[`ingredient${i}`];
            const measure = recipe[`strMeasure${i}`] || recipe[`measure${i}`];
            
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${measure || ''} ${ingredient}`.trim());
            }
        }
        return ingredients;
    };

    if (loading) {
        return <div className="loading">Loading recipe details...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="error-container">
                <p>No recipe data available</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="recipe-detail-container">
            <button onClick={() => navigate(-1)} className="back-button">
                &larr; Back to Recipes
            </button>

            <h1>{recipe.strMeal || recipe.name}</h1>
            <img 
                src={recipe.strMealThumb || recipe.image} 
                alt={recipe.strMeal || recipe.name} 
                className="recipe-image"
            />

            <div className="recipe-content">
                <div className="ingredients-section">
                    <h2>Ingredients</h2>
                    <ul>
                        {getIngredientsList().map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div className="instructions-section">
                    <h2>Instructions</h2>
                    <div className="instructions-text">
                        {(recipe.strInstructions || recipe.instructions)
                            ?.split('\r\n')
                            .map((paragraph, i) => (
                                paragraph.trim() && <p key={i}>{paragraph}</p>
                            ))}
                    </div>
                </div>
            </div>

            {recipe.strYoutube && (
                <div className="video-section">
                    <h2>Video Tutorial</h2>
                    <a
                        href={recipe.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="video-link"
                    >
                        Watch on YouTube
                    </a>
                </div>
            )}
        </div>
    );
}

export default RecipeDetailPage;