import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  election,
  userSelector,
  fetchCandidateBytoken,
  clearState,
  deleteCandidateById,
  ApproveIt,
  isOldp
} from './UserSlice'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'
import { Table } from 'reactstrap'
import LeftMenu from './LeftMenu'

const Candidate = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { register, errors, handleSubmit } = useForm()
  useEffect(() => {
    dispatch(isOldp());
    dispatch(
      fetchCandidateBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }, [])
  const { IsOldpass,isElectionOn,isFetching, isError, Candidates } = useSelector(userSelector)
  useEffect(() => {
    if (isError) {
      dispatch(clearState())
     // history.push('/login')
    }
    if(IsOldpass)  
    {
      dispatch(clearState())
       history.push('/update')
    }
  }, [IsOldpass,isError])
  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }


  const onDelete = Id => {
    dispatch(deleteCandidateById({ Id: Id }))
    dispatch(deleteCandidateById({ Id: Id }))
    dispatch(
      fetchCandidateBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
    dispatch(
      fetchCandidateBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }



  const Election = () => {
    dispatch(election())
    dispatch(
      fetchCandidateBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }


  const onApprove = (Id, what) => {
    console.log('kk')
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
              style={{ height: '100%', padding: '15px' }}
            >
              
                {isElectionOn=="passive"?<div className='btn btn-success float-right' onClick={() => Election()}>Start Election</div> : <div className='btn btn-danger float-right' onClick={() => Election()}>End Election</div>}             
           
              <br />
              <h3 style={{ marginTop: '30px' }}>Candidates</h3>

              <Table>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Full Name</th>
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
                          <td>{d.studentId}</td>
                          <td>
                            {d.student.name} {d.student.surname}
                          </td>
                          <td></td>
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
                                  onClick={() => onDelete(d.id)}
                                >
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
      )}
    </div>
  )
}
export default Candidate
