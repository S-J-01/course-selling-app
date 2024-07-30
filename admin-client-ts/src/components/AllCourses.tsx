import { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
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
        <Box
         sx={{
            display:'flex',
            flexDirection:'row',
            width:'100vw',
            height:'100vh',
            margin:0,
            padding:0,
            border:'1px solid black',
            justifyContent:'flex-start',
            alignContent:'flex-start',
            flexWrap:'wrap'
         }}
        >
         {courses.map((courseObj)=>{
            return(
                    <Box key={courseObj.courseID}
                         sx={{
                            display:'flex',
                            flexDirection:'column',
                            border:'1px solid black',
                            flexWrap:'wrap',
                            margin:10,
                            gap:2,
                            boxShadow:15
                         }}
                    >   


                        <Box
                            sx={{
                                textAlign:'left'
                            }}
                        >
                        
                        <img src={`${courseObj.imageLink}`}></img>
                       
                        </Box>

                        <Box
                            sx={{
                                textAlign:'left'
                            }}
                        >
                        Title:&nbsp;&nbsp;
                        {courseObj.title}
                        
                        </Box>

                        <Box
                            sx={{
                                textAlign:'left'
                            }}
                        >
                        Description:&nbsp;&nbsp;
                        {courseObj.description}
                        
                        </Box>

                        <Box
                            sx={{
                                textAlign:'left'
                            }}
                        >
                        Price:&nbsp;&nbsp;
                        {courseObj.price}
                        
                        </Box>

                        

                        <Box
                            sx={{
                                textAlign:'left'
                            }}
                        >
                        Published:&nbsp;&nbsp;
                        {courseObj.published?'Yes':'No'}
                        
                        </Box>

                        <Box
                            sx={{
                                textAlign:'left'
                            }}
                        >
                        Course ID:&nbsp;&nbsp;
                        {courseObj.courseID}
                        
                        </Box>


                        <Button variant="contained" onClick={()=> navigate(`/all-courses/${courseObj.courseID}`)}>Edit Course</Button>
                    </Box>
                )
            })}

        </Box>
    )
}

export default AllCourses