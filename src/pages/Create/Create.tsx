import React from 'react'
import './Create.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../../components/Input';
type Inputs = {
    name: string,
    phone: string,
    email: string,
    resume: FileList,
    gender: string,
    github: string,
    linkedin: string
};

const Create = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {


        var formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("resume", data.resume[0]);
        formdata.append("phone", data.phone);
        formdata.append("email", data.email);
        formdata.append("gender", data.gender);
        formdata.append("linkedin", data.linkedin);
        formdata.append("github", data.github);


        fetch("https://django-rest-api-employee.herokuapp.com/api/emp/", {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                alert("added Successfully")
            })
            .catch(error => console.log('error', error));

    };
    return (<>
        <h2 className='heading'>Add New Employee</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

            <Input
                register={register}
                title="name"
                type="text"
            />

            <Input
                register={register}
                title="email"
                type="email"
            />

            <Input
                register={register}
                title="phone"
                type="number"
            />

            <Input
                register={register}
                title="resume"
                type="file"
            />

            <Input
                register={register}
                title="linkedin"
                type="text"
            />

            <Input
                register={register}
                title="github"
                type="text"
            />


            <div className='input'>
                <label>Gender</label>
                <select {...register("gender")}>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            </div>
            <div className='input'>
                <label></label>
                <input type="submit" />
            </div>

        </form>
    </>
    )
}

export default Create