import React, { useState, useEffect } from "react";
import "./css/Menu.css";
import axios from "axios";

type Section = {
  sectionId: string;
  sectionName: string;
};
type Dish = {
  dishId: number;
  dishName: string;
  currentPrice: number;
};

async function getSectionData() {
  try {
    const response = await axios.get(
      "https://sushiserver-bbabf5dvhsdperbb.southeastasia-01.azurewebsites.net/api/section"
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getDish(
  id?: string,
  minPrice?: number | null,
  maxPrice?: number | null
) {
  try {
    console.log(minPrice, maxPrice);
    let url = `https://sushiserver-bbabf5dvhsdperbb.southeastasia-01.azurewebsites.net/api/dish/?SectionId=${id}`;
    if (minPrice !== null) {
      url += `&MinPrice=${minPrice}`;
    }
    if (maxPrice !== null) {
      url += `&MaxPrice=${maxPrice}`;
    }
    const response = await axios.get(url);
    return response.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function Menu() {
  const [menuSections, setMenuSections] = useState<Section[] | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [dishes, setDishes] = useState<Dish[] | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);

  useEffect(() => {
    getSectionData()
      .then((data) => {
        if (data) setMenuSections(data);
      })
      .catch((error) => console.error("Error fetching section data:", error));
  }, []);

  useEffect(() => {
    getDish(selectedSection?.sectionId, minPrice, maxPrice)
      .then((data) => {
        if (data) setDishes(data);
      })
      .catch((error) => console.error("Error fetching dish data: ", error));
  }, [selectedSection, minPrice, maxPrice]);

  const handleSectionClick = (section: Section) => {
    setSelectedSection(section);
  };

  if (!menuSections) {
    return <div>Loading sections...</div>;
  }

  return (
    <div
      id="menu"
      className="flex justify-center items-center w-screen h-screen"
    >
      {/* Sections List */}
      <div id="categories">
        {menuSections.map((section) => (
          <div
            id="cat-item"
            key={section.sectionId}
            className="category-item"
            onClick={() => handleSectionClick(section)}
          >
            {section.sectionName}
          </div>
        ))}
      </div>

      {/* Section Details */}
      <div id="cat-detail" className="category-detail">
        <div id="cat-title">{selectedSection?.sectionName}</div>
        <div id="dish-list-manipulate">
          <div>
            <label htmlFor="max-price">Max price</label>
            <input
              value={maxPrice ?? ""}
              type="number"
              id="max-price"
              name="max-price"
              min="0"
              max="100"
              onChange={(event) =>
                setMaxPrice(parseInt(event.target.value) || null)
              }
            />
          </div>
          <div>
            <label htmlFor="min-price">Min price</label>
            <input
              value={minPrice ?? ""}
              type="number"
              id="min-price"
              name="min-price"
              min="0"
              max="100"
              onChange={(event) =>
                setMinPrice(parseInt(event.target.value) || null)
              }
            />
          </div>
        </div>
        <div id="dish-list">
          {dishes?.map((dish) => {
            return (
              <div id="dish-item" key={dish.dishId}>
                <h2 id="dish-item-title">{dish.dishName}</h2>
                <p>{dish.currentPrice}</p>
              </div>
            );
          })}
          {dishes?.length === 0 && "No data to display"}
        </div>
      </div>
    </div>
  );
}

export default Menu;
