import React from "react";
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

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale
);

const EarningsChart: React.FC = () => {
  const data: ChartData<"line", number[], string> = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Earning",
        data: [1500, 3000, 5000, 5900, 4000, 4500, 5000] as number[], // Ensure data is of type number[]
        fill: true,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return "rgba(91, 84, 220, 0)";
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(91, 84, 220, 0.3)");
          gradient.addColorStop(1, "rgba(91, 84, 220, 0)");
          return gradient;
        },
        borderColor: "#5B54DC",
        tension: 0.4,
        pointBackgroundColor: "#5B54DC",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointRadius: 4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#5B54DC",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}K Earning`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
          color: "#A8A8A8",
          callback: (value: number | string) => `${value}k`, // Only number here
        },
        grid: {
          color: "rgba(168, 168, 168, 0.3)",
        },
      },
      x: {
        ticks: {
          color: "#A8A8A8",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default EarningsChart;
