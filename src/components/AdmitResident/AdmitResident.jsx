import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AdmitResident() {
  //    const residents = useSelector((store) => store.residentsReducer);
  const initialResident = {
    image: "image.png",
    first_name: "",
    last_name: "",
    birthday: "",
    term: "",
  };
  const [newResident, setNewResident] = useState(initialResident);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('NEW RESIDENT', newResident)
    dispatch({
      type: "ADD_RESIDENTS",
      payload: newResident,
    });
    setNewResident(initialResident);
  };

  const handleTerm = (event) => {
    console.log("What term?", event.target.id);
    let updateResident = { ...newResident };
    if (event.target.id === "short") {
      updateResident.term = "short-term";
    } else {
      updateResident.term = "long-term";
    }
    setNewResident(updateResident);
  };

  //    useEffect(() => {
  //       dispatch({type: 'FETCH_RESIDENTS'})
  //    }, []);

  return (
    <div className="container">
      <h2>Admit Resident</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setNewResident({...newResident, first_name: e.target.value})}
          value={newResident.first_name}
          placeholder="First Name"
        />
        <input
          onChange={(e) => setNewResident({...newResident, last_name: e.target.value})}
          value={newResident.last_name}
          placeholder="Last Name"
        />
        <input
          onChange={(e) => setNewResident({...newResident, birthday: e.target.value})}
          value={newResident.birthday}
          placeholder="Birthday"
        />
        <input
          onChange={(e) => setNewResident({...newResident, image: e.target.value})}
          value={newResident.image}
          placeholder="Image"
        />
        <button type="button" id="short" onClick={handleTerm}>
          Short Term
        </button>
        <button type="button" id="long" onClick={handleTerm}>
          Long Term
        </button>
        <button type="submit">Add Resident</button>
      </form>
    </div>
  );
}

export default AdmitResident;
