import { FunctionComponent } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { Card, Typography } from "antd";
import DishItem from "./DishItem";

interface WorstDishesProps {}

const WorstDishes: FunctionComponent<WorstDishesProps> = () => {
  const worstDishes = useAppSelector((state) => state.branches.dishes.worst);
  return (
    <Card className="min-h-96">
      <Typography.Title level={4}>Worst dishes</Typography.Title>
      {worstDishes.map((dish, index) => (
        <DishItem
          dishName={dish.dishName}
          orders={dish.totalOrders}
          key={`dish-${index}`}
        />
      ))}
    </Card>
  );
};

export default WorstDishes;
