import { Col, Flex, Form, Row, Skeleton, Typography } from "antd";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import DishItem from "./DishItem";
import Search from "antd/es/transfer/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddDishModal from "./AddDishModal";
import AddDishToSectionModal from "./AddDishToSectionModal";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  fetchDishesBySection,
  fetchMoreDishes,
  selectMenuData,
} from "../../../redux/menuSlice";
import { useLocation } from "react-router-dom";
import { IDishesQuery } from "../../../@types/request/request";

interface DishesProps {}

const Dishes: FunctionComponent<DishesProps> = () => {
  const [openAddDishModal, setOpenAddDishModal] = useState<boolean>(false);
  const [openAddDishToSectionModal, setOpenAddDishToSectionModal] =
    useState<boolean>(false);
  const [sectionId, setSectionId] = useState<string | null>(null);
  const location = useLocation();
  const dispatch = useAppDispatch();
  // const { data: items, loading, pagination } = useAppSelector(selectMenuData);
  const items = useAppSelector((state) => state.menu.data);
  const loading = useAppSelector((state) => state.menu.loading);
  const pagination = useAppSelector((state) => ({
    pageNumber: state.menu.pageNumber,
    pageSize: state.menu.pageSize,
    totalRecords: state.menu.totalRecords,
  }));
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sectionId = searchParams.get("section");
    setSectionId(sectionId);
  }, [location.search]);
  const query = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const sectionId = searchParams.get("section");
    const query: IDishesQuery = {
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
    };
    if (sectionId) query.sectionId = sectionId;
    return query;
  }, [location.search]);
  useEffect(() => {
    dispatch(fetchDishesBySection(query));
  }, [dispatch, query]);
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
          <Form>
            <Form.Item>
              <Search placeholder="Search dish" />
            </Form.Item>
          </Form>
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
        {items.map((item) => (
          <Col span={6} key={`item-${item.dishId}`}>
            <Skeleton loading={loading}>
              <DishItem item={item} sectionId={sectionId} />
            </Skeleton>
          </Col>
        ))}
        {!loading && (
          <Col span={6}>
            <div
              onClick={() => setOpenAddDishToSectionModal(true)}
              className="h-72 bg-white rounded-md flex items-center border-dashed border-2 border-gray-300 cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 hover:shadow-md hover:scale-105"
            >
              <div>
                <Flex justify="center">
                  <FontAwesomeIcon icon={faPlus} />
                </Flex>
                <div className="flex justify-center ">
                  <div className="w-6/12 text-center">
                    Add new dish to this section
                  </div>
                </div>
              </div>
            </div>
          </Col>
        )}
      </Row>
      {pagination.pageNumber * pagination.pageSize <=
        pagination.totalRecords && (
        <Flex justify="center">
          <button
            className="rounded-full ring-1 ring-red-500 py-1 px-4"
            onClick={async () => {
              const newQuery = { ...query, pageNumber: query.pageNumber + 1 };
              await dispatch(fetchMoreDishes(newQuery));
            }}
          >
            See more...
          </button>
        </Flex>
      )}
    </>
  );
};

export default Dishes;
