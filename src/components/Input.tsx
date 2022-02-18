import React from 'react'
import { Path, UseFormRegister } from "react-hook-form";

interface Inputs {
    name: string,
    phone: string,
    email: string,
    resume: FileList,
    gender: string,
    github: string,
    linkedin: string,
}
type propTypes = {
    register: UseFormRegister<Inputs>,
    title: Path<Inputs>,
    type: string,
}
const Input = ({ register, title, type }: propTypes) => {
    return (
        <div className='input'>
            <label>{title}</label>
            <input type={type} {...register(title, { required: true })} />
        </div>
    )
}

export default Input