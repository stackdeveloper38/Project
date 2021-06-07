import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState,forgotpassworduser } from './UserSlice';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';


const Forgotpassword = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();
  const { isOld, isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  
  const onSubmit = (data) => {
    dispatch(forgotpassworduser(data));  
  };
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    console.log("kkkk");

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    } 
    if (isSuccess) {         
        if(isOld != null && isOld.isOldPassword)
        {
          history.push('/update');
        }
        else{
          history.push('/Dashboard');
        }        
         dispatch(clearState());    
       } 
  }, [isOld, isError, isSuccess]);
  return (
<Fragment>
<div className="container">
      <div className="row">
          <div class="col-xs-12">
              <h3>Forgot Password</h3>
          </div>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">       
          <div className="col-md-6 offset-md-3 col-xs-12 card" style={{ marginTop: "100px", background: "white", padding: "0 20px 20px 20px" }}>
            <div className="form-group" style={{ marginTop: "30px",textAlign:"left" }}>
              <small style={{ width: "100%" }}>Email</small>
              <div className="input-group mb-3 input-group-sm" style={{ marginTop: "10px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ borderRadius: "0" }}><i className="las la-user"></i></span>
                </div>
                <input id="email" name="email"  ref={register({ required: true })} type="text" autoComplete="email" required className="form-control" />
              </div>
            </div>
            <div style={{textAlign: "left"}}>
            </div> 
            <div class="row">
                <div className="col-xs-12">
                 <button type="submit" className="btn btn-success btn-block" style={{width:"100%"}}>
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
                   Submit
                 </button>
                </div>
            </div>
          </div>
        </form>
      </div>
    </div> 
    </Fragment>
  );
};
export default Forgotpassword;
