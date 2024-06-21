import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function AllResidentsInfo() {
  const user = useSelector((store) => store.user);
  const residents = useSelector((store) => store.residentsReducer);
  //    const [newResident, setNewResident] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { resident_id } = params;
  //    const {}

  const handleResidentDischarge = (residentId) => {
    console.log(residentId);
    dispatch({
      type: "UPDATE_STATUS",
      payload: { resident_id: residentId },
    });
    // console.log(params);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_RESIDENTS" });
  }, []);

  return (
    <div className="container">
      <h2>All Residents Info</h2>

      <table>
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
              <td>{resident.birthday}</td>
              <td>{resident.admitted_date}</td>
              <td>{resident.term}</td>
              <td>{resident.status}</td>
              <td>
                <button onClick={() => handleResidentDischarge(resident.id)}>
                  Discharge
                </button>
              </td>
              <td>{resident.discharge_date}</td>
              <td>
                <button>View History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllResidentsInfo;
