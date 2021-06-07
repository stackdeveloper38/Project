import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const ApproveIt = createAsyncThunk(
  'users/ApproveIt',
  async ({ Id, what }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:9002/ApproveIt', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          Id,
          what
        })
      })
      let data = await response.json()
      console.log('data', data)
      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const NewCandidat = createAsyncThunk(
  'users/NewCandidat',
  async (
    {
      description
    },
    thunkAPI
  ) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:9002/student/beCandidate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          description
        })
      })
      let data = await response.json()
      console.log('data', data)
      if (response.status === 200) {
        return { ...data }
      }
      else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const NewNotify = createAsyncThunk(
  'users/NewNotify',
  async ({ title, content }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const createdAt = new Date()
      const updatedAt = new Date()
      const deletedAt = null
      const response = await fetch('http://localhost:9002/notifications', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          title,
          content,
          createdAt,
          updatedAt,
          deletedAt
        })
      })
      let data = await response.json()
      console.log('data', data)
      if (response.status === 200) {
        return { ...data, title: title }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const NewDates = createAsyncThunk(
  'users/NewDates',
  async ({ CreatedAt, EndAt }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:9002/CreateDate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          CreatedAt,
          EndAt
        })
      })
      let data = await response.json()
      console.log('data', data)
      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)


export const VoteCandidateById = createAsyncThunk(
  'users/VoteCandidateById',
  async ({ Id }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        'http://localhost:9002/student/vote/' + Id,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
            Id
          })
        }
      )
      let data = await response.json()
      console.log('data', data)

      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)


