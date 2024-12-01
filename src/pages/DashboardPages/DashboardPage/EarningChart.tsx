import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  ChartOptions,
  ChartData,
  ScriptableContext,
} from "chart.js";
import { DatePicker, Flex, TimeRangePickerProps, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getRevenueByDateRange } from "../../../redux/branchSlice";
import { useParams } from "react-router-dom";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale
);

const initialDates: [Dayjs, Dayjs] = [
  dayjs().subtract(7, "days"), // Start date: 7 days ago
  dayjs(), // End date: Today
];

const EarningsChart: React.FC = () => {
  const { branchId } = useParams();
  const data = useAppSelector((state) => state.branches.revenue);
  const options = useAppSelector((state) => state.branches.options);
  const dispatch = useAppDispatch();
  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
  ];

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      dispatch(
        getRevenueByDateRange({
          branchId: branchId ?? "",
          startDate: dateStrings[0],
          endDate: dateStrings[1],
        })
      );
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
    <div>
      <Flex justify="space-between">
        <Typography.Title level={3}>Summary</Typography.Title>
        <DatePicker.RangePicker
          defaultValue={initialDates}
          presets={rangePresets}
          onChange={onRangeChange}
        />
      </Flex>
      <div className="p-4 rounded-lg shadow-lg bg-white">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EarningsChart;
