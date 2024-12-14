import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginRequest } from "../@types/request/request";
import { callGetUserCredentials, callLogin } from "../services/account";
import { IUserCredentials } from "../@types/response/account";

const initialState: IUserCredentials = {
  userName: null,
  customerId: null,
  name: null,
  phone: null,
  dateOfBirth: null,
  branchId: null,
  employeeId: null,
};

export const login = createAsyncThunk(
  "login",
  async (request: ILoginRequest) => {
    const res = await callLogin(request);
    return res.data;
  }
);

export const getUserCredentials = createAsyncThunk("me", async () => {
  const res = await callGetUserCredentials();
  console.log(res.data);
  return res.data;
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { userName, token } = action.payload;
        localStorage.setItem("token", token);
        state.userName = userName;
      })
      .addCase(getUserCredentials.fulfilled, (state, action) => {
        const {
          userName,
          name,
          phone,
          customerId,
          employeeId,
          branchId,
          dateOfBirth,
        } = action.payload;
        return {
          userName,
          name,
          phone,
          customerId,
          employeeId,
          branchId,
          dateOfBirth,
        };
      })
      .addCase(getUserCredentials.rejected, () => {
        console.log("Failed");
      });
  },
});

export default accountSlice.reducer;
export const { setUser } = accountSlice.actions;
