import { useState } from "react"
import { TextField } from "@mui/material"
import {Button} from "@mui/material"
import axios from "axios"
import Box from "@mui/material/Box"
function CreateCourse (){
    
    const[title, setTitle] = useState('')
    const[description,setDescription] = useState('')
    const[price,setPrice] = useState(0)
    const[imageLink,setImageLink] = useState('')
    const[published,setPublished] = useState(false)
    const authorizationToken = localStorage.getItem('token')

    const handleTitleChange = (event)=>{
        setTitle(event.target.value)
    }

    const handleDescriptionChange = (event)=>{
        setDescription(event.target.value)
    }

    const handlePriceChange = (event)=>{
        setPrice(event.target.value)
    }

    const handleImageLinkChange = (event)=>{
        setImageLink(event.target.value)
    }

    const handlePublishedChange = (event)=>{
        setPublished(event.target.value)
    }
    
    
    const config = {
        method:'post',
        url:'http://localhost:3000/admin/courses',
        data:{
            title:title,
            description:description,
            price:price,
            imageLink:imageLink,
            published:published
        },
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${authorizationToken}`
        }
    }
    

    const onSubmit = ()=>{
        axios(config)
         .then(response=>{
            console.log(response.data)
            alert(response.data.message)
            setTitle('')
            setDescription('')
            setPrice(0)
            setImageLink('')
            setPublished(false)
         })
         .catch(err=>{
            console.log(err)
         })
    }
    
    return(
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
                <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={handleTitleChange}/>
                <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={handleDescriptionChange}/>
                <TextField id="outlined-basic" label="Price" variant="outlined" value={price} onChange={handlePriceChange}/>
                <TextField id="outlined-basic" label="Image Link" variant="outlined" value={imageLink} onChange={handleImageLinkChange}/>
                <TextField id="outlined-basic" label="Published" variant="outlined" value={published} onChange={handlePublishedChange}/>
                <Button variant="contained" onClick={onSubmit}>Create Course</Button>
            </Box>
        
        </Box>
    )
}

export default CreateCourse