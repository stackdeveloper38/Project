import React, { Fragment, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {
  election,
  userSelector,
  fetchCandidateBytoken,
  clearState,
  VoteCandidateById,
  studentIsPassive,
  ApproveIt,
  IsExpired
} from './UserSlice'

import { useHistory } from 'react-router-dom'
import { Table } from 'reactstrap'
import LeftMenu from './LeftMenu'
import toast from 'react-hot-toast';

const Candidate = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { isError, Candidates,hasVoted,errorMessage,isSuccess,isElectionOn,IsEx, IsPassive } = useSelector(userSelector)
  useEffect(() => {
    dispatch(studentIsPassive())
    dispatch(election())
    dispatch(IsExpired())
  }, [])
  
  useEffect(() => {
    if (isError) {
      dispatch(clearState())
      toast.error(errorMessage)
    }
    if (hasVoted) {
      dispatch(clearState())
      toast.success("Vote Saved")
    }
    if(isSuccess){
      dispatch(
        fetchCandidateBytoken({
          token: localStorage.getItem('token'),
          department: ''
        })
      )
      if(IsEx){
        localStorage.removeItem('token')
        history.push('/login')
      }
      if(IsPassive){
        localStorage.removeItem('token')
        history.push('/login')
      }
    }
  }, [IsEx,isElectionOn,hasVoted,isError,isSuccess,IsPassive])
  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  const onVote = Id => {
    dispatch(VoteCandidateById({ Id: Id }))
    dispatch(
      fetchCandidateBytoken({
        token: localStorage.getItem('token'),
        department: ''
      })
    )
    dispatch(
      fetchCandidateBytoken({
        token: localStorage.getItem('token'),
        department: ''
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
              style={{ height: '100%', padding: '15px' }}>
             
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
                          aria-hidden='true'>
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
                            
                                <div
                                  class='btn btn-danger'
                                  onClick={() => onVote(d.id)}>
                                  Vote
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