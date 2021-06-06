import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isOldp, userSelector, fetchUserBytoken, clearState,sendActivationMail } from './UserSlice'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Table } from 'reactstrap'
import toast from 'react-hot-toast'
import LeftMenu from './LeftMenu'

const Dashboard = () => {
  const history = useHistory()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(isOldp())
    dispatch(fetchUserBytoken({ token: localStorage.getItem('token') }))
  }, [])
  const { IsOldpass, isFetching, isError, students,IsSend,errorMessage } = useSelector(userSelector)
  useEffect(() => {
    if (isError) {
     toast.error("Error:" + errorMessage)
    } 
    if (IsOldpass) {
     // toast.error("Error:" + errorMessage)
    //  dispatch(clearState())
   //   history.push('/update')
    }
    if(IsSend)
    {
      toast.success("Messages Sended");
    }
  }, [IsSend,IsOldpass, isError])
  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  const onBulkSubmit = () => {
    dispatch(sendActivationMail({url:"http://localhost:9002"}));
  };
  var divStyle = {
    marginRight: '10px',
    width: '100%'
  }
  const data = students
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
              className='bg-blue-500 mr-2 text-white font-bold py-2 px-4 rounded float-right'
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
            <button
              className='btn btn-primary py-2 px-4 rounded float-right'
              onClick={onBulkSubmit}
            >
              Send Activation Link
            </button>
            <br />
            <h3 style={{ marginTop: '30px' }}>Student List</h3>

            <Table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Status</th>
                  <th>Voted</th>
                </tr>
              </thead>
              <tbody>
                {data.map(function (d, idx) {
                  return (
                    <Fragment>
                      <tr>
                        <td>{d.studentId}</td>
                        <td>
                          {d.fullname}
                          <div
                            class='modal fade'
                            id={'exampleModal-' + d.id}
                            tabindex='-1'
                            aria-labelledby='exampleModalLabel'
                            aria-hidden='true'
                          ></div>
                        </td>
                        <td>{d.status}</td>
                        <td>{d.hasVoted}</td>
                      </tr>
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
