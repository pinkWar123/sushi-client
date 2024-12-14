import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChartData, ChartOptions, ScriptableContext } from "chart.js";
import { callGetBranchRevenueByDateRange } from "../services/branch";

export interface IBranchState {
  revenue: ChartData<"line", number[], string>;
  options: ChartOptions<"line">;
  loading: boolean;
}

const initialState: IBranchState = {
  revenue: {
    labels: [],
    datasets: [
      {
        label: "Earning",
        data: [] as number[], // Ensure data is of type number[]
        fill: true,
        // backgroundColor: (context: ScriptableContext<"line">) => {
        //   const chart = context.chart;
        //   const { ctx, chartArea } = chart;

        //   if (!chartArea) {
        //     return "rgba(91, 84, 220, 0)";
        //   }
        //   const gradient = ctx.createLinearGradient(
        //     0,
        //     chartArea.top,
        //     0,
        //     chartArea.bottom
        //   );
        //   gradient.addColorStop(0, "rgba(91, 84, 220, 0.3)");
        //   gradient.addColorStop(1, "rgba(91, 84, 220, 0)");
        //   return gradient;
        // },
        borderColor: "#5B54DC",
        tension: 0.4,
        pointBackgroundColor: "#5B54DC",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointRadius: 4,
      },
    ],
  },
  options: {
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
        // callbacks: {
        //   label: (tooltipItem) => `${tooltipItem.raw}K Earning`,
        // },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
          color: "#A8A8A8",
          // callback: (value: number | string) => `${value}k`, // Only number here
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
  },
  loading: false,
};

interface IGetRevenueByDateRange {
  startDate: string;
  endDate: string;
  branchId: string;
}
export const getRevenueByDateRange = createAsyncThunk(
  "get-revenue",
  async (query: IGetRevenueByDateRange) => {
    const { branchId, endDate, startDate } = query;
    const res = await callGetBranchRevenueByDateRange(
      branchId,
      startDate,
      endDate
    );
    return res.data;
  }
);

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRevenueByDateRange.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRevenueByDateRange.fulfilled, (state, action) => {
        const data = action.payload;
        state.revenue.datasets[0].data = data.map(
          (revenue) => revenue.totalRevenue
        );
        state.revenue.labels = data.map((revenue) => revenue.revenueDate);
        state.loading = false;
      })
      .addCase(getRevenueByDateRange.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default branchSlice.reducer;
