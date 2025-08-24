import { Suspense, useEffect, useState } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom"
import { Loader } from "./Loader";
import { ToastContainer, toast } from "react-toastify";

export function Recipe(){
    const {meal} = useLoaderData();
    const [ingredients, setIngredients] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        let ml = "";
        let arr = [];
        let arrMeasures = [];
        meal.then((data)=> {
            ml = data.meals[0]
            for(let key of Object.keys(ml)){
                if(/strIngredient/.test(key)){
                    if(ml[key] != "" && arr.indexOf(ml[key]) == -1 ) arr.push(ml[key])
                }
                if(/strMeasure/.test(key)){
                    if(ml[key] != "" && arr.indexOf(ml[key]) == -1) arrMeasures.push(ml[key])
                }
            }
            for(let i = 0; i < arr.length; i++){
                arr[i] = `${arrMeasures[i]} ${arr[i]}`
            }
            setIngredients(arr);
        })
    }, [])

    const handleClick = (meal) => {
    if (localStorage.getItem("name")) {
        const favourites = JSON.parse(localStorage.getItem("favourites") || "{}");

        favourites[meal.idMeal] = meal; 
        localStorage.setItem("favourites", JSON.stringify(favourites));
        toast.success(`"${meal.strMeal}" added to favourites!`);
    }else navigate("/favourites");
    };

    return(
        <Suspense fallback={<Loader/>}>
        <Await resolve={meal}>
        {(loadedMeal) =>{
            return (<div className="recipe">
            <div className="tag">RECIPE</div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="name">{loadedMeal.meals[0].strMeal}</div>
            <div className="recipe-description">
                Welcome to the recipe section, where culinary dreams become reality. Today we will implement a traditional dish of {loadedMeal.meals[0].strArea} cuisine, which will allow you to have a wonderful meal - the signature {loadedMeal.meals[0].strMeal}
            </div>
            <ul>
                <li>1 HOUR</li>
                <li>HARD PREP</li>
                <li>4 SERVES</li>
            </ul>
            <div className="recipe-img-container" onClick={() => handleClick(loadedMeal.meals[0])}><img src={loadedMeal.meals[0].strMealThumb} alt="meal-photo" /></div>
            <div className="recipe-mainInfo" >
                <div className="recipe-text" style={{whiteSpace: 'pre-wrap'}}>
                    {`Recipe: \n\n${loadedMeal.meals[0].strInstructions}`}
                </div>
                <div className="ingredients-container">
                    <div className="ingredients-text">
                        Ingredients
                    </div>
                    <ul className="ingredients">
                        {
                            ingredients.map((ingredient) => {
                                return <li className="ingredient" key={ingredient}>{ingredient}</li> //Использование iter как key потому как массив не будет видоизменяться, формируется 1 раз при didMount
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>)}}
        </Await>
        </Suspense>
    )
}