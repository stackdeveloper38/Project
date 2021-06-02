import React, { Fragment, useEffect,useState } from 'react'
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom";
import {
  userSelector,
  fetchNotifyBytoken,
  deleteNotifyById,
  clearState,
  NewNotify,
  isOldp
} from './UserSlice'
import { useHistory } from 'react-router-dom'
import { Table } from 'reactstrap'
import toast from 'react-hot-toast'
import LeftMenu from './LeftMenu'
const Dashboard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, errors, handleSubmit } = useForm()
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(isOldp())
    console.log("jj")
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }, [])
  const {
    isSuccessOk,
    isFetching,
    isError,
    notifies,
    errorMessage,
    IsOldpass
  } = useSelector(userSelector)

  useEffect(() => {
    dispatch(isOldp())
    if (isSuccessOk) {
      dispatch(
        fetchNotifyBytoken({
          token: localStorage.getItem('token'),
          department: 'admin'
        })
      )
    }
    if (isError) {
      dispatch(clearState())
      toast.error(errorMessage)
    }
    if (IsOldpass) {
      dispatch(clearState())
      history.push('/update')
    }
  }, [IsOldpass, isSuccessOk, isError])

  const onSubmit = data => {
    dispatch(NewNotify(data))
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
    setShow(false)
  }

  const onLogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  const onDelete = Id => {
    dispatch(deleteNotifyById({ Id: Id }))
    dispatch(deleteNotifyById({ Id: Id }))
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
    dispatch(
      fetchNotifyBytoken({
        token: localStorage.getItem('token'),
        department: 'admin'
      })
    )
  }
  const data = notifies
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
              className='bg-blue-500 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right'
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
            style={{
              height: '100%',
              padding: '15px',
              backgroundColor: '#eee'
            }}>

<Button variant="primary" onClick={handleShow} style={{ float:"right"}}>
        Create
</Button>


<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form onSubmit={handleSubmit(onSubmit)} method='POST'>
                      <div className='form-group' style={{ textAlign: 'left' }}>
                        <small style={{ width: '100%' }}>Title</small>
                        <div
                          className='input-group mb-3 input-group-sm'
                          style={{ marginTop: '10px' }}>
                          <div className='input-group-prepend'>
                            <span
                              className='input-group-text'
                              style={{ borderRadius: '0' }}>
                              <i className='las la-envelope'></i>
                            </span>
                          </div>
                          <input
                            id='title'
                            name='title'
                            type='title'
                            autocomplete='title'
                            required
                            ref={register({ required: true })}
                            className='form-control'/>
                        </div>
                      </div>
                      <div className='form-group' style={{ textAlign: 'left' }}>
                        <small style={{ width: '100%' }}>Content</small>
                        <div
                          className='input-group mb-3 input-group-sm'
                          style={{ marginTop: '10px' }}>
                          <div className='input-group-prepend'>
                            <span
                              className='input-group-text'
                              style={{ borderRadius: '0' }}>
                              <i className='las la-envelope'></i>
                            </span>
                          </div>
                          <input
                            id='content'
                            name='content'
                            type='content'
                            ref={register({ required: true })}
                            autoComplete='department'
                            required
                            className='form-control'
                          />
                        </div>
                      </div>
                      <button
                        type='submit'
                        className='btn btn-primary btn-block'
                      
                        style={{ marginTop: '15px' }}>
                        Create
                      </button>
                    </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>




   
            
            <br />
            <h3 style={{ marginTop: '30px' }}>Notifications</h3>
            <Table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {data.map(function (d, idx) {
                  return (
                    <Fragment key={idx}>
                      <tr>
                        <td  data-bs-toggle='modal'
                        data-bs-target={'#exampleModal-' + d.id}
                        style={{ cursor: 'pointer' }}>{d.title}</td>
                        <td>
                          <div
                            class='btn btn-danger'
                            onClick={() => onDelete(d.id)}>
                            Delete
                          </div>
                        </td>
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
                                {d.title}
                              </h5>
                              <button
                                type='button'
                                class='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'></button>
                            </div>
                            <div class='modal-body'>
                              <table class='table table-striped'>
                                <thead></thead>
                                <tbody>
                                  <tr>
                                    <td>{d.content}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div class='modal-footer'></div>
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
    </div>
  )
}
export default Dashboard