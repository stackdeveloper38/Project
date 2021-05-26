import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchUserBytoken, clearState } from './UserSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import toast from 'react-hot-toast';
import Header from './Header';
const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sendbulkmail = () => {
    // Github fetch library : https://github.com/github/fetch
    // Call the API page
    fetch('http://localhost:9002/sendbulkmail')
      .then((result) => {
        toast.success("Bulk Mail has been Send");
        return result.json();
      }).then((jsonResult) => {
        toast.error(jsonResult.message);
      })
  }
  useEffect(() => {
    dispatch(fetchUserBytoken({ token: localStorage.getItem('token') }));
  }, []);
  const { isFetching, isError, students } = useSelector(userSelector);
  const { username } = useSelector(userSelector);
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
  var divStyle = {
    marginRight: "10px"
  };
  const data = students;
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
                <button className="btn btn-primary py-2 px-4 rounded float-right" style={divStyle} onClick={sendbulkmail}>
                     Send Activation Link
                </button>
              </div>
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-md-3 col-xs-12">
                  <Header />
                  </div>
                  <div className="col-md-9 col-xs-12">
                  <div className="container mx-auto">
                  <h3>Student List</h3>
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>StudentId</th>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(function (d, idx) {
                      return (
                        <Fragment>
                          <tr>
                            <td>{d.studentId}</td>
                            <td>{d.id}</td>
                            <td>
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal-" + d.id}>
                                {d.name}
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
                                            <th>Gpa</th>
                                            <th>Grade</th>
                                            <th>hasVoted</th>
                                            <th>isCandidate</th>
                                            <th>primaryDepartment</th>
                                            <th>secondaryDepartment</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>{d.gpa}</td>
                                            <td>{d.grade}</td>
                                            <td>{d.hasVoted ? "Yes" : "No"}</td>
                                            <td>{d.isCandidate ? "Yes" : "No"}</td>
                                            <td>{d.primaryDepartment}</td>
                                            <td>{d.secondaryDepartment}</td>
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
                            <td>{d.surname}</td>
                            <td>{d.mail}</td>
                            <td>{d.status}</td>
                            <td>{d.password}</td>
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
export default Dashboard;