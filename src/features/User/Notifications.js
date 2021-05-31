import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  userSelector,
  fetchNotifyBytoken,
  deleteNotifyById,
  clearState,
  NewNotify
} from './UserSlice'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'
import { Table } from 'reactstrap'
import toast from 'react-hot-toast'
import LeftMenu from './LeftMenu'
const Dashboard = () => {
  const { register, errors, handleSubmit } = useForm()
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }, [])
  const {
    isSuccessOk,
    isFetching,
    isError,
    notifies,
    errorMessage
  } = useSelector(userSelector)

  useEffect(() => {
    if (isSuccessOk) {
      dispatch(
        fetchNotifyBytoken({
          token: localStorage.getItem('token'),
          department: 'admin'
        })
      )
    }
    if (isError) {
      dispatch(clearState())
      toast.error(errorMessage)
    }
  }, [isSuccessOk, isError])
  const onSubmit = data => {
    dispatch(NewNotify(data))
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }
  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  const onDelete = Id => {
    dispatch(deleteNotifyById({ Id: Id }))
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }
  const data = notifies
  return (
    <div className='container-fluid mx-auto vrrfdc h-100'>
      {isFetching ? (
        <Loader type='Puff' color='#00BFFF' height={100} width={100} />
      ) : (
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
                className='bg-blue-500 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right'
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
              style={{
                height: '100%',
                padding: '15px',
                backgroundColor: '#eee'
              }}
            >
              <div
                className='btn btn-success float-right'
                data-bs-toggle='modal'
                data-bs-target='#exampleModal'
              >
                Create
              </div>
              <div
                class='modal fade'
                id='exampleModal'
                tabindex='-1'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div class='modal-dialog'>
                  <div class='modal-content'>
                    <div class='modal-header'>
                      <h5 class='modal-title' id='exampleModalLabel'>
                        New Notifications
                      </h5>
                      <button
                        type='button'
                        class='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div class='modal-body'>
                      <form onSubmit={handleSubmit(onSubmit)} method='POST'>
                        <div
                          className='form-group'
                          style={{ textAlign: 'left' }}
                        >
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
                              autocomplete='title'
                              required
                              ref={register({ required: true })}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div
                          className='form-group'
                          style={{ textAlign: 'left' }}
                        >
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
                        <button
                          type='submit'
                          className='btn btn-primary btn-block'
                          style={{ marginTop: '15px' }}
                        >
                          {isFetching ? (
                            <svg
                              class='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                            >
                              <circle
                                class='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                stroke-width='4'
                              ></circle>
                              <path
                                class='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                              ></path>
                            </svg>
                          ) : null}
                          Create
                        </button>
                      </form>
                    </div>
                    <div class='modal-footer'></div>
                  </div>
                </div>
              </div>
              <br />
              <h3 style={{ marginTop: '30px' }}>Notifications</h3>
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(function (d, idx) {
                    return (
                      <Fragment key={idx}>
                        <tr
                          data-bs-toggle='modal'
                          data-bs-target={'#exampleModal-' + d.id}
                          style={{ cursor: 'pointer' }}
                        >
                          <td>{d.title}</td>

                          <td>
                            <div
                              class='btn btn-danger'
                              onClick={() => onDelete(d.id)}
                            >
                              Delete
                            </div>
                          </td>
                        </tr>
                        <div
                          class='modal fade'
                          id={'exampleModal-' + d.id}
                          tabindex='-1'
                          aria-labelledby='exampleModalLabel'
                          aria-hidden='true'
                        >
                          <div class='modal-dialog modal-lg'>
                            <div class='modal-content'>
                              <div class='modal-header'>
                                <h5 class='modal-title' id='exampleModalLabel'>
                                  {d.title}
                                </h5>
                                <button
                                  type='button'
                                  class='btn-close'
                                  data-bs-dismiss='modal'
                                  aria-label='Close'
                                ></button>
                              </div>
                              <div class='modal-body'>
                                <table class='table table-striped'>
                                  <thead></thead>
                                  <tbody>
                                    <tr>
                                      <td>{d.content}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div class='modal-footer'></div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}
export default Dashboard
