import { useNavigate } from "react-router"

export const AboutPage = () => {
    const navigate = useNavigate();
    return (
        <div>
        <div className="about" style={{display:"flex", width:"80%", margin: "0 auto"}}>
            <div className="name" style={{flex: "1.5"}}>Welcome to this culinary paradise!</div>
            <div className="description" style={{flex:"1",marginLeft: "5vh", marginTop:"2vw"}}>
                <div className="text" style={{color:"hsla(45, 6%, 14%, 0.60)", fontWeight: "600", fontSize:"1.75vw"}}>
                    Welcome to the heart of the kitchen! This site contains the best dishes of the most famous cuisines of the world. Cooking recipes from this site, you will fully immerse yourself in a gastronomic journey, where each dish is a story, and each recipe is a skillfully created symphony of taste.
                </div>
                <button onClick={()=> navigate("/recipes")} style={{background:"#F29C33", border:"none", padding: "6px 10px", paddingTop:"8px", fontWeight:"600", fontSize: "1.75vw", marginTop: "1vh", borderRadius: "24px"}}>
                    EXPLORE RECIPES
                </button>
            </div>

        </div>
             <div className="img">
            </div>
        </div>
    )
}