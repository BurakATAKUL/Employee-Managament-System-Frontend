import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee, generateQRCodeForEmployee } from '../service/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'


const EmployeeComponent = () => {

    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [qrCode, setQrCode] = useState('')

    const { id } = useParams();

    const [errors, setErorrs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        
    })

    const navigator = useNavigate();

    useEffect(() => {//burada çalışanları update edereken tekrar kaydedeceiğimiz verielri kullanıcıdan aldık

        if (id) {
            getEmployee(id).then((response) => {
                setFirstname(response.data.firstName);
                setLastname(response.data.lastName);
                setEmail(response.data.email)
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    function saveOrUpdateEmployee(e) {

        e.preventDefault();

        if (validateForm()) {//validateForm true olarka dönerse kayıt edecek 
            const employee = { firstName, lastName, email }
            console.log(employee)

            if (id) {//eğer id parametresinin içerisi boş değilse update et verileri
                updateEmployee(id, employee).then((response) => {//employeeService de bulunan updateEployee endpointine put atarak verileri günceller
                    console.log(response.data)
                    navigator('/employees');
                    console.log('oluşturulan qr:'+setQrCode)
                }).catch(error => {
                    console.error(error)
                })
            } else {
                //Burada ekldiğimiz employeeleri db mize yani beackendimize gönderdik
                createEmployee(employee).then((response) => {
                    console.log(response.data);

                    // Yeni çalışan oluşturulduktan sonra QR kodunu oluştur
                    generateQRCodeForEmployee(response.data.id).then(() => {
                        setQrCode(response.data)
                        console.log("QR Code generated successfully");
                        navigator('/employees')
                    }).catch(error => {
                        console.error("Error generating QR Code:", error);
                    });
                }).catch(error => {
                    console.error(error);
                })

            }


        }


    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors }

        if (firstName.trim()) {
            errorsCopy.firstName = '';

        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';

        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErorrs(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>;
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }



    return (
        <div className='container'>
            <br></br>

            <div className='row' >
                <div className='card col-md-6 offset-md-3  offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='cardBody'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'> Fisrt Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='fisrtName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstname(e.target.value)}
                                >
                                </input>
                                {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'> Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastname(e.target.value)}
                                >
                                </input>
                                {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}


                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'> Email</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                {errors.email && <div className='invalid-feedback'> {errors.email} </div>}

                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>

                        </form>
                    </div>



                </div>

            </div>


        </div>
    )
}

export default EmployeeComponent