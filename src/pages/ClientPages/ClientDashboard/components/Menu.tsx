import React, { useState } from 'react';
import './css/Menu.css';
import menu from './menuData';

// Define types for the dish and menu structure
type Dish = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Menu = {
  [category: string]: { [key: string]: Dish };
};

function Menu() {
  // Define the state for the selected category (either a string or null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Handler to set the selected category
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div id="menu" className="flex justify-center items-center w-screen h-screen">
      {/* Categories List */}
      <div id="categories">
        {Object.keys(menu).map((category) => (
          <div
            id='cat-item'
            key={category}
            className="category-item"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Category Dishes */}
      <div id="cat-detail" className="category-detail">
        {selectedCategory && (
          <div>
            <h2 id='cat-title'>{selectedCategory}</h2>
            <div id="dish-list">
              {Object.entries(menu[selectedCategory as keyof typeof menu]).map(
                ([dishKey, dish]) => (
                  <div key={dish.id} id="dish-item">
                    <img id="dish-image" src={dish.image} alt={dish.name} />
                    <div id="dish-info">
                      <div id='dish-item-title'>{dish.name}</div>
                      <p>{`$${dish.price.toFixed(2)}`}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
