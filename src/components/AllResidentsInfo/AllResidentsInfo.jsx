import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
                {resident.status === "Active" ? (
                  <button onClick={() => handleResidentDischarge(resident.id)}>
                    Discharge
                  </button>
                ) : (
                  ""
                )}
              </td>
              <td>{resident.discharge_date}</td>
              <td>
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
      </table>
    </div>
  );
}

export default AllResidentsInfo;
