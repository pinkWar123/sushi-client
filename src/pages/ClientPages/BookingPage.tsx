import { FunctionComponent, useEffect, useState } from "react";
import InputBox from "../../components/InputBox/InputBox";
import Button from "../../components/Button/Button";
import { SelectedDish } from "../../redux/client/clientSectionSlice";
import { ICreateReservationRequest } from "../../@types/request/request";
import { useAppSelector } from "../../hooks/redux";
import { callCreateReservation } from "../../services/reservation";
import { message } from "antd";

interface BookingPageProps {}
const BookingPage: FunctionComponent<BookingPageProps> = () => {
  const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);
  const [formData, setFormData] = useState<ICreateReservationRequest>({
    note: "",
    datedOn: "",
    customerId: "",
    branchId: "",
    totalPeople: 0,
    orderDetails: [],
  });
  const { name, customerId } = useAppSelector((state) => state.account);
  console.log(customerId);
  useEffect(() => {
    const channel = new BroadcastChannel("state-sync");
    channel.postMessage("Need data");
    const handleMessage = (event: MessageEvent) => {
      const { dishes, branchId } = event.data;
      setSelectedDishes(dishes);
      setFormData((prev) => ({
        ...prev,
        branchId,
        orderDetails: dishes.map((dish: SelectedDish) => ({
          dishId: dish.dish.dishId,
          quantity: dish.quantity,
        })),
        customerId: customerId ?? "",
      }));
    };
    channel.addEventListener("message", handleMessage);
    return () => channel.removeEventListener("message", handleMessage);
  }, [customerId, name]);

  console.log(formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      !prevData
        ? prevData
        : {
            ...prevData,
            [name]: value,
          }
    );
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    callCreateReservation(formData);
    message.success("Ban da dat ban thanh cong");
  };

  return (
    <div
      id="booking"
      className="h-screen  flex justify-start items-center flex-column text-red-700 font-bold"
    >
      <div className="booking-title">
        <div className="pt-24 text-center font-bold text-9xl">よやく</div>
        <div className="text-center font-bold font-italic text-2xl">
          BOOKING
        </div>
      </div>
      <div id="booking-form" className="w-1/2 h-screen  mt-10">
        <form action="" className="flex justify-between items-center flex-col">
          <InputBox
            onChange={handleChange}
            type="text"
            label="Nhập tên"
            id="Name"
            name="name"
            disabled
            value={name ?? ""}
          />
          <InputBox
            onChange={handleChange}
            type="datetime-local"
            label="Ngày đặt"
            id="date"
            name="datedOn"
          />
          <InputBox
            onChange={handleChange}
            type="number"
            label="Số lượng người"
            id=""
            name="totalPeople"
          />
          <InputBox
            onChange={handleChange}
            type="text"
            label="Ghi chú"
            id="note"
            name="note"
          />
          <Button type="button" content="submit" onClick={handleSubmit} />
        </form>
      </div>
      <div className="card p-4 rounded-md w-50">
        {selectedDishes.map((selectedDish) => (
          <div
            key={selectedDish.dish.dishId}
            className="flex justify-between py-2"
          >
            <strong className="text-lg">
              {selectedDish.dish.dishName} x {selectedDish.quantity}
            </strong>
            <strong className="flex items-center">
              {selectedDish.dish.currentPrice * selectedDish.quantity}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
