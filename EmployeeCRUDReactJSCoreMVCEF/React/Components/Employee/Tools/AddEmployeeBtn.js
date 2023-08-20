import React from 'react';
import ReactDOM from 'react-dom/client';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ManageEmployeeForm from './ManageEmployeeForm';//MANAGEEMPLOYEE.JS WITH RAW HTML INPUT FORM CONTROL
import { EntityState } from './EntityStateByAction.ts';


const  AddEmployeeBtn = (props) => {
    const handleClick = () => {
        document.getElementById('divEmployeeByDept').style.display = 'none';
        document.getElementById('divManageEmployee').style.display = 'block';
        ReactDOM.createRoot(document.getElementById('divManageEmployee')).render(<ManageEmployeeForm action={EntityState.Add} departmentID={props.departmentID} rootdivEmployeeTbl={props.rootdivEmployeeTbl} />);
    };

    return (
       /* <button type="button" onClick={handleClick}>Add Employee</button>*/
        <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleClick}>Add Employee</Button>
        </Stack>
    )

}

export default AddEmployeeBtn;