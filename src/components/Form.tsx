import { useForm, SubmitHandler } from 'react-hook-form';
import { postData, updateData } from '../utils/djangoSubmit'
import Input from './Input';
import './Form.css';

type Inputs = {
    name: string,
    phone: string,
    email: string,
    resume: FileList,
    gender: string,
    github: string,
    linkedin: string
};

type formType = {
    type: string,
    id?: number,
    refreshList?: () => void | undefined
}
const Form = ({ type, id, refreshList }: formType) => {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        if (type == "post") {
            postData(data, reset)

        }
        else if (type = "update") {
            updateData(data, id, refreshList, reset)

        }

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
                <input type="submit" value={type} />
            </div>

        </form>
    </>
    )
}

export default Form