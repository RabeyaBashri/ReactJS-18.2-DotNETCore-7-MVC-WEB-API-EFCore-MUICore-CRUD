import React from 'react';
import ReactDOM from 'react-dom/client';
import ManageEmployee from './ManageEmployee';
import AddEmployeeBtn from './AddEmployeeBtn';
import { EntityState } from './EntityStateByAction.ts';


////// CREATE & INITIALIZE Employee TABLE By Department CLASS
class EmployeeTBLByDepartment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            employees: [],
            departmentID: props.departmentID
        }
    }

    componentDidMount() {
        ReactDOM.createRoot(document.getElementById('divAddEmployeeBtn')).render(<AddEmployeeBtn departmentID={this.state.departmentID} />);
        this.fetchRemoteItems();
    }

    fetchRemoteItems() {
        fetch("https://localhost:44335/api/CoreAPI/GetEmployeesByDepartment/" + this.state.departmentID)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setEmployees(result);
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    setEmployees(response) {
        if (response.returnStatus == 'Success') {
            let emps = JSON.parse(response.data);
            var employees = [];
            emps.forEach((item) => {
                let newItem = {
                    Id: item.Id,
                    Name: item.Name,
                    HiredOn: new Date(item.HiredOn).toLocaleDateString('en-GB'),
                    Dob: new Date(item.Dob).toLocaleDateString('en-GB'), 
                    Email: item.Email,
                    ContactNo: item.ContactNo,
                    Address: item.Address,
                    Position: item.Position
                }
                employees.push(newItem)
            });
            this.setState({
                isLoaded: true,
                employees: employees
            });
        }
        else {
            this.setState({
                isLoaded: false,
                error
            });
        }
    }

    handleDelete = (id, e) => {
        e.preventDefault();
        this.deleteRemoteItem(id);
    }

    deleteRemoteItem(emdID) {
        fetch('https://localhost:44335/api/CoreAPI/Delete/' + emdID, { method: 'DELETE' })
            .then(res => res.json())
            .then(
                () => {
                    this.fetchRemoteItems()
                }
            )
    }

    handleEdit = (id, e) => {
        e.preventDefault();
        this.editRemoteItem(id);
    }

    editRemoteItem(emdID) {
        let editEmp = new Object();
        this.state.employees.forEach(emp => {

            if (emp.Id == emdID) {
                editEmp = emp;
            }
        })
        let jsonStringEmployeeObj = JSON.stringify(editEmp);

        document.getElementById('divEmployeeByDept').style.visibility = 'hidden';
        document.getElementById('divManageEmployee').style.visibility = 'visible';
        ReactDOM.createRoot(document.getElementById('divManageEmployee')).render(<ManageEmployee action={EntityState.Update} departmentID={this.state.departmentID} employeeID={emdID} editEmp={editEmp} />);
        //ReactDOM.createRoot(document.getElementById('divGoToEmployeeTblBtn')).render(<GoToEmployeeTblBtn />);
        //ReactDOM.createRoot(document.getElementById('divClearFormDataBtn')).render(<ClearFormDataBtn />);
    }

    render() {
        let lists = [];
        if (this.state.isLoaded) {
            lists = this.state.employees.map((item) =>
                <tr key={item.Id}>
                    <td>{item.Name}</td>
                    <td>{item.HiredOn}</td>
                    <td>{item.Dob}</td>
                    <td>{item.Email}</td>
                    <td>{item.ContactNo}</td>
                    <td>{item.Address}</td>
                    <td>{item.Position}</td>
                    <td><a href="#" onClick={(e) => this.handleEdit(item.Id, e)}>Edit</a>
                        <a href="#" onClick={(e) => this.handleDelete(item.Id, e)}>Delete</a></td>
                </tr>
            );
        }
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Hired On</th>
                            <th>Date Of Birth</th>
                            <th>Email</th>
                            <th>ContactNo</th>
                            <th>Address</th>
                            <th>Position</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists}
                    </tbody>
                </table>
            </div>
        );
    }
}



export default EmployeeTBLByDepartment;