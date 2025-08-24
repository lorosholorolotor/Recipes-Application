import { useEffect,  useState } from "react";
import { useNavigate } from "react-router";

export const Profile = () => {
    const [name, setName] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!(localStorage.getItem("name"))) navigate("/register")
        setName(localStorage.getItem("name"))
        console.log(localStorage.getItem("name"))
    },[])

    const handleExit = () =>{
        localStorage.clear();
        navigate("/register")
    }

    return (
        <div className="profile-container" style={{width: "80%", height:"80vh", border:"1px solid #EE6352", borderRadius: "15px", margin:"0 auto", display:"flex", flexDirection:"column"}}>
            <div className="name" style={{maxWidth:'65%', marginTop:"5vh"}}>Welcome, {name}</div>
            <div className="description" style={{whiteSpace: 'pre-wrap', margin:"0 auto", width:"max-content", textAlign:"center", marginTop:"5vh"}}>
                {"Thank you for registering with our service. \nNow you can add recipes to the \"favourites\" section."}
            </div>
            <button className="tag" onClick={()=> handleExit()} style={{margin:"3vh auto", border:"none", fontSize: "2.7vw", transition:"all 0.5s ease"}}>Exit</button>
        </div>
    )
}