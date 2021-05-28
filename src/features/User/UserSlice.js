import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const ApproveIt = createAsyncThunk(
  'users/ApproveIt',
  async ({ Id,what }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:9002/ApproveIt',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            Id,
            what
          }),
        }
      );
      let data = await response.json();
      console.log('data', data);
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

export const NewCandidat = createAsyncThunk(
  'users/NewCandidat',
  async ({ studentId, name, surname, department, votes, description, approved, startAt, endAt }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:9002/candidates',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            studentId,
            name,
            surname,
            department,
            votes,
            description,
            approved,
            startAt,
            endAt
          }),
        }
      );
      let data = await response.json();
      console.log('data', data);
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

export const NewNotify = createAsyncThunk(
  'users/NewNotify',
  async ({ title, content }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const createdAt = new Date();
      const updatedAt = new Date();
      const deletedAt = null;
      const response = await fetch(
        'http://localhost:9002/notifications',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            title,
            content,
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

export const NewDates = createAsyncThunk(
  'users/NewDates',
  async ({ CreatedAt, EndAt }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:9002/CreateDate',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            CreatedAt,
            EndAt
            
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
export const deleteCandidateById = createAsyncThunk(
  'users/deleteCandidateById',
  async ({ Id }, thunkAPI) => {

    try {

      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:9002/candidates/' + Id,
        {
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
          }
        }
      );
      let data = await response.json();
      console.log('data', data);

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
export const deleteNotifyById = createAsyncThunk(
  'users/deleteNotifyById',
  async ({ Id }, thunkAPI) => {

    try {

      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:9002/notifications/' + Id,
        {
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
          }
        }
      );
      let data = await response.json();
      console.log('data', data);

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
            Authorization: "Bearer " + token
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
  async ({ token, department }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:9002/notifications',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
            department: department
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

export const fetchCandidateBytoken = createAsyncThunk(
  'users/fetchCandidateBytoken',
  async ({ token, department }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:9002/candidates',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
            department: department
          }
        }
      );
      let data = await response.json();
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
export const fetchUserIdBytoken = createAsyncThunk(
  'users/fetchUserIdByToken',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:9002/students',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Id
          }),
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
            Authorization: "Bearer " + token,
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
    students: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    IsOld: true,
    errorMessage: '',
    notifies: [],
    Candidates: [],
    isSuccessOk: false
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.notifies = [];
      state.students = [];
      state.Candidates = [];
      state.isSuccessOk = false;
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
    [deleteNotifyById.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.isSuccessOk = true;
    },
    [deleteNotifyById.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteNotifyById.rejected]: (state, { payload }) => {

      if (payload != undefined) {
        state.isError = true;
        state.isFetching = false;
        state.errorMessage = payload;
        state.isSuccessOk = false;
      }
      else {
        state.isFetching = false;
        state.isSuccess = true;
        state.isSuccessOk = true;
      }
    },
    [NewCandidat.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;
    },
    [NewCandidat.pending]: (state) => {
      state.isFetching = true;
    },
    [NewCandidat.rejected]: (state, { payload }) => {
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
      state.isFetching = false;
      state.isError = true;
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


    [fetchCandidateBytoken.pending]: (state) => {
      state.isFetching = true;
    },

    [fetchCandidateBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      console.log(payload);
      state.Candidates = payload.candidates;
    },
    [fetchCandidateBytoken.rejected]: (state) => {
      console.log('fetchCandidateBytoken');
      state.isFetching = false;
      state.isError = true;
    }
  }
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
