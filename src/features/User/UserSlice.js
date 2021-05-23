import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const NewNotify = createAsyncThunk(
  'users/NewNotify',
  async ({ title, content,department }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const createdAt= new Date();
      const updatedAt= new Date();
      const deletedAt = null;
      const response = await fetch(
        'http://localhost:9002/notifications',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:"Bearer "+ token
          },
          body: JSON.stringify({
            title, 
            content, 
            department,
            createdAt,
            updatedAt,
            deletedAt
          }),
        }
      );
      let data = await response.json();
      console.log('data', data);

      if (response.status === 200) {
        return { ...data, title: title };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:9002/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

        },
          body: JSON.stringify({
            username,
            password,
        }),
       }
    );
      let data = await response.json();
      console.log('response', data);
      if (response.status === 200) {
        localStorage.setItem('token', data.token);
     
        return data;
      } else {
      
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
     thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const IsOldPassword = createAsyncThunk(
  'users/IsOldPassword',
  async (thunkAPI) => {
       return false;
  }
);


export const updatePassword = createAsyncThunk(
  'users/updatePassword',
  async ({ oldPassword, password }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
     
      const response = await fetch(
        'http://localhost:9002/profile/1',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:"Bearer "+ token
        },
          body: JSON.stringify({
            oldPassword,
            password,
        }),
       }
    );
    
      let data = await response.json();
     
      if (response.status === 200) {

        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
     thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchNotifyBytoken = createAsyncThunk(
  'users/fetchNotifyBytoken',
  async ({ token,department }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:9002/notifications',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization:"Bearer "+ token,
            'Content-Type': 'application/json',
            department:department
          }
          
        }
      );
      let data = await response.json();
    //  console.log('data', data, response.status);
      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:9002/students',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization:"Bearer "+ token,
            'Content-Type': 'application/json',
          },
        }
      );
      let data = await response.json();
      console.log('data', data, response.status);
      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    students:[],
    isFetching: false,
    isSuccess: false,
    isError: false,
    IsOld:true,
    errorMessage: '',
    notifies:[],
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.notifies=[];
      state.students=[];
      return state;
    },
  },
  extraReducers: {
    [NewNotify.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;

    },
    [NewNotify.pending]: (state) => {
      state.isFetching = true;
    },
    [NewNotify.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.username = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
    //  console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      //buraya müdehale
      state.errorMessage = payload.message;
    },
    [updatePassword.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      //  console.log('payload', payload);
        state.isFetching = false;
        state.isError = true;
        //buraya müdehale
        
        state.errorMessage = payload.message;
    },
      [updatePassword.fulfilled]: (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.isError = false;
      },  
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },

    [IsOldPassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
   
      state.IsOld = payload;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.students = payload.rows;
      console.log(payload.rows);
    },
    [fetchUserBytoken.rejected]: (state) => {
      console.log('fetchUserBytoken');
      state.isFetching = false;
      state.isError = true;
    },
        [fetchNotifyBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchNotifyBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      console.log(payload);
      state.notifies = payload.notifications;
   
    },
    [fetchNotifyBytoken.rejected]: (state) => {
      console.log('fetchNotifyBytoken');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
