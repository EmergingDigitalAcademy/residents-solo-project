import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function AssignResident() {
   const allergiesReducer = useSelector((store) => store.allergiesReducer);
   const residentAllergies = useSelector((store) => store.residentAllergiesReducer);
   const [selectAllergy, setSelectAllergy] = useState([]);
   const dispatch = useDispatch();
   const history = useHistory();
   const params = useParams();
   const { resident_id } = params
   console.log('allergies params', params);
   console.log('resident id params', resident_id);

const handleAddAllergies = (allergy) => {
    console.log(`${resident_id} has ${allergy.type} `)
    setSelectAllergy([...selectAllergy, allergy])
}

const handleRemoveAllergies = (allergy) => {
    console.log(`${resident_id} does not ${allergy.id}`)
    console.log('ALL ALLERGIES', residentAllergies);
    const foundAllergyId = residentAllergies.filter((allergy) => 
        Number(allergy.resident_id) === Number(resident_id)).filter((a) => Number(a.allergies_id) === Number(allergy.id))[0].id
    if (foundAllergyId) {
        console.log('FOUND', foundAllergyId);
dispatch ({
        type: 'DELETE_ALLERGY',
        payload: foundAllergyId
    })

    } else {
        console.log('NOT FOUND', resident_id, allergy.id);
    }
    // our payload should just be the id from the resident_allergies table
    
}

const submitAllergies = () => {
    console.log('resident id in add allergies', resident_id);
    console.log('selectAllergy', selectAllergy);
    dispatch({
        type: 'ADD_ALLERGIES',
        payload: {resident_id, allergies: selectAllergy}
    })
}

   useEffect(() => {
      dispatch({type: 'FETCH_ALLERGIES' })
      dispatch({type: 'FETCH_RESIDENT_ALLERGIES'})
   }, []);

   return (
      <div className="container">
         <h2>Allergies</h2>
         <pre>{JSON.stringify(selectAllergy)}</pre>

         {allergiesReducer.map((allergy, i) => <div key={i}>
                    <div>
                        type: {allergy.type}
                        <Button onClick={() => handleAddAllergies(allergy)}>Add Allergy</Button>
                        <Button onClick={() => handleRemoveAllergies(allergy)}>Remove Allergy</Button>
                    </div>
         </div>
        )
    }
    <Button onClick={submitAllergies}>Submit</Button>
   </div>
)}

export default AssignResident;