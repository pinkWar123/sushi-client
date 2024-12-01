import { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dish } from "../../../../@types/response/section";

interface DishItemProps {
  dish: Dish;
}

const DishItem: FunctionComponent<DishItemProps> = ({ dish }) => {
  return (
    <div className="relative" id="dish-item" key={`dish-item-${dish.dishId}`}>
      <h2 id="dish-item-title">{dish.dishName}</h2>
      <p>{dish.currentPrice}</p>
      <div className="flex justify-center">
        <button className="absolute bottom-3 rounded-md w-4/5 py-2 bg-orange-300 hover:bg-orange-400 text-white gap-2">
          <FontAwesomeIcon icon={faPlus} />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default DishItem;
