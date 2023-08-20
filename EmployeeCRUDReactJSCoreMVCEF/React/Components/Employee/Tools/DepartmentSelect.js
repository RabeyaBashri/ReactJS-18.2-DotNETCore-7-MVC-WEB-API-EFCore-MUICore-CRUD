//IMPORT CORE REACT
import React from 'react';

//IMPORT SELECT CONTROL
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//IMPORT TOOLS
//import EmployeeTBLByDepartment from './EmployeeTBLByDepartment';//RAW BASIC HTML TABLE
import EmployeeDataGridByDepartment from './EmployeeDataGridByDepartment';//REACT DATAGRID MATERIAL UI COMPONENT
import { rootdivEmployeeTbl } from './rootEmployee';

////// CREATE & INITIALIZE DEPARTMENT LIST CLASS
class DepartmentSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            departments: [],
            selectedDepartmentID: ''
        }

        this.onChangedepartment = this.onChangedepartment.bind(this);
    }

    componentDidMount() {
        this.fetchRemoteItems();
    }

    fetchRemoteItems() {

        fetch("https://localhost:44335/api/CoreAPI/GetDepartments")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setDepartments(result);
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    setDepartments(response) {
        if (response.returnStatus == 'Success') {
            let depts = JSON.parse(response.data);
            var departments = [];
            depts.forEach((item) => {
                let newItem = {
                    id: item.Id,
                    name: item.Name
                }
                departments.push(newItem)
            });
            this.setState({
                isLoaded: true,
                departments: departments
            });
        }
        else {
            this.setState({
                isLoaded: false,
                error
            });
        }
    }

    onChangedepartment(e) {

        let selectedDepartmentID = e.target.value;
        this.setState({
            selectedDepartmentID: selectedDepartmentID

        });
       
        document.getElementById('divEmployeeByDept').style.display = 'block';
        document.getElementById('divManageEmployee').style.display = 'none';
        rootdivEmployeeTbl.render(<EmployeeDataGridByDepartment departmentID={selectedDepartmentID} rootdivEmployeeTbl={rootdivEmployeeTbl} />);

    }

    render() {
        let lists = [];
        if (this.state.isLoaded) {
            lists = this.state.departments.map((item) =>
                /* <option value={item.id}>{item.name}</option>*/
                <MenuItem value={item.id}>{item.name}</MenuItem>
            );
        }
        return (
            <div>

                {/*<select id="departmentDDL" name="departmentDDL" onChange={this.onChangedepartment} >*/}
                {/*    <option value="0">Select</option>*/}
                {/*    {lists}*/}
                {/*</select>*/}

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="lbldepartmentDDL">Department</InputLabel>
                        <Select
                            labelId="lbldepartmentDDL"
                            id="departmentDDL"
                            value={this.state.selectedDepartmentID}
                            label="Select Department"
                            onChange={this.onChangedepartment}
                        >
                            {lists}
                        </Select>
                    </FormControl>
                </Box>
            </div>
        );
    }
}

export default DepartmentSelect;