import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import {
  election,
  getElectionStatus,
  userSelector,
  fetchCandidateBytoken,
  clearState,
  deleteCandidateById,
  ApproveIt,
  isOldp
} from './UserSlice'
import { useHistory } from 'react-router-dom'
import { Table } from 'reactstrap'
import LeftMenu from './LeftMenu'

const Candidate = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    
   dispatch(getElectionStatus())
    dispatch(isOldp())
    dispatch(
      fetchCandidateBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }, [])
  const {
    IsOldpass,
    isElectionOn,
    isError,
    Candidates,
    errorMessage
  } = useSelector(userSelector)
  useEffect(() => {
    if (isError) {
    
    if(errorMessage != undefined)
    {
      dispatch(clearState())
      toast.error(errorMessage);
      dispatch(
        fetchCandidateBytoken({
          token: localStorage.getItem('token'),
          department: 'admin'
        })
      )
    }
  }

  if (IsOldpass) {
      dispatch(clearState())
      history.push('/update')
    }
  }, [IsOldpass, isError])

  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }

  const onDelete = Id => {
    dispatch(deleteCandidateById({ Id: Id })) 
    window.location.reload()
  }

  const Election = () => {
    dispatch(election())    
    dispatch(getElectionStatus())
  }

  const onApprove = (Id, what) => {
    dispatch(
      ApproveIt({ token: localStorage.getItem('token'), Id: Id, what: what })
    )
    dispatch(
      fetchCandidateBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }

  const data = Candidates
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
            style={{ height: '100%', padding: '15px' }}
          >
            <div className='float-left'>
              <b>Current Stage:</b>
              <br />
              {isElectionOn == 'idle' ? (
                <p>Idle</p>
              ) : isElectionOn == 'pre-election' ? (
                <p>Pre-Election</p>
              ) : isElectionOn == 'peri-election' ? (
                <p>Voting</p>
              ) : (
                <p>Post-Election</p>
              )}
            </div>
            <div
              className='btn btn-warning float-right'
              onClick={() => Election()}
            >
              Next Stage
            </div>
            <br />
            <br />
            <h3 style={{ marginTop: '30px' }}>Candidates</h3>
            <Table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  {isElectionOn == 'post-election'?<th>Votes</th>:''}
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
                        <td>{d.studentId}</td>
                        <td>
                          {d.student.name} {d.student.surname}
                        </td>
                        {isElectionOn == 'post-election'?<td>{d.votes}</td>:''}
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
                                {d.student.name} {d.student.surname}
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
                                <thead>
                                  <tr>
                                    <th>Grade</th>
                                    <th>GPA</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{d.student.grade}</td>
                                    <td>{d.student.gpa}</td>
                                  </tr>
                                </tbody>
                              </table>
                              <h3>Description</h3>
                              <p>{d.description}</p>
                            </div>
                            <div class='modal-footer'>
                              <div class='btn btn-danger' onClick={() => onDelete(d.id)}>
                                Reject
                              </div>
                            </div>
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
export default Candidate