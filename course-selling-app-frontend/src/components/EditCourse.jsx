import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, TextField } from "@mui/material"
import axios from "axios"
import Box from "@mui/material/Box"


function EditCourse(){

    const {courseID} = useParams()
    const[newTitle,setNewTitle] = useState('')
    const[newDescription,setNewDescription] = useState('')
    const[newPrice,setNewPrice] = useState(0)
    const[newImageLink,setNewImageLink] = useState('')
    const[newPublished,setNewPublished] = useState(false)
    const authorizationToken = localStorage.getItem('token')

    
    const handleNewTitleChange=(event)=>{
        setNewTitle(event.target.value)
    }

    const handleNewDescriptionChange = (event)=>{
        setNewDescription(event.target.value)
    }

    const handleNewPriceChange = (event)=>{
        setNewPrice(event.target.value)
    }

    const handleNewImageLinkChange = (event)=>{
        setNewImageLink(event.target.value)
    }

    const handleNewPublishedChange = (event)=>{
        setNewPublished(event.target.value)
    }

    const config = {
        method: 'put',
        url : `http://localhost:3000/admin/courses/${courseID}`,
        data:{
            title: newTitle,
            description:newDescription,
            price:newPrice,
            imageLink:newImageLink,
            published :newPublished
        },
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${authorizationToken}`
        }
        
    }

    const onSubmit = ()=>{
        axios(config)
         .then(response=>{
            console.log(response.data)
            alert(response.data.message)
            setNewTitle('')
            setNewDescription('')
            setNewPrice(0)
            setNewImageLink('')
            setNewPublished(false)
         })
         .catch(err=>{
            console.log(err)
         })
    }

    return (
        <Box
         sx={{
            display:'flex',
            flexDirection: 'column',
            justifyContent:'center',
            alignContent:'center',
            border:'1px solid black',
            width:'100vw',
            height:'100vh',
            flexWrap:'wrap'
        
        

         }}
        >
            
            <Box
             sx={{
                display:'flex',
                flexDirection:'column',
                border:'1px solid black',
                width:'50vw',
                gap:4,
                boxShadow:15
             }}
            >      
                <TextField id="outlined-basic" label="New Title" variant="outlined" value={newTitle} onChange={handleNewTitleChange}/>
                <TextField id="outlined-basic" label="New Description" variant="outlined" value={newDescription} onChange={handleNewDescriptionChange}/>
                <TextField id="outlined-basic" label="New Price" variant="outlined" value={newPrice} onChange={handleNewPriceChange}/>
                <TextField id="outlined-basic" label="New Image Link" variant="outlined" value={newImageLink} onChange={handleNewImageLinkChange}/>
                <TextField id="outlined-basic" label="New Published" variant="outlined" value={newPublished} onChange={handleNewPublishedChange}/>
                <Button variant="contained" onClick={onSubmit}>Submit Changes</Button>
            </Box>


        </Box>
    )
}

export default EditCourse