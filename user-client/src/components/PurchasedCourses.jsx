import { useRecoilState } from "recoil"
import { purchasedCoursesState } from "../store/atoms/purchasedCourses"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { BASE_URL } from "../config"

function PurchasedCourses (){

const [purchasedCourses,setPurchasedCourses] = useRecoilState(purchasedCoursesState)
const navigate = useNavigate()

useEffect(()=>{
 axios({
    method:'get',
    url:`${BASE_URL}/users/purchasedCourses`,
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('userAccessToken')}`
    }
 }).then(response=>{
    setPurchasedCourses({
        isLoading:false,
        allPurchasedCourses:response.data.purchasedCourses
    })
 }).catch(err=>{
    console.log(err)
    navigate('/login')
 })

},[])

if(purchasedCourses.isLoading){
    return(
        <>Loading....</>
    )
}

else {
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
         {(purchasedCourses.allPurchasedCourses).map((courseObj)=>{
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


                    </Card>
                )
            })}

        </Box>
    )
}

}



export default PurchasedCourses