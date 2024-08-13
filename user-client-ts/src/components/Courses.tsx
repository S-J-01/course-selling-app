import { useEffect } from "react"
import { courseState } from "../store/atoms/courses"
import { useRecoilState } from "recoil"
import axios from "axios"
import { BASE_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { Box, Card } from "@mui/material"
import {Button} from "@mui/material"

function Courses (){

const [courses,setCourses] = useRecoilState(courseState)
const navigate = useNavigate()

useEffect(()=>{
 axios({
    method:'get',
    url:`${BASE_URL}/users/courses`,
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('userAccessToken')}`
    }
 }).then(response=>{
    setCourses({
        isLoading:false,
        allCourses:response.data.courses
    })
 }).catch(err=>{
    console.log(err)
    navigate('/login')
 })
},[])

if(courses.isLoading){
    return(
        <>
        Loading....
        </>
    )
}
else{
    return(
        <Box
         sx={{
            display:'flex',
            flexDirection:'row',
            width:'100vw',
            height:'95vh',
            margin:0,
            padding:0,
            border:'1px solid black',
            justifyContent:'flex-start',
            alignContent:'flex-start',
            flexWrap:'wrap'
         }}
        >
         {(courses.allCourses).map((courseObj)=>{
            return(
                    <Card key={courseObj.courseID}
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


                        <Button variant="contained" onClick={async()=>{
                            try{
                                const response = await axios({
                              method:'post',
                              url:`${BASE_URL}/users/courses/${courseObj.courseID}`,
                              headers:{
                                  'Content-Type':'application/json',
                                  'Authorization':`Bearer ${localStorage.getItem('userAccessToken')}`
                              }  
                            })
                            alert(response.data.message)
                        }
                        catch(err){
                            console.log('axios request to buy course failed')
                            console.log(err)
                        }
                        }}>Buy Course</Button>
                    </Card>
                )
            })}

        </Box>
    )
}


}

export default Courses