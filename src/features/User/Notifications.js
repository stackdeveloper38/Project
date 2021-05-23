import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchNotifyBytoken, clearState } from './UserSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import Header from './Header';
const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotifyBytoken({ token: localStorage.getItem('token'),department:"admin" }));
  }, []);
  const { isFetching, isError, notifies } = useSelector(userSelector);
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

  const data = notifies;
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
                <a href="/NewNotification" className="btn btn-success float-right" style={{marginRight:"15px"}}>
                  Create Notification
                </a>
              </div>
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-md-3 col-xs-12">
                  <Header />
                  </div>
                  <div className="col-md-9 col-xs-12">
                  <div className="container mx-auto">
                  <h3>Notifications</h3>
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(function (d, idx) {
                      return (
                        <Fragment key={idx}>
                          <tr >
                            <td>{d.id}</td>
                            <td>{d.title}</td>
                            <td>{d.content}</td>
                            <td>{d.department}</td>
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