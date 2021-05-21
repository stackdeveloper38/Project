import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchUserBytoken, clearState } from './UserSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

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
  const data = students;
  return (
    <div className="container mx-auto mt-3">
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>
          <button onClick={onLogOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">
            Log Out
          </button>
          <div className="container mx-auto">
            <h3>Student List</h3>
          </div>

          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Status</th>
                <th>Password</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {data.map(function (d, idx) {
                return (
                  <Fragment>
                    <tr>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
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



 
        </Fragment>
      )}
    </div>
  );
};
export default Dashboard;