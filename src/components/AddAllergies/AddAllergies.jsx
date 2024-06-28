import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./AddAllergies.css";
import { Card, Row, Col, ListGroup } from "react-bootstrap";

function AddRemoveAllergies() {
  const allergiesReducer = useSelector((store) => store.allergiesReducer);
  const residentAllergies = useSelector(
    (store) => store.residentAllergiesReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { resident_id } = params;
  console.log("allergies params", params);
  console.log("resident id params", resident_id);
  console.log("ALL ALLERGIES", residentAllergies);

  const handleAddAllergies = (selectAllergy) => {
    console.log(`${resident_id} has ${selectAllergy} `);
    dispatch({
      type: "ADD_ALLERGIES",
      payload: { resident_id, allergies: [selectAllergy] },
    });
  };

  const handleRemoveAllergies = (allergy) => {
    console.log(`${resident_id} does not ${allergy.id}`);
    console.log("ALL ALLERGIES", residentAllergies);
    const foundAllergyId = residentAllergies
      .filter((allergy) => Number(allergy.resident_id) === Number(resident_id))
      .filter((a) => Number(a.allergies_id) === Number(allergy.id))[0].id;
    if (foundAllergyId) {
      console.log("FOUND", foundAllergyId);
      dispatch({
        type: "DELETE_ALLERGY",
        payload: foundAllergyId,
      });
    } else {
      console.log("NOT FOUND", resident_id, allergy.id);
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_ALLERGIES" });
    dispatch({ type: "FETCH_RESIDENT_ALLERGIES" });
  }, []);

  return (
    <div className="container">
      <h2 className="AllergyTitle">Allergies</h2>
      <Row>
        <div>
          <button
            className="backbtnAllergy"
            onClick={() => history.push("/residents")}
          >
            Back to Active Residents
          </button>
        </div>
        <Col xs={12} md={5}>
          <Card style={{ border: "0" }}>
            <Card.Body>
              <Card.Title>Type of Allergies</Card.Title>
              <ListGroup style={{ width: "200px" }}>
                {allergiesReducer.map((allergy, i) => (
                  <div key={i}>
                    <ListGroup.Item className="listgrouptype">
                      <strong>{allergy.type}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>
                        {residentAllergies.some(
                          (ra) =>
                            Number(ra.resident_id) === Number(resident_id) &&
                            Number(ra.allergies_id) === Number(allergy.id)
                        ) ? (
                          <button
                            className="allergybtn"
                            onClick={() => handleRemoveAllergies(allergy)}
                          >
                            Remove Allergy
                          </button>
                        ) : (
                          <button
                            className="allergybtn"
                            onClick={() => handleAddAllergies(allergy)}
                          >
                            Add Allergy
                          </button>
                        )}
                      </div>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AddRemoveAllergies;
