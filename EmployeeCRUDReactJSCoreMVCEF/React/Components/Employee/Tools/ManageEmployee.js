import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import { EntityState }  from './EntityStateByAction';
class ManageEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    }
                }
            )
        }
    }

    render() {
       
        return (
            <div id="divEmpForm">
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <label for="name">Name</label>
                    <input type="text" id="txtName" name="Name" placeholder="Name"
                        value={this.state.employee.Name}
                        onChange={this.handleNameChange} />
                    <label for="HiredOn">HiredOn</label>
                    <div>  <DatePicker
                        selected={(this.state.employee.HiredOn) ? new Date(this.state.employee.HiredOn) : new Date()}
                        onChange={this.handleHiredOnChange}
                        name="HiredOn"
                        dateFormat="MM/dd/yyyy" />
                    </div>
                    <label for="Dob">Dob</label>
                    <div>  <DatePicker
                        selected={(this.state.employee.Dob) ? new Date(this.state.employee.Dob):new Date()}
                        onChange={this.handleDobChange}
                        name="Dob"
                        dateFormat="MM/dd/yyyy" />
                    </div>
                    <label for="Email">Email</label>
                    <input type="text" id="txtEmail" name="Email" placeholder="Email"
                        value={this.state.employee.Email}
                        onChange={this.handleEmailChange} />

                    <label for="ContactNo">ContactNo</label>
                    <input type="text" id="txtContactNo" name="ContactNo" placeholder="ContactNo"
                        value={this.state.employee.ContactNo}
                        onChange={this.handleContactNoChange} />

                    <label for="Address">Address</label>
                    <input type="text" id="txtAddress" name="Address" placeholder="Address"
                        value={this.state.employee.Address}
                        onChange={this.handleAddressChange} />

                    <label for="Position">Position</label>
                    <input type="text" id="txtPosition" name="Position" placeholder="Position"
                        value={this.state.employee.Position}
                        onChange={this.handlePositionChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
export default ManageEmployee;