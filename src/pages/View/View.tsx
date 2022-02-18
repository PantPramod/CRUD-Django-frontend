import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './View.css';

type Inputs = {
    name: string,
    phone: string,
    email: string,
    resume: FileList,
    gender: string,
    github: string,
    linkedin: string
};

const View = () => {
    const [showDetailsEmp, setShowDetailsEmp] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [allEmp, setAllEmp] = useState<any>([]);
    const [detaildEmp, setDetailedEmp] = useState<any>();
    const [id, setId] = useState(0)
    const [flag, setFlag] = useState(false);
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log('submitting')
        var myHeaders = new Headers();

        var formdata = new FormData();
        { data.name && formdata.append("name", data.name) };
        { data.email && formdata.append("email", data.email) };
        { data.phone && formdata.append("phone", data.phone) };
        { data.gender && formdata.append("gender", data.gender) };
        { data.resume[0] && formdata.append("resume", data.resume[0]) };
        { data.github && formdata.append("github", data.github) };
        { data.linkedin && formdata.append("linkedin", data.linkedin) };



        fetch(`https://django-rest-api-employee.herokuapp.com/api/emp/${id}/`, {
            method: 'PATCH',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => {
                console.log(result)
                setFlag((prev) => !prev)
            })
            .catch(error => console.log('error', error));
    };

    const edithandler = () => {
        setShowUpdate(true)
    }


    const deleteHandler = (i: number) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        fetch(`https://django-rest-api-employee.herokuapp.com/api/emp/${i}/`, {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => {

                setFlag((prev) => !prev)
            })
            .catch(error => console.log('error', error));
    }

    const showDetails = (id: number) => {
        setId(id)

        fetch(`https://django-rest-api-employee.herokuapp.com/api/emp/${id}`)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setDetailedEmp(result)
            })
            .catch(err => console.log("err", err))
    }
    useEffect(() => {
        fetch('https://django-rest-api-employee.herokuapp.com/api/emp')
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setAllEmp(result)
            })
            .catch(err => console.log("err", err))
    }, [flag])

    type obj = {
        id: number,
        name: string
    }

    return (<>
        <div className='view'>
            <div className='allemp'>
                <h2 className='heading'>All Employees</h2>
                <ul className='allemplist'>
                    {allEmp.map((emp: obj, id: number) =>
                        <li key={emp.id} onClick={() => showDetails(emp.id)} className='entity'>
                            <p onClick={() => setShowDetailsEmp(true)}>{id + 1}.{emp.name}</p>
                            <div>
                                <button className='edit' onClick={edithandler}>Edit</button>
                                <button onClick={() => deleteHandler(emp.id)} className="del">Delete</button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            {showDetailsEmp && <div className='detaildemp'>
                <button className='close' onClick={() => setShowDetailsEmp(false)}>X</button>
                <h2 className='heading'>Employe Details</h2>
                <p>Name:{detaildEmp && detaildEmp?.name}</p>
                <p>email:{detaildEmp?.email}</p>
                <p>Phone:{detaildEmp?.phone}</p>
                <p>Resume:<a href={detaildEmp?.resume}>see resume</a></p>
                <p>Gender:{detaildEmp?.gender}</p>
                <p>linkedin:{detaildEmp?.linkedin}</p>
                <p>Github:{detaildEmp?.github}</p>
            </div>}
        </div>
        {showUpdate && <div className='Update'>
            <button className='close' onClick={() => setShowUpdate(false)}>X</button>
            <h2 className='heading'>Update Employee</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='input'>
                    <label>Name</label>
                    <input placeholder={detaildEmp?.name}{...register("name")} />
                </div>

                <div className='input'>
                    <label>Email</label>
                    <input placeholder={detaildEmp?.email} {...register("email")} />
                </div>
                <div className='input'>
                    <label>Phone</label>
                    <input placeholder={detaildEmp?.phone} {...register("phone")} />
                </div>
                <div className='input'>
                    <label>Resume</label>
                    <input type='file' placeholder={detaildEmp?.resume} accept='application/pdf'{...register("resume")} />
                </div>
                <div className='input'>
                    <label>Linkedin</label>
                    <input placeholder={detaildEmp?.linkedin} {...register("linkedin")} />
                </div>
                <div className='input'>
                    <label>Github</label>
                    <input placeholder={detaildEmp?.github}{...register("github")} />
                </div>
                <div className='input' >
                    <label>Gender</label>
                    <select {...register("gender")} >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>
                <div className='input'>
                    <label></label>
                    <input type="submit" />
                </div>

            </form>
        </div>}
    </>

    )
}

export default View