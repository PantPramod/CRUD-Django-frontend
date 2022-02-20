import { useEffect, useState } from 'react';
import Form from '../../components/Form';
import { del } from '../../utils/djangoSubmit';
import './View.css';



const View = () => {
    const [showDetailsEmp, setShowDetailsEmp] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [allEmp, setAllEmp] = useState<any>([]);
    const [detaildEmp, setDetailedEmp] = useState<any>();
    const [id, setId] = useState(0)
    const [flag, setFlag] = useState(false);


    const edithandler = () => {
        setShowUpdate(true)
    }


    const deleteHandler = (i: number) => {
        del(i, setFlag)
    }

    const refreshList = () => {
        setFlag(prev => !prev);
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
                setAllEmp(result)
            })
            .catch(err => console.log("err", err))
    }, [flag])

    type obj = {
        id: number,
        name: string,
        email: string,
    }


    return (<>
        <div className='view'>
            <div className='allemp'>
                <h2 className='heading'>All Employees</h2>
                <ul className='allemplist'>
                    {allEmp.map((emp: obj) =>
                        <li key={emp.id} onClick={() => showDetails(emp.id)} className='entity'>
                            <div className='flex' onClick={() => setShowDetailsEmp(true)}>
                                <p >{emp.id}.{emp.name}</p>
                                <p id='ml20'>{emp.email}</p>
                            </div>
                            <div className='p20'>
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
                {detaildEmp && <>
                    <p>Name: {detaildEmp?.name}</p>
                    <p>email:{detaildEmp?.email}</p>
                    <p>Phone:{detaildEmp?.phone}</p>
                    <p>Resume:<a href={detaildEmp?.resume}>see resume</a></p>
                    <p>Gender:{detaildEmp?.gender}</p>
                    <p>linkedin:{detaildEmp?.linkedin}</p>
                    <p>Github:{detaildEmp?.github}</p>
                </>
                }
            </div>}
        </div>

        {showUpdate &&
            <div className='Update'>
                <button className='close' onClick={() => setShowUpdate(false)}>X</button>
                <Form type='update' id={id} refreshList={refreshList} />
            </div>}


    </>

    )
}

export default View