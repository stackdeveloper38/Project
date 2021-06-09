import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteCandidateById } from './UserSlice'
function Modalir (props) {
  const {
    show,
    closeModal,
    grade,
    gpa,
    description,
    name,
    surname,
    ids
  } = props
  const dispatch = useDispatch()
  const onDelete = () => {
    dispatch(deleteCandidateById({ Id: ids }))
  }
  return (
    <>
      <div className={show ? 'overlay' : 'hide'} onClick={closeModal} />
      <div className={show ? 'modalir' : 'hide'}>
        <button onClick={closeModal}>X</button>
        <h1>
          {name} {surname}
        </h1>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Grade</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{grade}</td>
              <td>{gpa}</td>
            </tr>
          </tbody>
        </table>
        <h3>Description</h3>
        <p>{description}</p>

        <div className='btn btn-danger' onClick={() => onDelete(ids)}>
          Reject
        </div>
      </div>
    </>
  )
}

export default Modalir
