import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchUserBytoken, clearState } from './UserSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import toast from 'react-hot-toast';
import LeftMenu from './LeftMenu';

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sendbulkmail = () => {
    fetch('http://localhost:9002/sendbulkmail')
      .then((result) => {
        toast.success("Bulk Mail has been Send");
        return result.json();
      }).then((jsonResult) => {
        toast.error(jsonResult.message);
      })
  }
  useEffect(() => { dispatch(fetchUserBytoken({ token: localStorage.getItem('token') })); }, []);
  const { isFetching, isError, students } = useSelector(userSelector);
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
    marginRight: "10px",
    width:"100%"
  };
  const data = students;
  return (
    <div className="container-fluid mx-auto vrrfdc h-100">
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>       
            <div className="row vh-100 justify-content-center">
            <div className="col-xs-12 pt-2" style={{backgroundColor:"#3f51b5",height:"60px"}}>
                <button onClick={onLogOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">
                    Log Out
                </button>
                <a href="/profile" className="bg-blue-500 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">
                    Profile
                </a>
            </div>
              <div className="col-xs-12 col-md-2" style={{height:"100%",backgroundColor:"#2b2b2b"}}>
                <LeftMenu />
              </div>
              <div className="col-xs-12 col-md-10" style={{height:"100%",padding:"15px",backgroundColor:"#eee"}}>
              <button className="btn btn-primary py-2 px-4 rounded float-right" style={divStyle} onClick={sendbulkmail}>
                     Send Activation Link
                </button>
                <br/>
                <h3 style={{marginTop:"30px"}}>
                  Student List
                </h3>

                <Table>
                  <thead>
                    <tr>
                      <th>StudentId</th>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Status</th>
                      <th>#</th>          
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(function (d, idx) {
                      return (
                        <Fragment>
                          <tr>
                            <td>{d.studentId}</td>
                            <td>   
                              {d.name}
                              <div class="modal fade" id={"exampleModal-" + d.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel">{d.name}</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">


                                    <dl class="row">
                                       <dt class="col-sm-3 text-left">Gpa</dt>
                                       <dd class="col-sm-9 text-left">: {d.Gpa}</dd>

                                       <dt class="col-sm-3 text-left">Grade</dt>
                                       <dd class="col-sm-9 text-left">: {d.Grade}</dd>
                                  

                                      <dt class="col-sm-3 text-left">hasVoted</dt>
                                      <dd class="col-sm-9 text-left">: {d.hasVoted}</dd>

                                      <dt class="col-sm-3 text-left">isCandidate</dt>
                                      <dd class="col-sm-9 text-left">: {d.isCandidate}</dd>

                                      <dt class="col-sm-3 text-left">primaryDepartment</dt>
                                      <dd class="col-sm-9 text-left">: {d.primaryDepartment}</dd>

                                      <dt class="col-sm-3 text-left">secondaryDepartment</dt>
                                      <dd class="col-sm-9 text-left">: {d.secondaryDepartment}</dd>
                                    </dl>

                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{d.surname}</td>
                            <td>{d.status}</td>  
                            <td>
                               <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal-" + d.id}>
                                  Detail
                               </button>
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
export default Dashboard;