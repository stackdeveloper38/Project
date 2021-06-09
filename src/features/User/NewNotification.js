import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { NewNotify, userSelector, clearState } from './UserSlice'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'

const NewNotification = () => {
  const dispatch = useDispatch()
  const { register, errors, handleSubmit } = useForm()
  const history = useHistory()

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  )

  const onSubmit = data => {
    dispatch(NewNotify(data))
  }

  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState())
      history.push('/Notifications')
    }

    if (isError) {
      toast.error(errorMessage)
      dispatch(clearState())
    }
  }, [isSuccess, isError])
  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12'>
            <button
              onClick={onLogOut}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-3 rounded float-right'
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
                style={{
                  borderLeft: '4px solid #70bbfd',
                  paddingLeft: '15px',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '24px' }}>Create Notification</div>
              </div>
              <div className='form-group' style={{ textAlign: 'left' }}>
                <small style={{ width: '100%' }}>Title</small>
                <div
                  className='input-group mb-3 input-group-sm'
                  style={{ marginTop: '10px' }}
                >
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      style={{ borderRadius: '0' }}
                    >
                      <i className='las la-envelope'></i>
                    </span>
                  </div>
                  <input
                    id='title'
                    name='title'
                    type='title'
                    autoComplete='title'
                    required
                    ref={register({ required: true })}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group' style={{ textAlign: 'left' }}>
                <small style={{ width: '100%' }}>Content</small>
                <div
                  className='input-group mb-3 input-group-sm'
                  style={{ marginTop: '10px' }}
                >
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      style={{ borderRadius: '0' }}
                    >
                      <i className='las la-envelope'></i>
                    </span>
                  </div>
                  <input
                    id='content'
                    name='content'
                    type='content'
                    ref={register({ required: true })}
                    autoComplete='department'
                    required
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group' style={{ textAlign: 'left' }}>
                <small style={{ width: '100%' }}>Department</small>
                <div
                  className='input-group mb-3 input-group-sm'
                  style={{ marginTop: '10px' }}
                >
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      style={{ borderRadius: '0' }}
                    >
                      <i className='las la-envelope'></i>
                    </span>
                  </div>
                  <input
                    id='department'
                    name='department'
                    type='department'
                    ref={register({ required: true })}
                    autoComplete='department'
                    required
                    value='admin'
                    className='form-control'
                  />
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
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default NewNotification
