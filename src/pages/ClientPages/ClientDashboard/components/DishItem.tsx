import { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dish } from "../../../../@types/response/section";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  addDishToCart,
  findSelectedDishById,
  removeDish,
} from "../../../../redux/client/clientSectionSlice";
import { message } from "antd";

interface DishItemProps {
  dish: Dish;
}

const DishItem: FunctionComponent<DishItemProps> = ({ dish }) => {
  const dispatch = useAppDispatch();
  const handleAddDish = () => {
    dispatch(addDishToCart({ dish, quantity: 1 }));
    message.success(`Add ${dish.dishName} to cart`);
  };
  const handleRemoveDish = () => {
    dispatch(removeDish(dish.dishId));
    message.info(`Remove ${dish.dishName} to cart`);
  };
  const hasDishAdded = () =>
    useAppSelector((state) => findSelectedDishById(state, dish.dishId));
  return (
    <div className="relative" id="dish-item" key={`dish-item-${dish.dishId}`}>
      <h2 id="dish-item-title">{dish.dishName}</h2>
      <p>{dish.currentPrice}</p>
      <div className="flex justify-center">
        {hasDishAdded() ? (
          <button
            className="absolute bottom-3 rounded-md w-4/5 py-2 bg-red-300 hover:bg-red-400 text-white gap-2"
            onClick={handleRemoveDish}
          >
            <FontAwesomeIcon icon={faTrash} /> Remove
          </button>
        ) : (
          <button
            onClick={handleAddDish}
            className="absolute bottom-3 rounded-md w-4/5 py-2 bg-orange-300 hover:bg-orange-400 text-white gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default DishItem;
