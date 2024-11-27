import { App, Avatar, Card, Flex, Rate, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import EditDishModal from "./EditDishModal";
import { IDish } from "../../../@types/response/menu";

interface DishItemProps {
  item: IDish;
  sectionId: string | null;
}

const DishItem: FunctionComponent<DishItemProps> = ({ item, sectionId }) => {
  const [editModel, toggleEditMode] = useState<boolean>(false);
  const { modal } = App.useApp();
  return (
    <>
      {editModel && (
        <EditDishModal
          sectionId={sectionId}
          name={item.dishName}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsa
          provident, quas cum exercitationem repudiandae consectetur quam quae
          vero. A nesciunt rem asperiores fuga voluptates, dolorem labore facere
          laborum esse."
          price={item.currentPrice}
          onHide={() => toggleEditMode(false)}
        />
      )}
      <Card className="mb-4 h-70">
        <Flex justify="flex-end">
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            className="rounded-full text-white bg-green-700 ring-2 px-2"
          >
            ${item.currentPrice}
          </Typography.Paragraph>
        </Flex>
        <Flex className="mt-4" justify="center">
          <Avatar
            size={48}
            src="https://cdn.vectorstock.com/i/1000v/52/66/burger-cheeseburger-hamburger-drawing-vector-44205266.jpg"
          ></Avatar>
        </Flex>
        <Flex justify="center">
          <Typography.Paragraph ellipsis={{ rows: 1 }}>
            <strong className="text-center">{item.dishName}</strong>
          </Typography.Paragraph>
        </Flex>
        <Flex justify="center">
          <Rate className="text-sm" value={4} />
        </Flex>
        <Typography.Paragraph
          ellipsis={{ rows: 3 }}
          className="text-center text-gray-500 text-xs h-8 mt-2"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsa
          provident, quas cum exercitationem repudiandae consectetur quam quae
          vero. A nesciunt rem asperiores fuga voluptates, dolorem labore facere
          laborum esse.
        </Typography.Paragraph>
        <Flex gap={"middle"} justify="center">
          <button
            onClick={() => toggleEditMode(true)}
            className="mt-4 text-red-500 ring-2 ring-red-500 rounded-full py-1 px-4  hover:text-white hover:bg-red-400"
          >
            Edit
          </button>
          <button
            onClick={() =>
              modal.warning({
                content: "Are you sure to remove this dish?",
                centered: true,
              })
            }
            className="mt-4 text-red-500 ring-2 ring-red-500 rounded-full py-1 px-4  hover:text-white hover:bg-red-400"
          >
            Delete
          </button>
        </Flex>
      </Card>
    </>
  );
};

export default DishItem;
