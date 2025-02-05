import axios from 'axios'

export const api = axios.create({

    baseURL: "http://185.146.3.228",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': '',
        'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwMzEyNTAxLCJpYXQiOjE3Mzg3NzY1MDEsImp0aSI6IjFiYmI1NDY0ODAzNTQwOTg5NDBmMWJiYTk0MjRiOWZhIiwidXNlcl9pZCI6OX0.YCi7OzlAIG5R_LIrbhmG5IQT5Vq7uMeqFZRxG-OVJws"
    }

})
