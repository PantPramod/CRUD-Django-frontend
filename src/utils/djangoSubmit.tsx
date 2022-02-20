type Inputs = {
    name: string,
    phone: string,
    email: string,
    resume: FileList,
    gender: string,
    github: string,
    linkedin: string
};


export function postData(data: Inputs, reset: () => void) {

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
        .then(response => {
            console.log(response.status)
            if (response.status == 201) return response.json()
            else return { message: "Not submitted" }
        })
        .then(result => {
            console.log(result)
            result.message && alert(result.message)
            !result.message && alert("added Successfully")
            reset()

        })
        .catch(error => console.log('error', error));

}

export function updateData(data: Inputs, id: number | undefined, refreshList: (() => void) | undefined, reset: () => void) {
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
        .then(response => {
            console.log(response.status)
            if (response.status == 200) return response.json()
        })
        .then(result => {
            console.log(result)

            result && refreshList && refreshList();
            reset()
        })
        .catch(error => console.log('error', error));
}


export const del = (i: number, setFlag: React.Dispatch<React.SetStateAction<boolean>>) => {
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
        .catch(error => console.log('error', error))
}

