import {  useLoaderData, Link, NavLink,  useSearchParams, useNavigate } from "react-router-dom"
import {  useEffect, useState,  useContext } from "react";
import {  ThreeDots, } from "react-loader-spinner";
import { Dish } from "../Components/Dish";
import { InputContext } from "../inputContext";

export const RecipesPage = () => {
    const data = useLoaderData();
    const [searchParams] = useSearchParams() ;
    const curArea = searchParams.get("area")
    const curSearchParams = searchParams.get("p");
    const [dish, setDish] = useState(null)
    const {inputValue} = useContext(InputContext) 
    const navigate = useNavigate();

    useEffect(() => {
        if (inputValue.current && !curSearchParams) {
            navigate(`?p=${inputValue.current}`);
        }
    }, []);

    useEffect(()=>{
        if(curSearchParams){
            (async() =>{
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${curSearchParams}`);
                const json = await response.json();
                setDish(json.meals)
                console.log(dish)
            })()
        } 
    }, [curSearchParams])

    return (
        <div className="recipesPage">
            {!dish? 
            <div>
                <RecipesMainPart data={data} curArea={curArea}/>
                <MealsList curArea={curArea}/></div>
            : 
            <div style={{display:"flex", width: "80%", margin:"5vh auto", justifyContent:"space-between", flexWrap:"wrap"}}> 
                {
                    dish.map((meal, iter)=> {
                        return<Link style={{marginTop: "5vh"}} className="meal-link" key={meal.idMeal} to={`/recipes/${meal.idMeal}`}> <Dish iter={iter+1} img={meal.strMealThumb} name={meal.strMeal} description={meal.strInstructions} /></Link>
                    })
                }
            </div>
            }
        </div> 
    )
}

const RecipesMainPart = ({data, curArea}) => {
    return(
            <div>
                <div className="tag">RECIPE</div>
                <div className="name">EMBARK ON A JOURNEY</div>
                <div className="recipe-description">
                    With our collection of recipes we have something to satisfy every plate.
                </div>
                <div className="recipesPage-areas">
                    {data.map((area)=> {
                        return <NavLink key={area.strArea} to={`?area=${area.strArea}`}
                        className={({isActive})=>{
                            return (curArea == area.strArea? "recipesPage-Area-active": "")
                        }}><div className="recipesPage-area">{area.strArea}</div></NavLink>
                    })}
                </div>
            </div>
    )
}

const MealsList = ({curArea}) => {
    const [meals, setMeals] = useState(null);

    useEffect(()=>{
        if(curArea){
            (async (curArea) => {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${curArea}`)
                const json = await response.json();
                setMeals(json.meals);
            })(curArea)
        }
    }, [curArea])

    if (!curArea) {
        return <div className="no-area name">Вы не выбрали категорию!</div>;
    }

    if(!meals) return <Loader/>
    return (
    <div className="cards">
                {meals == null? <div className="no-area name">Вы не выбрали категорию!</div>:
                meals.map((meal, iter)=>{
                    return <Link className="meal-link" key={meal.idMeal} to={`/recipes/${meal.idMeal}`}> <Dish iter={iter+1} img={meal.strMealThumb} name={meal.strMeal} description="" /></Link>
                    
                })}
    </div>
    )
}

export const RecipesLoader = async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    const json = await response.json();
    const areas = json.meals;
    return areas;
}

export function Loader() {
  return (
    <div style={{ display: "flex", justifyContent:"center", alignItems:"center", marginTop: "120px"}}>
      <ThreeDots height={100} width={100} color="#0F161E" />
    </div>
  );
}