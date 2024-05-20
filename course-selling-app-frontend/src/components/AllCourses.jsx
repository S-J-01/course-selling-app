import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function AllCourses(){
    
    const[courses,setCourses] = useState([])
    const navigate = useNavigate()
    const authorizationToken = localStorage.getItem('token')

    const config = {
        method : 'get',
        url : 'http://localhost:3000/admin/courses',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${authorizationToken}`
        }
    }

    useEffect(()=>{
        axios(config)
         .then(response=>{
            console.log(response.data)
            setCourses(response.data.courses)
         })
         .catch(err=>{
            console.log(err)
         })

        },[])
        
    return(
        <>
        Inside return in all-courses
        {courses.map((courseObj)=>{
            return(
                <>
                    Title:
                    {courseObj.title}
                    &nbsp;
                    Description:
                    {courseObj.description}
                    &nbsp;
                    Price:
                    {courseObj.price}
                    &nbsp;
                    ImageLink:
                    {courseObj.imageLink}
                    &nbsp;
                    Published:
                    {courseObj.published}
                    &nbsp;
                    Course ID:
                    {courseObj.courseID}
                    &nbsp;
                    <Button variant="contained" onClick={()=> navigate(`/all-courses/${courseObj.courseID}`)}>Edit Course</Button>
                </>
            )
        })}

        </>
    )
}

export default AllCourses