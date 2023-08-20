import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
//REACT DATE PICKER WORKING VERSION
///FOR REACT DATEPICKER - INSTEAD OF 'VALUE', 'SELECTED' IS USED TO SET AND GET DATE VALUE
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import 'bootstrap/dist/css/bootstrap.min.css';

//MUI REACT DATE PICKER
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { EntityState } from './EntityStateByAction';
import EmployeeDataGridByDepartment from './EmployeeDataGridByDepartment';

class ManageEmployeeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootdivEmployeeTbl : props.rootdivEmployeeTbl,
            employee: (props.editEmp) ? props.editEmp : {},
            employeeID: props.employeeID,
            departmentID: props.departmentID,
            mode: props.action
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleHiredOnChange = this.handleHiredOnChange.bind(this);
        this.handleDobChange = this.handleDobChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleContactNoChange = this.handleContactNoChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.HandleGoToEmployeeList = this.HandleGoToEmployeeList.bind(this);
    }

    loadEmployeeGrid() {
        document.getElementById('divEmployeeByDept').style.display = 'block';
        document.getElementById('divManageEmployee').style.display = 'none';
       // const rootdivEmployeeTbl = ReactDOM.createRoot(document.getElementById('divEmployeeTbl'));
        //rootdivEmployeeTbl.unmount();
      // ReactDOM.createRoot(document.getElementById('divEmployeeTbl')).render(<EmployeeDataGridByDepartment departmentID={this.state.departmentID} />);
       // ReactDOM.render(<EmployeeDataGridByDepartment departmentID={this.state.departmentID} />, document.getElementById('divEmployeeTbl'));

        // ReactDOM.findDOMNode(document.getElementById('divEmployeeTbl')).unmount();
        this.state.rootdivEmployeeTbl.render(<EmployeeDataGridByDepartment departmentID={this.state.departmentID} />);
    }

    componentDidMount() {

    }

    handleNameChange(e) {
        this.setState((state, props) => {
            let employee = state.employee
            employee.Name = e.target.value;
            return { employee: employee }
        });
    }
    handleHiredOnChange(date2) {
        this.setState((state, props) => {
            let employee = state.employee
            employee.HiredOn = date2;
            return { employee: employee }
        });
    }
    handleDobChange(date1) {
        this.setState((state, props) => {
            let employee = state.employee
            employee.Dob = date1;
            return { employee: employee }
        });
    }
    handleEmailChange(e) {
        this.setState((state, props) => {
            let employee = state.employee
            employee.Email = e.target.value;
            return { employee: employee }
        });

    }
    handleContactNoChange(e) {
        this.setState((state, props) => {
            let employee = state.employee
            employee.ContactNo = e.target.value;
            return { employee: employee }
        });
    }
    handleAddressChange(e) {
        this.setState((state, props) => {
            let employee = state.employee
            employee.Address = e.target.value;
            return { employee: employee }
        });
    }
    handlePositionChange(e) {
        this.setState((state, props) => {
            let employee = state.employee
            employee.Position = e.target.value;
            return { employee: employee }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.state.employee.DepartmentId = this.state.departmentID;

        let jsonStringEmployeeObj = JSON.stringify(this.state.employee);

        if (this.state.mode == EntityState.Add) {
            fetch('https://localhost:44335/api/CoreAPI/Create', {
                method: 'Post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(jsonStringEmployeeObj)
            }).then(res => res.json())
                .then(
                    (result) => {
                        if (result.returnStatus == 'Success') {
                            alert('New Employee Added Sucessfully With ID : ' + JSON.parse(result.data).Id);
                        }
                    },
                    (error) => {
                    }
                )
        }
        else {
            fetch('https://localhost:44335/api/CoreAPI/Update/' + this.state.employeeID, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(jsonStringEmployeeObj)
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.returnStatus == 'Success') {
                            alert('Exisiting Employee Updated Sucessfully : ' + jsonStringEmployeeObj);
                            this.loadEmployeeGrid();
                        }
                    }
                )
        }
    }


    handleClearForm(e) {
        this.setState((state, props) => {
            let employee = state.employee
            employee.Name = '';
            employee.Email = '';
            employee.ContactNo = '';
            employee.Address = '';
            employee.HiredOn = '';
            employee.Dob = '';
            return { employee: employee }
        });
    }

    HandleGoToEmployeeList(e) {
        this.loadEmployeeGrid();
    }


    render() {
        return (
            <Box
                component="form"
                sx={{
                    width: 500,
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiTextField-root': { width: '70ch' }
                }}
                noValidate
                autoComplete="off"
            >

                <TextField fullWidth margin="normal" required id="txtName" label="Name" variant="standard" value={this.state.employee.Name} onChange={this.handleNameChange} />
               
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="HiredOn"
                        value={(this.state.employee.HiredOn) ? dayjs(new Date(this.state.employee.HiredOn)) : dayjs(new Date())}
                 
                    onChange={this.handleHiredOnChange}
                    />
                </LocalizationProvider>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Dob"
                        value={(this.state.employee.Dob) ? dayjs(new Date(this.state.employee.Dob)) : dayjs(new Date())}
                    onChange={this.handleDobChange}
                    />
                </LocalizationProvider>
                <TextField fullWidth margin="normal" required id="txtEmail" label="Email" variant="standard" value={this.state.employee.Email}
                    onChange={this.handleEmailChange} />
                <TextField fullWidth margin="normal" required id="txtContactNo" label="ContactNo" variant="standard" value={this.state.employee.ContactNo}
                    onChange={this.handleContactNoChange} />
                <TextField fullWidth margin="normal" required id="txtAddress" label="Address" variant="standard" value={this.state.employee.Address}
                    onChange={this.handleAddressChange} />
                <TextField fullWidth margin="normal" required id="txtPosition" label="Position" variant="standard" value={this.state.employee.Position}
                    onChange={this.handlePositionChange} />
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={(e) => this.onSubmit(e)}>Save</Button>
                    <Button variant="contained" onClick={this.handleClearForm}>Clear Form</Button>
                    <Button variant="contained" onClick={this.HandleGoToEmployeeList}>Go To Employee List</Button>
                </Stack>
            </Box>
        );
    }
}
export default ManageEmployeeForm;