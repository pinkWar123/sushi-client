import {
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Row,
  TimeRangePickerProps,
  Typography,
} from "antd";
import React, { FunctionComponent, useEffect } from "react";
import EarningsChart from "./EarningChart";
import { useAppDispatch } from "../../../hooks/redux";
import {
  getRevenueByDateRange,
  getTopDishesByDateRange,
  getWorstDishesByDateRange,
} from "../../../redux/branchSlice";
import { useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import TopDishes from "./TopDishes";
import WorstDishes from "./WorstDishes";

export interface DashboardPageProps {}

const initialDates: [Dayjs, Dayjs] = [
  dayjs().subtract(7, "days"), // Start date: 7 days ago
  dayjs(), // End date: Today
];

const _DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  const { branchId } = useParams();
  const dispatch = useAppDispatch();
  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
  ];

  const onRangeChange = async (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      const args = {
        branchId: branchId ?? "",
        startDate: dateStrings[0],
        endDate: dateStrings[1],
      };
      await Promise.all([
        dispatch(getRevenueByDateRange(args)),
        dispatch(getTopDishesByDateRange(args)),
        dispatch(getWorstDishesByDateRange(args)),
      ]);
    } else {
      console.log("Clear");
    }
  };

  useEffect(() => {
    dispatch(
      getRevenueByDateRange({
        branchId: branchId ?? "",
        startDate: initialDates[0].toString(),
        endDate: initialDates[1].toString(),
      })
    );
  }, [dispatch]);
  return (
    <>
      <Flex justify="space-between">
        <Typography.Title level={3}>Dashboard</Typography.Title>
      </Flex>
      <DatePicker.RangePicker
        defaultValue={initialDates}
        presets={rangePresets}
        onChange={onRangeChange}
      />

      <Row gutter={16} className="mt-8">
        <Col span={16}>
          <EarningsChart />
        </Col>
        <Col span={8}>
          <TopDishes />
          <div className="mt-4">
            <WorstDishes />
          </div>
        </Col>
      </Row>
    </>
  );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
