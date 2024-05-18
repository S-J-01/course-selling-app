import { useEffect, useState } from "react"


function AllCourses(){
    
    const[courses,setCourses] = useState([])

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
        {courses.map((courseObj)=>{
            return(
                <>

                </>
            )
        })}

        </>
    )
}

export default AllCourses