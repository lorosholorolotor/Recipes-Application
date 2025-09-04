export async function fetchMeal(id){
    try{
        await new Promise(resolve => setTimeout(resolve, 400))
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        return await response.json();
    }
    catch(err){
        console.log(`Ошибка. ${err}}`)
    }
}


export async function getRandomMeal(){
    try{
        await new Promise(resolve => setTimeout(resolve, 400))
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php"); 
        const json = await response.json();
        const meal = json.meals[0];
        const obj = {
            id: meal.idMeal,
            name: meal.strMeal,
            picture: meal.strMealThumb,
            description: meal.strInstructions
        }
        return obj
    }
    catch(err){
        console.log(`Ошибка. ${err}`)
    }

}