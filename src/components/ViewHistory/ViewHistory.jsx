import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ViewHistory() {
  const residents = useSelector((store) => store.residentsReducer);
  const transactions = useSelector((store) => store.transactionReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  console.log("Resident Id ", params);

  const resident = residents?.filter((res) => res.id === id);
  console.log("resident", resident);

  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_TRANSACTIONS", payload: { resident_id: id } });
    dispatch({ type: "FETCH_RESIDENTS" });
  }, []);

  return (
    <div className="container">
      <h2>Resident History</h2>
      <div className="container">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text>
              {resident[0]?.first_name} {resident[0]?.last_name}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Button onClick={() => history.push("/allResidents")}>
          Back to All Residents
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Log Type</th>
            <th>Date</th>
            <th>Room Number</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, i) => (
            <tr key={i}>
              <td>{transaction.log_type}</td>
              <td>{transaction.date}</td>
              <td>{transaction.Room_Number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewHistory;
