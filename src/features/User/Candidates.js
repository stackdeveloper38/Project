import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { NewCandidat,userSelector, fetchCandidateBytoken, clearState, deleteCandidateById, ApproveIt } from './UserSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import LeftMenu from './LeftMenu';

const Candidate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  useEffect(() => {
    dispatch(fetchCandidateBytoken({ token: localStorage.getItem('token'), department: "admin" }));
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
    dispatch(deleteCandidateById({ Id: Id }));
    dispatch(fetchCandidateBytoken({ token: localStorage.getItem('token'), department: "admin" }));
  };
  const onApprove = (Id, what) => {
    console.log("kk");
    dispatch(ApproveIt({ token: localStorage.getItem('token'), Id: Id, what: what }));
    dispatch(fetchCandidateBytoken({ token: localStorage.getItem('token'), department: "admin" }));
  };

  const data = Candidates;
  return (
    <div className="container-fluid mx-auto vrrfdc h-100">
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>
          <div className="row vh-100 justify-content-center">
            <div className="col-xs-12 pt-2" style={{ backgroundColor: "#3f51b5", height: "60px" }}>
              <button onClick={onLogOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">
                Log Out
                </button>
              <a href="/profile" className="bg-blue-500 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">
                Profile
                </a>
            </div>
            <div className="col-xs-12 col-md-2" style={{ height: "100%", backgroundColor: "#2b2b2b" }}>
              <LeftMenu />
            </div>
            <div className="col-xs-12 col-md-10" style={{ height: "100%", padding: "15px" }}>

            <a className="btn btn-success float-right" href="/NewCandidate">New Candidate</a>

              <br />
              <h3 style={{ marginTop: "30px" }}>Candidates</h3>
              <Table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>StudentId</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>#</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(function (d, idx) {
                    return (
                      <Fragment key={idx}>
                        <tr style={{ backgroundColor: d.approved ? "lightgreen" : "white" }}>
                          <td>{d.id}</td>
                          <td>{d.studentId}</td>
                          <td>{d.name}</td>
                          <td>{d.surname}</td>
                          <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal-" + d.id}>
                              Detail
                            </button>
                            <div class="modal fade" id={"exampleModal-" + d.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">{d.name}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                    <table class="table table-striped">
                                      <thead>
                                        <tr>
                                          <th>Department</th>
                                          <th>Votes</th>
                                          <th>Description</th>
                                          <th>StartAt</th>
                                          <th>EndAt</th>
                                          <th>Approved</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>{d.department}</td>
                                          <td>{d.votes}</td>
                                          <td>{d.description}</td>
                                          <td>{d.startAt}</td>
                                          <td>{d.endAt}</td>
                                          <td>{d.approved ? <div className="btn btn-danger" onClick={() => onApprove(d.id, 0)}>Onaysız Yap</div> : <div class="btn btn-success" onClick={() => onApprove(d.id, 1)}>Onaylı Yap</div>}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>                     
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
        </Fragment>
      )}
    </div>
  );
};
export default Candidate;