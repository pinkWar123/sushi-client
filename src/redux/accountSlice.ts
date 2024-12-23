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
    logOut: (state) => {
      state.userName = null;
      state.customerId = null;
      state.phone = null;
      state.dateOfBirth = null;
      state.name = null;
      state.branchId = null;
      state.employeeId = null;
      localStorage.removeItem("token");
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
        state.userName = userName;
        state.name = name;
        state.phone = phone;
        state.customerId = customerId;
        state.employeeId = employeeId;
        state.branchId = branchId;
        state.dateOfBirth = dateOfBirth;
      })
      .addCase(getUserCredentials.rejected, () => {
        console.log("Failed");
      });
  },
});

export default accountSlice.reducer;
export const { setUser, logOut } = accountSlice.actions;
