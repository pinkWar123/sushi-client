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
} from "chart.js";
import { useAppSelector } from "../../../hooks/redux";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale
);

const EarningsChart: React.FC = () => {
  const data = useAppSelector((state) => state.branches.revenue);
  const options = useAppSelector((state) => state.branches.options);

  return (
    <div>
      <div className="p-4 rounded-lg shadow-lg bg-white">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EarningsChart;
