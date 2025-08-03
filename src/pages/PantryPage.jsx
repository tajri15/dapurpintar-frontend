import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const API_URL = 'http://127.0.0.1:8000/api/v1';

function PantryPage() {
    const { user, token, logout } = useContext(AuthContext);
    const [pantryItems, setPantryItems] = useState([]);
    const [loadingPantry, setLoadingPantry] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({ name: '', quantity: '', unit: '' });
    const [foundRecipes, setFoundRecipes] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: API_URL,
        headers: { 'Authorization': `Bearer ${token}` }
    });

    useEffect(() => {
        const fetchPantryItems = async () => {
            try {
                const response = await api.get('/pantry-items');
                setPantryItems(response.data);
            } catch (error) {
                console.error("Could not fetch pantry items", error);
                setErrorMessage("Failed to load pantry items. Please try again.");
            } finally {
                setLoadingPantry(false);
            }
        };

        fetchPantryItems();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/pantry-items', formData);
            setPantryItems([...pantryItems, response.data]);
            setFormData({ name: '', quantity: '', unit: '' });
            setErrorMessage('');
        } catch (error) {
            console.error('Error adding item:', error);
            setErrorMessage("Failed to add item. Please check your input.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/pantry-items/${id}`);
            setPantryItems(pantryItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            setErrorMessage('Failed to delete item.');
        }
    };

    const handleFindRecipes = async () => {
        setIsSearching(true);
        setFoundRecipes([]);
        setErrorMessage('');
        try {
            const response = await api.get('/find-recipes');
            setFoundRecipes(response.data.data || []);
        } catch (error) {
            console.error('Error finding recipes:', error);
            setErrorMessage('Failed to find recipes. Make sure your pantry isn\'t empty.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="pantry-container">
            <div className="form-container">
                <h2 className="section-title">Add New Ingredient</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Ingredient Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="e.g. Chicken, Rice, etc."
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            className="form-input"
                            placeholder="Amount"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Unit</label>
                        <input
                            type="text"
                            name="unit"
                            className="form-input"
                            placeholder="e.g. grams, pieces, etc."
                            value={formData.unit}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="form-submit">Add to Pantry</button>
                </form>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="section">
                <h2 className="section-title">My Pantry</h2>
                {loadingPantry ? (
                    <div className="loading-state">
                        <p>Loading your pantry...</p>
                    </div>
                ) : (
                    <div className="pantry-list">
                        {pantryItems.length === 0 ? (
                            <p className="empty-message">Your pantry is empty. Add some ingredients to get started!</p>
                        ) : (
                            pantryItems.map(item => (
                                <div key={item.id} className="pantry-item">
                                    <div className="pantry-item-info">
                                        <span className="pantry-item-name">{item.name}</span>
                                        <span className="pantry-item-quantity">{item.quantity} {item.unit}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="delete-btn"
                                        aria-label={`Delete ${item.name}`}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <div className="section">
                <h2 className="section-title">Discover Recipes</h2>
                <p className="section-subtitle">Find recipes you can make with your current ingredients</p>
                <button
                    onClick={handleFindRecipes}
                    disabled={isSearching || pantryItems.length === 0}
                    className={`find-recipes-btn ${isSearching ? 'searching' : ''}`}
                >
                    {isSearching ? (
                        <>
                            <span className="spinner"></span>
                            Searching...
                        </>
                    ) : (
                        'Find Recipes Now'
                    )}
                </button>

                {foundRecipes.length > 0 && (
                    <div className="recipes-grid">
                        {foundRecipes.map(recipe => (
                            <div
                                key={recipe.idMeal}
                                className="recipe-card"
                                onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                            >
                                <img
                                    src={recipe.strMealThumb}
                                    alt={recipe.strMeal}
                                    className="recipe-card-img"
                                    loading="lazy"
                                />
                                <div className="recipe-card-body">
                                    <h3 className="recipe-card-title">{recipe.strMeal}</h3>
                                    {recipe.matchPercentage && (
                                        <p className="match-percentage">{recipe.matchPercentage}% match</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PantryPage;