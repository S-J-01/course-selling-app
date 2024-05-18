import { Link } from "react-router-dom"


function onLogout(){
    localStorage.removeItem('token')
}


function Navbar (){
return(
    <>
    <nav>
        <ul>
            <li>
                <Link to='all-courses'></Link>
            </li>
            <li>
                <Link to='create-course'></Link>
            </li>
            <li>
                <button onClick={onLogout}>Logout</button>
            </li>
        </ul>
    </nav>
    </>
)
}

export default Navbar