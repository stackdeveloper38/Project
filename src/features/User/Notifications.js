import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import {
  userSelector,
  fetchNotifyBytoken,
  deleteNotifyById,
  clearState,
  IsExpired,
  NewNotify,
  studentIsPassive
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
    dispatch(studentIsPassive())
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }, [])
  const {
    IsEx,
    isSuccessOk,
    isFetching,
    isError,
    notifies,
    IsPassive,
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
    if(IsEx){
      localStorage.removeItem('token')
      history.push('/login')
    }
    if(IsPassive){
      localStorage.removeItem('token')
      history.push('/login')
    }
    if (isError) {
      dispatch(clearState())
      toast.error(errorMessage)
    }

  }, [IsEx,isSuccessOk, isError,IsPassive])
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
  useEffect(() => {
     dispatch(IsExpired())
  }, [])
  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  const onDelete = Id => {
    dispatch(deleteNotifyById({ Id: Id }))
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
              <Link
                to='/profile'
                className='bg-blue-500 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right'
              >
                Profile
              </Link>
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

              
              <br />
              <h3 style={{ marginTop: '30px' }}>Notifications</h3>
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {data.map(function (d, idx) {
                    return (
                      <Fragment key={idx}>
                        <tr
                          data-bs-toggle='modal'
                          data-bs-target={'#exampleModal-' + d.id}
                          style={{ cursor: 'pointer' }}>
                          <td>{d.title}</td>
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
      
    </div>
  )
}
export default Dashboard
