import React, { Fragment, useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { NewCandidat, userSelector, clearState } from './UserSlice';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import DateTimePicker from 'react-datetime-picker';
import "react-datepicker/dist/react-datepicker.css";
const NewCandidate = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [value, onChange] = useState(new Date());
  const [value2, onChange2] = useState(new Date());
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  const onSubmit = (data) => {
    dispatch(NewCandidat(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push('/Candidates');
    }
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);
  const onLogOut = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };
  return (
    <Fragment>
     <div className="container">
      <div className="row">
      <div className="col-xs-12">
        <button onClick={onLogOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-3 rounded float-right">
           Log Out
        </button>
        <a href="/candidates" className="btn btn-success mt-3 mr-2 float-right">
           Candidates List
        </a>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">       
          <div className="col-md-6 offset-md-3 col-xs-12 card" style={{ marginTop: "100px", background: "white", padding: "70px" }}>
            <div style={{ borderLeft: "4px solid #70bbfd", paddingLeft: "15px", width: "100%",textAlign:"left" }}>
              <div style={{ fontSize: "24px" }}>Create Candidate</div>
            </div>
            <div className="form-group" style={{textAlign:"left"}}>
              <small style={{ width: "100%" }}>StudentId</small>
              <div className="input-group mb-3 input-group-sm" style={{ marginTop: "10px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ borderRadius: "0" }}><i className="las la-envelope"></i></span>
                </div>
                <input
                    id="studentId"
                    name="studentId"
                    type="number"
                    autocomplete="studentId"
                    required
                    ref={register({ required: true })}
                    className="form-control" />             
              </div>
            </div>
            <div className="form-group" style={{textAlign:"left"}}>
              <small style={{ width: "100%" }}>Name</small>
              <div className="input-group mb-3 input-group-sm" style={{ marginTop: "10px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ borderRadius: "0" }}><i className="las la-envelope"></i></span>
                </div>
                <input
                    id="name"
                    name="name"
                    type="text"
                    autocomplete="name"
                    required
                    ref={register({ required: true })}
                    className="form-control" />             
              </div>
            </div>
            <div className="form-group" style={{textAlign:"left"}}>
              <small style={{ width: "100%" }}>Surname</small>
              <div className="input-group mb-3 input-group-sm" style={{ marginTop: "10px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ borderRadius: "0" }}><i className="las la-envelope"></i></span>
                </div>
                <input
                    id="surname"
                    name="surname"
                    type="text"
                    autocomplete="Surname" 
                    required
                    ref={register({ required: true })}
                    className="form-control" />              
              </div>
            </div>
            <div className="form-group" style={{textAlign:"left"}}>
              <small style={{ width: "100%" }}>Department</small>
              <div className="input-group mb-3 input-group-sm" style={{ marginTop: "10px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ borderRadius: "0" }}><i className="las la-envelope"></i></span>
                </div>
                <input
                    id="department"
                    name="department"
                    type="text"
                    autocomplete="department"
                    required
                    value="admin"
                    ref={register({ required: true })}
                    className="form-control" />             
              </div>
            </div>
            <div className="form-group" style={{textAlign:"left"}}>
              <small style={{ width: "100%" }}>Votes</small>
              <div className="input-group mb-3 input-group-sm" style={{ marginTop: "10px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ borderRadius: "0" }}><i className="las la-envelope"></i></span>
                </div>
                <input
                    id="votes"
                    name="votes"
                    type="number"
                    autocomplete="votes"
                    required
                    ref={register({ required: true })}
                    className="form-control" />             
              </div>
            </div>
            <div className="form-group" style={{textAlign:"left"}}>
              <small style={{ width: "100%" }}>Description</small>
              <div className="input-group mb-3 input-group-sm" style={{ marginTop: "10px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ borderRadius: "0" }}><i className="las la-envelope"></i></span>
                </div>
                <input
                    id="description"
                    name="description"
                    type="text"
                    autocomplete="description"
                    required
                    ref={register({ required: true })}
                    className="form-control" />             
              </div>
            </div>
            <div className="form-group" style={{textAlign:"left"}}>
              <small style={{ width: "100%" }}>Approved</small>
              <div className="input-group mb-3 input-group-sm" style={{ marginTop: "10px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ borderRadius: "0" }}><i className="las la-envelope"></i></span>
                </div>
         <select className="form-control" name="approved"  ref={register({ required: true })}>
           <option value="true" selected="selected">Yes</option>
            <option value="false">No</option>
        </select>            
              </div>
            </div>
            <div className="form-group" style={{textAlign:"left"}}>
              <small style={{ width: "100%" }}>Başlama Tarihi</small>
              <div className="input-group mb-3 input-group-sm" style={{ marginTop: "10px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ borderRadius: "0" }}><i className="las la-envelope"></i></span>
                </div>
                <input type="text" class="form-control alldates" name="startAt" ref={register({ required: true })}/> 
              </div>
            </div>
            <div className="form-group" style={{textAlign:"left"}}>
              <small style={{ width: "100%" }}>Bitiş Tarihi</small>
              <div className="input-group mb-3 input-group-sm" style={{ marginTop: "10px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ borderRadius: "0" }}><i className="las la-envelope"></i></span>
                </div>
               <input type="text" class="form-control alldates" name="endAt" ref={register({ required: true })}/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block"  style={{marginTop:"15px"}}>
                  {isFetching ? (
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  Create
            </button>
          </div>
        </form>
      </div>
    </div> 
  </Fragment>
 );
};

export default NewCandidate;