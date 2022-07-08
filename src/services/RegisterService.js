import httpClient from "./httpClient";

const RegisterService = async(data) => {

    const formField = new FormData();

    formField.append('username', data.username);
    formField.append('first_name', data.firstName);
    formField.append('last_name', data.lastName);
    formField.append('password', data.password);
    formField.append('repeat_password', data.repeatPassword);
    formField.append('email', data.email);
    formField.append('mobile_number', data.phone);

    return httpClient.post('/sign-up/', formField)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            const errorData = JSON.stringify(error.response.data)
            if (errorData.includes('non_field_errors')) {
                alert('error repeat password');
            }else if(errorData.includes('mobile_number')) {
                alert('error mobile phone');
            }else {
                alert('required field')
            }
        })
}

export default RegisterService;