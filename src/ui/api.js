import axios from 'axios'

export const api = axios.create({
    baseURL: "http://185.146.3.228",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': '',
// <<<<<<< HEAD
        'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwMzE0NzE2LCJpYXQiOjE3Mzg3Nzg3MTYsImp0aSI6IjI2MDlkNGRhNzZjMDQxYzBiZDA5YjI4NzI5NzQ2YmVlIiwidXNlcl9pZCI6OX0.RbouqxKSA0e6Djk_4A1Lcl7S3YipWLlqFyXg2s-jX3Y",
// =======
        'Authorization': localStorage.getItem("MAZA_BOOK")
// >>>>>>> 43d34363c6a3bd73d895fad8215a4148897b5bdb
    }

})
