import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchCandidateBytoken, clearState, deleteCandidateById,ApproveIt } from './UserSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import Header from './Header';

const Candidate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCandidateBytoken({ token: localStorage.getItem('token'),department:"admin" }));
  }, []);

  const { isFetching, isError, Candidates } = useSelector(userSelector);
  useEffect(() => {
 
    if (isError) {
      dispatch(clearState());
      history.push('/login');
    }
  }, [isError]);
  const onLogOut = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };
  const onDelete = Id => {
    dispatch(deleteCandidateById({Id:Id})); 
    dispatch(fetchCandidateBytoken({ token: localStorage.getItem('token'),department:"admin" }));
  };
  const onApprove = (Id,what) => {
    dispatch(ApproveIt({ token: localStorage.getItem('token'),Id:Id,what:what }));
    dispatch(fetchCandidateBytoken({ token: localStorage.getItem('token'),department:"admin" }));
  };
  const data = Candidates;
  return (
    <div className="container mx-auto mt-3">
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>      
          <div className="Container">
            <div className="row">
              <div className="col-xs-12">
                <button onClick={onLogOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">
                  Log Out
                </button>
                <a href="/NewCandidate" className="btn btn-success float-right" style={{marginRight:"15px"}}>
                  Create Candidates
                </a>
              </div>
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-md-3 col-xs-12">
                  <Header />
                  </div>
                  <div className="col-md-9 col-xs-12">
                  <div className="container mx-auto">
                  <h3>Candidates</h3>
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>StudentId</th>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Department</th>
                      <th>Votes</th>
                      <th>Description</th>
                      <th>Approved</th>
                      <th>StartAt</th>
                      <th>EndAt</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(function (d, idx) {
                      return (
                        <Fragment key={idx}>
                          <tr>
                            <td>{d.id}</td>
                            <td>{d.studentId}</td>
                            <td>{d.name}</td>
                            <td>{d.surname}</td>
                            <td>{d.department}</td>
                            <td>{d.votes}</td>
                            <td>{d.description}</td>
                            <td>{d.approved?<div class="btn btn-danger" onClick={() => onApprove(d.id,0)}>Onaysız Yap</div>:<div class="btn btn-success" onClick={() => onApprove(d.id,1)}>Onaylı Yap</div>}</td>
                            <td>{d.startAt}</td>
                            <td>{d.endAt}</td>
                            <td>
                              <div class="btn btn-danger" onClick={() => onDelete(d.id)}>
                                  Delete
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default Candidate;