export const deleteNotifyById = createAsyncThunk(
  'users/deleteNotifyById',
  async ({ Id }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        'http://localhost:9002/notifications/' + Id,
        {
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }
      )
      let data = await response.json()
      console.log('data', data)

      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
export const loginUser = createAsyncThunk(
  'users/login',
  async ({ studentId, password }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:9002/student/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId,
          password
        })
      })
      let data = await response.json()
      console.log('response', data)
      if (response.status === 200) {
        localStorage.setItem('token', data.token)
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
export const forgotpassworduser = createAsyncThunk(
  'users/updateStudentPassword',
  async ({ email }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:9002/updateStudentPassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          email
        })
      })
      let data = await response.json()
      //    console.log('response', data)
      if (response.status === 200) {
        localStorage.setItem('token', data.token)
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const IsExpired = createAsyncThunk(
  'users/IsExpired',
  async (thunkAPI) => {
   
    const token = localStorage.getItem('token')
    const data = atob(token.split(".")[1])
    const payload = data
    const expiration = new Date(payload.exp);
    const now = new Date();
    if (expiration.getTime() - now.getTime() < 0) {   
     
      return true
   
    } else {  
     
      return false
    
    }
  }
)

export const updatePassword = createAsyncThunk(
  'users/updateStudentPassword',
  async ({ oldPassword, password }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:9002/updateStudentPassword', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          oldPassword,
          password
        })
      })
      let data = await response.json()
      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const election = createAsyncThunk(
  'users/getElectionStatus',
  async (thunkAPI) => {
    try {
      console.log("ee")
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:9002/getElectionStatus', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      let data = await response.json()
      //  console.log('data', data, response.status);
      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const fetchNotifyBytoken = createAsyncThunk(
  'users/fetchNotifyBytoken',
  async ({ token, department }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:9002/notifications', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
          //department: department
        }
      })
      let data = await response.json()
      //  console.log('data', data, response.status);
      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const studentIsPassive = createAsyncThunk(
  'users/studentIsPassive',
  async ( thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:9002/student/isPassive', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      let data = await response.json()
      //  console.log('data', data, response.status);
      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const fetchCandidateBytoken = createAsyncThunk(
  'users/fetchCandidateBytoken',
  async ({ token, department }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:9002/candidates', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          department: department
        }
      })
      let data = await response.json()
      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
export const isOldp = createAsyncThunk(
  'users/isOldp',
  async (thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:9002/student/isOldPass', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      let data = await response.json()
      //  console.log('datapppp', data)
      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
export const fetchUserIdBytoken = createAsyncThunk(
  'users/fetchUserIdByToken',
  async ({ Id }, thunkAPI) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:9002/students', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id
        })
      })
      let data = await response.json()
      console.log('data', data, response.status)
      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:9002/students', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      console.log('data', data, response.status)
      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

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
    isSuccessOk: false,
    isElectionOn: "",
    hasVoted: false,
    IsSaved: false,
    IsEx:false,
    IsPassive:false
  },
  reducers: {
    clearState: state => {
      state.isError = false
      state.isSuccess = false
      state.isFetching = false
      state.notifies = []
      state.IsOld = true
      state.students = []
      state.Candidates = []
      state.isSuccessOk = false
      state.isElectionOn = ""
      state.hasVoted = false
      state.IsEx = false
      state.IsSaved = false
      state.IsPassive = false
      return state
    }
  },
  extraReducers: {
    [NewNotify.fulfilled]: (state, { payload }) => {
      console.log('payload', payload)
      state.isFetching = false
      state.isSuccess = true
    },
    [NewNotify.pending]: state => {
      state.isFetching = true
    },
    [NewNotify.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload
    },
    [VoteCandidateById.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true
      state.hasVoted = true
    },
    [VoteCandidateById.pending]: state => {
      state.isFetching = true
    },
    [VoteCandidateById.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload.message
    },
    [election.fulfilled]: (state, { payload }) => {

      state.isFetching = false
      state.isSuccess = true
      // console.log("ppp",payload.election.status);
      state.isElectionOn = payload.election.status
    },    
    [IsExpired.fulfilled]: (state, { payload }) => {
      state.IsEx = payload
      state.isFetching = false
      state.isSuccess = true
    },
    [election.pending]: state => {
      state.isFetching = true
    },
    [election.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload
    },
    [deleteNotifyById.fulfilled]: (state, { payload }) => {
      console.log('payload', payload)
      state.isFetching = false
      state.isSuccess = true
      state.isSuccessOk = true
    },
    [deleteNotifyById.pending]: state => {
      state.isFetching = true
    },
    [deleteNotifyById.rejected]: (state, { payload }) => {
      if (payload != undefined) {
        state.isError = true
        state.isFetching = false
        state.errorMessage = payload
        state.isSuccessOk = false
      } else {
        state.isFetching = false
        state.isSuccess = true
        state.isSuccessOk = true
      }
    },
    [NewCandidat.fulfilled]: (state, { payload }) => {
      console.log('payload', payload)
      state.isFetching = false
      state.isSuccess = true
      state.IsSaved = true
    },
    [NewCandidat.pending]: state => {
      state.isFetching = true
      state.isOld = null;
    },
    [NewCandidat.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true
      console.log(NewCandidat)
      state.errorMessage = payload.message
      state.isOld = null;
    },

    [studentIsPassive.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true
      state.IsPassive = payload.result
    },
    [studentIsPassive.pending]: state => {
      state.isFetching = true
      state.isOld = null;
    },
    [studentIsPassive.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true
      console.log(NewCandidat)
      state.errorMessage = payload.message
      state.IsPassive = null;
    },

    [loginUser.fulfilled]: (state, { payload }) => {
      //  state.username = payload.name;
      state.isFetching = false
      state.isSuccess = true
      // if(payload.IsOldPassword != undefined)
      // {
      state.isOld = payload
      // }

      return state
    },
    [loginUser.rejected]: (state, { payload }) => {
      //  console.log('payload', payload);
      state.isFetching = false
      state.isError = true
      //buraya müdehale
      console.log('DURUM:', payload)
      state.errorMessage = payload.message;
    },
    [updatePassword.pending]: state => {
      state.isFetching = true
      state.isError = false
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload.message
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true
      state.isError = false
    },
    [loginUser.pending]: state => {
      state.isFetching = true
    },


    [fetchUserBytoken.pending]: state => {
      state.isFetching = true
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true
      state.students = payload.students
      state.IsPassive = payload.students.status=="passive" ? true:false
      console.log("höööö",payload.students)

    },
    [fetchUserBytoken.rejected]: state => {
      console.log('fetchUserBytoken')
      state.isFetching = false
      state.isError = true
    },
    [fetchNotifyBytoken.pending]: state => {
      state.isFetching = true
    },
    [fetchNotifyBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true
      console.log(payload)
      state.notifies = payload.notifications
    },

    [fetchNotifyBytoken.rejected]: state => {
      console.log('fetchNotifyBytoken')
      state.isFetching = false
      state.isError = true
    },

    [fetchCandidateBytoken.pending]: state => {
      state.isFetching = true
    },

    [fetchCandidateBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true

      state.Candidates = payload.candidates

    },
    [fetchCandidateBytoken.rejected]: state => {
      console.log('fetchCandidateBytoken')
      state.isFetching = false
      state.isError = true
    }
  }
})

export const { clearState } = userSlice.actions

export const userSelector = state => state.user
