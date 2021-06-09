import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  NewCandidat,
  userSelector,
  clearState,
  IsExpired,
  studentIsPassive
} from './UserSlice'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
import LeftMenu from './LeftMenu'
import 'react-datepicker/dist/react-datepicker.css'
const Beacandidate = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const {
    isSuccess,
    isError,
    errorMessage,
    isSaved,
    IsEx,
    IsPassive
  } = useSelector(userSelector)

  const onSubmit = data => {
    dispatch(NewCandidat(data))
    dispatch(clearState())
  }

  useEffect(() => {
    dispatch(IsExpired())
    dispatch(studentIsPassive())
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState())
    }
    if (isError) {
      toast.error(errorMessage)
      dispatch(clearState())
    }
    if (isSaved) {
      toast.success('Saved')
      dispatch(clearState())
    }
    if (IsEx) {
      localStorage.removeItem('token')
      history.push('/login')
    }
    if (IsPassive) {
      localStorage.removeItem('token')
      history.push('/login')
    }
  })

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
                  marginTop: '5px',
                  background: 'white',
                  padding: '10px 25px'
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
                  <div style={{ fontSize: '24px' }}>Create Candidate</div>
                </div>

                <div className='form-group' style={{ textAlign: 'left' }}>
                  <small style={{ width: '100%' }}>Description</small>
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
                    <textarea
                      id='name'
                      name='description'
                      type='text'
                      autoComplete='name'
                      required
                      ref={register({ required: true })}
                      className='form-control'
                    ></textarea>
                  </div>
                </div>
                <button
                  type='submit'
                  className='btn btn-primary btn-block'
                  style={{ marginTop: '15px' }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    </div>
  )
}
export default Beacandidate
