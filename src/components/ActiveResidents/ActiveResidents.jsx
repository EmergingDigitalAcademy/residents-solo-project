import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './ActiveResidents.css';

function ActiveResidents() {
  const user = useSelector((store) => store.user);
  const residents = useSelector((store) => store.residentsReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_RESIDENTS" });
  }, []);

  return (
    <div className="container">
      <h2>Active Residents</h2>

      {residents
        .filter((r) => r.status !== "Discharged")
        .map((resident, i) => (
          <div className="active-residents" key={i}>
            <Card style={{ width: "200px", height: "auto"}}>
              <Card.Body
                onClick={() => {
                  history.push(`/tasks/${resident.id}`);
                }}
              >
                <Card.Img id="active-resident-img"
                  variant="top"
                  src="/images/default-profile-picture.jpg"
                />
                <Card.Text>
                  {resident.first_name} {resident.last_name}
                </Card.Text>
                <Card.Text>ID: {resident.room_number}</Card.Text>
                <Card.Text>{resident.birthday}</Card.Text>
              </Card.Body>
              {user.role === "admin" && (
                <Button
                  onClick={() =>
                    history.push(`/residents/housing/${resident.id}`)
                  }
                >
                  Assign Room
                </Button>
              )}
              {user.role === "admin" && (
                <Button
                  onClick={() =>
                    history.push(`/residents/allergies/${resident.id}`)
                  }
                >
                  Assign Allergies
                </Button>
              )}
            </Card>
          </div>
        ))}
    </div>
  );
}

export default ActiveResidents;
