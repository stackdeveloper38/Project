import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword, userSelector, clearState } from './UserSlice'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
const Update = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  )

  const onSubmit = data => {
    dispatch(updatePassword(data))
  }

  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState())
      history.push('/Dashboard')
    }
    if (isError) {
      toast.error(errorMessage)
      dispatch(clearState())
    }
  })
  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 mt-3'>
            <button
              onClick={onLogOut}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right'
            >
              Log Out
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} method='POST'>
            <div
              className='col-md-6 offset-md-3 col-xs-12 card'
              style={{
                marginTop: '100px',
                background: 'white',
                padding: '70px'
              }}
            >
              <div
                className='form-group d-none'
                style={{ marginTop: '30px', textAlign: 'left' }}
              >
                <small style={{ width: '100%' }}>Old Password</small>
                <div
                  className='input-group mb-3 input-group-sm'
                  style={{ marginTop: '10px' }}
                >
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      style={{ borderRadius: '0' }}
                    >
                      <i className='las la-user'></i>
                    </span>
                  </div>
                  <input
                    id='oldPassword'
                    name='oldPassword'
                    value='admin'
                    ref={register({ required: true })}
                    type='text'
                    autoComplete='oldPassword'
                    required
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group' style={{ textAlign: 'left' }}>
                <small style={{ width: '100%' }}>New Password</small>
                <div
                  className='input-group mb-3 input-group-sm'
                  style={{ marginTop: '10px' }}
                >
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      style={{ borderRadius: '0' }}
                    >
                      <i className='las la-key'></i>
                    </span>
                  </div>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    ref={register({ required: true })}
                    autoComplete='current-password'
                    required
                    className='form-control'
                  />
                  <div className='input-group-append'>
                    <span
                      className='input-group-text'
                      style={{ borderRadius: '0' }}
                    >
                      <i className='las la-user-secret'></i>
                    </span>
                  </div>
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-primary btn-block'
                style={{ marginTop: '15px' }}
              >
                {isFetching ? (
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                ) : null}
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
export default Update
