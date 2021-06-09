import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword, userSelector, clearState, isOldp } from './UserSlice'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
import LeftMenu from './LeftMenu'
const Update = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const {
    isPasswordChange,
    IsOld,
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    IsOldpass
  } = useSelector(userSelector)

  const onSubmit = data => {
    dispatch(clearState())
    dispatch(updatePassword(data))
  }
  useEffect(() => {
    dispatch(isOldp())
  }, [])
  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState())
    }
    if (isPasswordChange) {
      toast.success('Password Changed')
      dispatch(clearState())
    }
    if (isError) {
      toast.error(errorMessage)
      dispatch(clearState())
    }
    if (IsOldpass) {
      dispatch(clearState())
      history.push('/update')
    }
  }, [IsOldpass, isPasswordChange, IsOld, isSuccess, isError])
  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  return (
    <div className='container-fluid mx-auto vrrfdc h-100'>
      <Fragment>
        <div className='row vh-100 justify-content-center'>
          <div
            className='col-xs-12 pt-2'
            style={{ backgroundColor: '#3f51b5', height: '60px' }}
          >
            <button
              onClick={onLogOut}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right'
            >
              Log Out
            </button>
            <a
              href='/profile'
              className='bg-blue-500 mr-2 text-white font-bold py-2 px-4 rounded float-right'
            >
              Profile
            </a>
          </div>
          <div
            className='col-xs-12 col-md-2'
            style={{ height: '100%', backgroundColor: '#2b2b2b' }}
          >
            <LeftMenu />
          </div>
          <div
            className='col-xs-12 col-md-10'
            style={{ height: '100%', padding: '15px', backgroundColor: '#eee' }}
          >
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
                  className='form-group'
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
    </div>
  )
}
export default Update
