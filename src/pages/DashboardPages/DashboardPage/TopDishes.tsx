import { Card, Typography } from "antd";
import { FunctionComponent } from "react";
import { useAppSelector } from "../../../hooks/redux";
import DishItem from "./DishItem";

interface TopDishesProps {}

const TopDishes: FunctionComponent<TopDishesProps> = () => {
  const bestDishes = useAppSelector((state) => state.branches.dishes.best);
  return (
    <Card className="min-h-96">
      <Typography.Title level={4}>Top selling items</Typography.Title>
      {bestDishes.map((dish, index) => (
        <DishItem
          dishName={dish.dishName}
          orders={dish.totalOrders}
          key={`dish-${index}`}
        />
      ))}
    </Card>
  );
};

export default TopDishes;
