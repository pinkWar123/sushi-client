import {
  Col,
  DatePicker,
  Empty,
  Flex,
  Form,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import Search from "antd/es/transfer/search";
import { FunctionComponent, useCallback, useEffect } from "react";
import OrderItem from "./OrderItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  fetchReservations,
  selectReservationData,
} from "../../../redux/reservationSlice";
import { IDetailedReservationCardsQuery } from "../../../@types/request/request";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the utc plugin

export interface OrderPageProps {}

dayjs.extend(utc);

const dateFormat = "YYYY-MM-DD";
const OrderPage: FunctionComponent<OrderPageProps> = () => {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector(selectReservationData);
  const location = useLocation();
  const navigate = useNavigate();
  const { branchId } = useParams();
  const getDate = useCallback(() => {
    const getUrlParams = (key: string): string | null => {
      const params = new URLSearchParams(location.search);
      return params.get(key);
    };

    // Get `datedOn` from the URL
    const datedOnParam = getUrlParams("datedOn");

    // Parse the date or use today's date
    const defaultDate = datedOnParam
      ? dayjs.utc(datedOnParam.split(" ")[0], dateFormat)
      : dayjs.utc();
    return defaultDate;
  }, [location.search]);

  const onDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      // Set the selected date and update URL params with datetime string
      const newDatedOn = date.utc().format(dateFormat) + " 00:00:00";
      const params = new URLSearchParams(location.search);
      params.set("datedOn", newDatedOn);
      navigate(`?${params.toString()}`);
    }
  };

  useEffect(() => {
    console.log(getDate().toISOString());
    const query: IDetailedReservationCardsQuery = {
      branchId: branchId ?? "",
      datedOn: getDate().toISOString(),
    };
    dispatch(fetchReservations(query));
  }, [dispatch, getDate, branchId]);
  if (loading) return <Skeleton active />;

  return (
    <>
      <Typography.Title level={2}>Orders</Typography.Title>
      <Flex justify="space-between">
        <Space>
          <div className="bg-white rounded-md py-1 px-2 cursor-pointer text-xs">
            All
          </div>
          <div className="bg-green-800 text-white rounded-md py-1 px-2 cursor-pointer text-xs">
            On Process
          </div>
          <div className="bg-white rounded-md py-1 px-2 cursor-pointer text-xs">
            Completed
          </div>
        </Space>
        <div className="flex gap-2">
          <Form.Item label="Date">
            <DatePicker
              value={getDate()}
              format={dateFormat}
              onChange={onDateChange}
            />
          </Form.Item>
          <Form.Item>
            <Search placeholder="Search a name, order, etc." />
          </Form.Item>
        </div>
      </Flex>
      {!loading && data.length === 0 ? (
        <Empty />
      ) : (
        <Row className="mt-4" gutter={8}>
          {data.map((item, index) => (
            <Col className="mb-4" span={8} key={`order-${index}`}>
              <OrderItem info={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default OrderPage;
