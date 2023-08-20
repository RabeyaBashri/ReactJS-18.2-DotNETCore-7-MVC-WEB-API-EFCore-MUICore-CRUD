import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ReactDOM from 'react-dom/client';

import ManageEmployeeForm from './ManageEmployeeForm';//MANAGEEMPLOYEE.JS WITH RAW HTML INPUT FORM CONTROL
import AddEmployeeBtn from './AddEmployeeBtn';
import { EntityState } from './EntityStateByAction.ts';
import { rootdivAddEmployeeBtn } from './rootEmployee';

////// CREATE & INITIALIZE Employee TABLE By Department CLASS
class EmployeeDataGridByDepartment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rootdivEmployeeTbl: props.rootdivEmployeeTbl,
            isLoaded: false,
            employees: [],
            departmentID: props.departmentID,
            columns: [
              /*  { field: 'id', headerName: 'ID',hideable: true },*/
                { field: 'Name', headerName: 'Name', width: 150 },
                { field: 'HiredOn', headerName: 'HiredOn', width: 120 },
                { field: 'Dob', headerName: 'Dob', width: 120 },
                { field: 'Email', headerName: 'Email', width: 160 },
                { field: 'ContactNo', headerName: 'Contact No', width: 120 },
                { field: 'Address', headerName: 'Address', width: 180 },
                { field: 'Position', headerName: 'Position', width: 180 },
                {
                    field: 'Action', headerName: '', width: 180,
                    renderCell: (params) => {
                        return (
                            <Stack spacing={2} direction="row">
                                <Button
                                    onClick={(e) => this.handleEdit(params.row.id,e)}
                                    variant="contained"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={(e) => this.handleDelete(params.row.id,e)}
                                    variant="contained"
                                >
                                    Delete
                                </Button>
                            </Stack>
                        );
                    }
                }
            ]
        }
    }

    componentDidMount() {
        rootdivAddEmployeeBtn.render(<AddEmployeeBtn departmentID={this.state.departmentID} rootdivEmployeeTbl={this.state.rootdivEmployeeTbl} />);
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
                    id: item.Id,
                    Name: item.Name,
                    HiredOn: new Date(item.HiredOn).toLocaleDateString('en-GB'),
                    Dob: new Date(item.Dob).toLocaleDateString('en-GB'),
                    Email: item.Email,
                    ContactNo: item.ContactNo,
                    Address: item.Address,
                    Position: item.Position//,
                    //Action: '<a href="#" onClick={(e) => this.handleEdit(item.Id, e)}>Edit</a><a href="#" onClick={(e) => this.handleDelete(item.Id, e)}> Delete</a> '
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
                    alert('Deleted successfully');
                   // this.fetchRemoteItems()
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

            if (emp.id == emdID) {
                editEmp = emp;
            }
        })
        let jsonStringEmployeeObj = JSON.stringify(editEmp);

        document.getElementById('divEmployeeByDept').style.display = 'none';
        document.getElementById('divManageEmployee').style.display = 'block';
       // this.state.rootdivEmployeeTbl.unmount();
        
        ReactDOM.createRoot(document.getElementById('divManageEmployee')).render(<ManageEmployeeForm action={EntityState.Update} departmentID={this.state.departmentID} employeeID={emdID} editEmp={editEmp} rootdivEmployeeTbl={this.state.rootdivEmployeeTbl } />);
        //ReactDOM.createRoot(document.getElementById('divGoToEmployeeTblBtn')).render(<GoToEmployeeTblBtn />);
        //ReactDOM.createRoot(document.getElementById('divClearFormDataBtn')).render(<ClearFormDataBtn />);
    }

    render() {
       
        return (
            <Box sx={{ height: 400, width: "100%" }}>

                <DataGrid
                   
                    rows={this.state.employees}
                    columns={this.state.columns}
                   
                initialState={
                    {
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }              }
                    pageSizeOptions={[5, 10]}

                />
            </Box>
        );
    }
}



export default EmployeeDataGridByDepartment;