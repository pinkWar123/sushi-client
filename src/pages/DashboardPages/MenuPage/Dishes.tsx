import { Card, Col, Flex, Form, Row, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import DishItem from "./DishItem";
import Search from "antd/es/transfer/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddDishModal from "./AddDishModal";
import AddDishToSectionModal from "./AddDishToSectionModal";

interface DishesProps {}

const Dishes: FunctionComponent<DishesProps> = () => {
  const [openAddDishModal, setOpenAddDishModal] = useState<boolean>(false);
  const [openAddDishToSectionModal, setOpenAddDishToSectionModal] =
    useState<boolean>(false);
  return (
    <>
      {openAddDishModal && (
        <AddDishModal onHide={() => setOpenAddDishModal(false)} />
      )}
      {openAddDishToSectionModal && (
        <AddDishToSectionModal
          onHide={() => setOpenAddDishToSectionModal(false)}
        />
      )}
      <Row gutter={16}>
        <Col span={20}>
          <Form.Item>
            <Search placeholder="Search dish" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <button
            onClick={() => setOpenAddDishModal(true)}
            className="rounded-full ring-1 ring-violet-500 bg-violet-700 text-white py-1 px-4"
          >
            <FontAwesomeIcon icon={faPlus} /> Add dish
          </button>
        </Col>
      </Row>
      <Flex justify="space-between">
        <Typography.Title level={3}>Fast food</Typography.Title>
      </Flex>
      <Row gutter={6} className="mt-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Col key={`dish-${index}`} span={6}>
            <DishItem />
          </Col>
        ))}
        <Col span={6}>
          <div
            onClick={() => setOpenAddDishToSectionModal(true)}
            className="h-72 bg-white rounded-md flex items-center border-dashed border-2 border-gray-300 cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 hover:shadow-md hover:scale-105"
          >
            <div>
              <Flex justify="center">
                <FontAwesomeIcon icon={faPlus} />
              </Flex>
              <div className="flex justify-center text-center">
                <div className="w-6/12">Add new dish to this section</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Flex justify="center">
        <button className="rounded-full ring-1 ring-red-500 py-1 px-4">
          See more...
        </button>
      </Flex>
    </>
  );
};

export default Dishes;
