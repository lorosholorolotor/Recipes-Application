import {Dish} from "../Components/Dish"
import {useMeals} from "../hooks/useMeals"
import { Link, useNavigation } from "react-router-dom";
import {Loader} from "../Components/Loader"

export const MainPage = () => {
    const {meals, setMeals} = useMeals();
    const navigation = useNavigation();

    return(
        <div className="mainPage">
            <h1>Culinary hits of the day</h1>
            {meals.length === 0?  (
                <Loader/>
            ):             
            <div className="dishes">
            {
                meals.map((meal, iter)=>{
                    console.log(meal)
                    return <Link className="meal-link" key={meal.id} to={`/recipes/${meal.id}`}> <Dish iter={iter+1} img={meal.picture} name={meal.name} description={meal.description} /></Link>
                })
            }
            </div>}
        </div>
    )
}