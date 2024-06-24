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
   console.log('ALL ALLERGIES', residentAllergies);

const handleAddAllergies = (selectAllergy) => {
    console.log(`${resident_id} has ${selectAllergy} `)
    dispatch({
        type: 'ADD_ALLERGIES',
        payload: {resident_id, allergies: [selectAllergy]}
    })
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

// const submitAllergies = () => {
//     console.log('resident id in add allergies', resident_id);
//     console.log('selectAllergy', selectAllergy);
    
// }

   useEffect(() => {
      dispatch({type: 'FETCH_ALLERGIES' })
      dispatch({type: 'FETCH_RESIDENT_ALLERGIES'})
   }, []);

   return (
      <div className="container">
         <h2>Allergies</h2>

         {allergiesReducer.map((allergy, i) => <div key={i}>
                    <div>
                        type: {allergy.type}{ residentAllergies.some(
                     (ra) => Number(ra.resident_id) === Number(resident_id) && Number(ra.allergies_id) === Number(allergy.id)
                  )?(
                    <Button onClick={() => handleRemoveAllergies(allergy)}>Remove Allergy</Button>): (
                            <Button onClick={() => handleAddAllergies(allergy)}>Add Allergy</Button> )
                        }
                    </div>
         </div>
        )
    }
    {/* <Button onClick={submitAllergies}>Submit</Button> */}
    <div>
      <Button onClick={() => history.push('/residents')}>Back to Active Residents</Button>
    </div>
   </div>
)}

export default AssignResident;