import React, { Fragment, useEffect, useState, setState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Modalir from './Modalir.js'
import toast from 'react-hot-toast'
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
  const initialState = {
    show: false
  }

  const [state, setState] = useState(initialState)

  const openModal = (grade1, gpa1, description1, name1, surname1, id1) =>
    setState({
      show: true,
      grade: grade1,
      gpa: gpa1,
      description: description1,
      name: name1,
      surname: surname1,
      ids: id1
    })
  const closeModal = () => setState({ show: false })
  const onFet = () =>
    dispatch(
      fetchCandidateBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  const onClear = () => dispatch(clearState())

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
    IsDel,
    Candidates,
    errorMessage
  } = useSelector(userSelector)
  useEffect(() => {
    if (isError) {
      if (errorMessage != undefined) {
        dispatch(clearState())
        toast.error(errorMessage)
        dispatch(
          fetchCandidateBytoken({
            token: localStorage.getItem('token'),
            department: 'admin'
          })
        )
      }
    }
    if (IsDel) {
      dispatch(clearState())
      dispatch(
        fetchCandidateBytoken({
          token: localStorage.getItem('token'),
          department: 'admin'
        })
      )
      closeModal()
    }
    if (IsOldpass) {
      dispatch(clearState())
      history.push('/update')
    }
  }, [IsDel, IsOldpass, isError])

  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
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

            <Modalir
              closeModal={closeModal}
              onClear={onClear}
              onFet={onFet}
              show={state.show}
              grade={state.grade}
              gpa={state.gpa}
              description={state.description}
              name={state.name}
              surname={state.surname}
              ids={state.ids}
            />
            <br />
            <br />
            <h3 style={{ marginTop: '30px' }}>Candidates</h3>
            <Table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  {isElectionOn == 'post-election' ? <th>Votes</th> : ''}
                </tr>
              </thead>
              <tbody>
                {data.map(function (d, idx) {
                  return (
                    <Fragment key={idx}>
                      <tr
                        onClick={() =>
                          openModal(
                            d.student.grade,
                            d.student.gpa,
                            d.description,
                            d.student.name,
                            d.student.surname,
                            d.id
                          )
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{d.studentId}</td>
                        <td>
                          {d.student.name} {d.student.surname}
                        </td>
                        {isElectionOn == 'post-election' ? (
                          <td>{d.votes}</td>
                        ) : (
                          ''
                        )}
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
export default Candidate
