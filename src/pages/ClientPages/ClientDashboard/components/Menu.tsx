import { useState, useEffect } from "react";
import "./css/Menu.css";
import DishItem from "./DishItem";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  changeBranch,
  changeSelectedSection,
  fetchBranches,
  fetchDishes,
  fetchSections,
} from "../../../../redux/client/clientSectionSlice";
import { Select } from "antd";

// async function getSectionData() {
//   try {
//     const response = await axios.get(
//       "https://sushiserver-bbabf5dvhsdperbb.southeastasia-01.azurewebsites.net/api/section"
//     );
//     console.log(response.data);
//     return response.data.data;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// }

// async function getDish(
//   id?: string,
//   minPrice?: number | null,
//   maxPrice?: number | null
// ) {
//   try {
//     console.log(minPrice, maxPrice);
//     let url = `https://sushiserver-bbabf5dvhsdperbb.southeastasia-01.azurewebsites.net/api/dish/?SectionId=${id}`;
//     if (minPrice !== null) {
//       url += `&MinPrice=${minPrice}`;
//     }
//     if (maxPrice !== null) {
//       url += `&MaxPrice=${maxPrice}`;
//     }
//     const response = await axios.get(url);
//     return response.data.data;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// }

function Menu() {
  // const [menuSections, setMenuSections] = useState<Section[] | null>(null);
  // const [dishes, setDishes] = useState<Dish[] | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>();
  const [minPrice, setMinPrice] = useState<number>();
  const menuSections = useAppSelector(
    (state) => state.clientSections.menuSections
  );
  const selectedSection = useAppSelector(
    (state) => state.clientSections.selectedSection
  );
  const dishes = useAppSelector((state) => state.clientSections.dishes);
  const branches = useAppSelector((state) => state.clientSections.branches);
  const branchId = useAppSelector(
    (state) => state.clientSections.selectedBranchId
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchDishes({
        sectionId: selectedSection?.sectionId,
        branchId,
        minPrice,
        maxPrice,
        pageNumber: 1,
        pageSize: 100,
      })
    );
  }, [selectedSection, minPrice, maxPrice, branchId]);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

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
            onClick={() => dispatch(changeSelectedSection(section))}
          >
            {section.sectionName}
          </div>
        ))}
        <Select
          placeholder="Choose a branch"
          className="w-full mt-4"
          options={branches.map((branch) => ({
            label: branch.name,
            value: branch.branchId,
          }))}
          onChange={(value) => dispatch(changeBranch(value))}
        />
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
                setMaxPrice(parseInt(event.target.value) || undefined)
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
                setMinPrice(parseInt(event.target.value) || undefined)
              }
            />
          </div>
        </div>
        <div id="dish-list">
          {dishes?.map((dish) => (
            <DishItem dish={dish} />
          ))}
          {dishes?.length === 0 && "No data to display"}
        </div>
      </div>
    </div>
  );
}

export default Menu;
