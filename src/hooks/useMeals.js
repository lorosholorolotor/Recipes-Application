import { useEffect, useState } from "react"
import {getRandomMeal} from "../api"

export const useMeals = () => {
        const [meals, setMeals] = useState([]); 
        useEffect(()=>{
            let results = [];
            async function loadMeals(){
                for(let i = 1; i <= 3; i++){
                    results.push(await getRandomMeal())
                }
                setMeals(results)
            }
            loadMeals();
        }, [])
        return {meals, setMeals}
}