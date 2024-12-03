import { Empty, Modal } from "antd";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  removeDish,
  updateDishQuantity,
} from "../../../redux/client/clientSectionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTty } from "@fortawesome/free-solid-svg-icons";
import { PATH } from "../../../constants/paths";

interface CartModalProps {
  onClose: () => void;
}

const CartModal: FunctionComponent<CartModalProps> = ({ onClose }) => {
  const selectedDishes = useAppSelector(
    (state) => state.clientSections.selectedDishes
  );
  const dispatch = useAppDispatch();
  const branch = useAppSelector(
    (state) => state.clientSections.selectedBranchId
  );
  const { customerId, name } = useAppSelector((state) => state.account);
  const handleCreateReservation = () => {
    const channel = new BroadcastChannel("state-sync");
    console.log(selectedDishes);
    channel.postMessage({
      dishes: selectedDishes,
      branchId: branch,
      customerId,
      name,
    });
  };
  useEffect(() => {
    const channel = new BroadcastChannel("state-sync");
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "Need data") {
        handleCreateReservation();
      }
    };
    channel.addEventListener("message", handleMessage);
    return () => channel.removeEventListener("message", handleMessage);
  }, [selectedDishes, branch, customerId]);
  return (
    <Modal
      open
      title="Selected dishes"
      centered
      footer={null}
      closable
      onClose={onClose}
      onCancel={onClose}
    >
      {selectedDishes.length === 0 && <Empty />}
      {selectedDishes.map((selectedDish) => (
        <div key={selectedDish.dish.dishId}>
          <div className="flex justify-between py-2">
            <strong className="text-lg">{selectedDish.dish.dishName}</strong>
            <strong className="flex items-center">
              {selectedDish.dish.currentPrice * selectedDish.quantity}
            </strong>
          </div>
          <div className="flex justify-between py-2">
            <div className="text-xs text-gray-400">
              {selectedDish.dish.dishId}
            </div>
            <div>
              <div className="flex">
                <div
                  onClick={() => {
                    if (selectedDish.quantity === 1) {
                      dispatch(removeDish(selectedDish.dish.dishId));
                    } else {
                      dispatch(
                        updateDishQuantity({
                          dish: selectedDish.dish,
                          quantity: selectedDish.quantity - 1,
                        })
                      );
                    }
                  }}
                  className="px-2 border-2 rounded-md cursor-pointer hover:bg-gray-100 w-8 text-center"
                >
                  -
                </div>
                <div className="bg-white border-2 px-2 rounded-md">
                  {selectedDish.quantity}
                </div>
                <div
                  onClick={() =>
                    dispatch(
                      updateDishQuantity({
                        dish: selectedDish.dish,
                        quantity: selectedDish.quantity + 1,
                      })
                    )
                  }
                  className=" px-2 border-2 rounded-md cursor-pointer hover:bg-gray-100 w-8 text-center"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <a href={PATH.BOOKING.path} target="_blank">
        <button className=" gap-2 w-full py-2 text-white bg-orange-400 hover:bg-orange-500 mt-4 rounded-md">
          <FontAwesomeIcon icon={faTty} /> Set reservation
        </button>
      </a>
    </Modal>
  );
};

export default CartModal;
