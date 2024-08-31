import Reac, { useEffect, useState } from 'react'
import { deleteEmployee, getQrCodeUrl, listEmployees } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const [selectedEmployeeQr, setSelectedEmployeeQr] = useState()

    const navigator = useNavigate();

    useEffect(() => {

        getAllEmployees();

    }, [])

    function getAllEmployees() {

        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewEmployee() {
        navigator('/add-employee')

    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        console.log(id)

        deleteEmployee(id).then((response) => {

            getAllEmployees();

        }).catch(error => {

            console.error(error)
        })

    }

    function showQrCode(id) {
        getQrCodeUrl(id).then((response) => {
            const qrCodeUrl = `data:image/png;base64,${response.data}`;
            setSelectedEmployeeQr({ id, qrCodeUrl });

        }).catch(error => {
            console.error(error)
        })
    }

    const qrCodeStyle = {
        transition: 'transform 0.3s ease',
        width: '100px', /* QR kodunun varsayılan genişliği */
    };

    const qrCodeHoverStyle = {
        ...qrCodeStyle,
        transform: 'scale(1.5)', /* Büyütme oranı */
        cursor: 'pointer', /* Fare işareti değiştirir */
    };

    return (
        <div className='container'>
            <h2 className='text-center'>List Of Employees</h2>

            <button style={{ marginBottom: '10px' }} className='btn btn-primary mb-' onClick={addNewEmployee}> Add Employee</button>

            <table class="table table-striped table-bordered" >
                <thead>
                    <tr>
                        <th> Employe ID</th>
                        <th> Employe First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employe Email ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button style={{ marginRight: '10px' }} className='btn btn-info' onClick={() => updateEmployee(employee.id)} >Update</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} >Delete</button>
                                    <button className='btn btn-success' style={{ margin: '10px' }} onClick={() => showQrCode(employee.id)}>QR</button>
                                </td>

                            </tr>
                        )
                    }
                </tbody>
            </table>

            {selectedEmployeeQr && (
                <div style={{ marginTop: '20px' }}>
                    <h3>QR Code for Employee ID: {selectedEmployeeQr.id }</h3>
                    <img src={selectedEmployeeQr.qrCodeUrl}
                        alt='QR Code'
                        style={qrCodeStyle}
                        onMouseEnter={(e) => e.currentTarget.style.transform = qrCodeHoverStyle.transform}
                        onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                    />
                </div>
            )}

        </div>
    )
}

export default ListEmployeeComponent



