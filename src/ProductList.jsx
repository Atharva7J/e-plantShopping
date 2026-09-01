import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://via.placeholder.com/150", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://via.placeholder.com/150", description: "Filters toxins from air.", cost: "$12" },
        { name: "Peace Lily", image: "https://via.placeholder.com/150", description: "Improves indoor humidity.", cost: "$18" },
        { name: "Boston Fern", image: "https://via.placeholder.com/150", description: "Removes harmful air pollutants.", cost: "$14" },
        { name: "Rubber Plant", image: "https://via.placeholder.com/150", description: "Large leaves capture airborne particles.", cost: "$20" },
        { name: "Aloe Vera", image: "https://via.placeholder.com/150", description: "Cleans air and heals burns.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://via.placeholder.com/150", description: "Calming aroma.", cost: "$16" },
        { name: "Jasmine", image: "https://via.placeholder.com/150", description: "Sweet, fragrant blooms.", cost: "$22" },
        { name: "Rosemary", image: "https://via.placeholder.com/150", description: "Fresh culinary fragrance.", cost: "$12" },
        { name: "Mint", image: "https://via.placeholder.com/150", description: "Refreshing scent.", cost: "$8" },
        { name: "Lemon Balm", image: "https://via.placeholder.com/150", description: "Citrusy relaxing aroma.", cost: "$11" },
        { name: "Eucalyptus", image: "https://via.placeholder.com/150", description: "Clean invigorating scent.", cost: "$25" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://via.placeholder.com/150", description: "Thrives on low light and neglect.", cost: "$19" },
        { name: "Pothos", image: "https://via.placeholder.com/150", description: "Tolerates irregular watering.", cost: "$10" },
        { name: "Cast Iron Plant", image: "https://via.placeholder.com/150", description: "Hardy and durable.", cost: "$24" },
        { name: "Jade Plant", image: "https://via.placeholder.com/150", description: "Resilient succulent.", cost: "$15" },
        { name: "Succulent Assortment", image: "https://via.placeholder.com/150", description: "Minimal care required.", cost: "$13" },
        { name: "Chinese Evergreen", image: "https://via.placeholder.com/150", description: "Adapts to poor lighting.", cost: "$17" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>Cart 🛒 ({totalCartCount})</button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-listing">
          {plantsArray.map((categoryGroup, index) => (
            <div key={index}>
              <h2>{categoryGroup.category}</h2>
              <div className="product-grid">
                {categoryGroup.plants.map((plant, pIndex) => (
                  <div className="plant-card" key={pIndex}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button 
                      disabled={addedToCart[plant.name]} 
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
