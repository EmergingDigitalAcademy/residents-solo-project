import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Table from 'react-bootstrap/Table';
import './AllResidentsInfo.css';
import moment from "moment";

function AllResidentsInfo() {
  const residents = useSelector((store) => store.residentsReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleResidentDischarge = (residentId) => {
    console.log(residentId);
    dispatch({
      type: "UPDATE_STATUS",
      payload: { resident_id: residentId },
    });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_RESIDENTS" });
  }, []);

  return (
    <div className="container">
      <h2>All Residents Info</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthday</th>
            <th>Date Admitted</th>
            <th>Term</th>
            <th>Status</th>
            <th>Discharge Resident</th>
            <th>Date Discharged</th>
            <th>Resident History</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((resident, i) => (
            <tr key={i}>
              <td>{resident.first_name}</td>
              <td>{resident.last_name}</td>
              <td>{moment(resident.birthday).format('MM/DD/YYYY')}</td>
              <td>{moment(resident.admitted_date).format('MM/DD/YYYY HH:mm:ss')}</td>
              <td>{resident.term}</td>
              <td>{resident.status}</td>
              <td id="discharge-btn">
                {resident.status === "Active" ? (
                  <button onClick={() => handleResidentDischarge(resident.id)}>
                    Discharge
                  </button>
                ) : (
                  ""
                )}
              </td>
              <td>{resident.discharge_date ? moment(resident.discharge_date).format('MM/DD/YYYY HH:mm:ss') : ''}</td>
              <td id="view-history-btn">
                <button
                  onClick={() =>
                    history.push(`/residents/view_history/${resident.id}`)
                  }
                >
                  View History
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AllResidentsInfo;
