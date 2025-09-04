import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export function Recipe() {
  const { meal } = useLoaderData(); 
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ml = meal.meals[0];
    let arr = [];
    let arrMeasures = [];

    for (let key of Object.keys(ml)) {
      if (/strIngredient/.test(key) && ml[key]) {
        arr.push(ml[key]);
      }
      if (/strMeasure/.test(key) && ml[key]) {
        arrMeasures.push(ml[key]);
      }
    }

    arr = arr.map((ing, i) => `${arrMeasures[i] || ""} ${ing}`);
    setIngredients(arr);
  }, [meal]);

  const handleClick = (ml) => {
    if (localStorage.getItem("name")) {
      const favourites = JSON.parse(localStorage.getItem("favourites") || "{}");
      favourites[ml.idMeal] = ml;
      localStorage.setItem("favourites", JSON.stringify(favourites));
      toast.success(`"${ml.strMeal}" added to favourites!`);
    } else {
      navigate("/favourites");
    }
  };

  const ml = meal.meals[0];

  return (
    <div className="recipe">
      <div className="tag">RECIPE</div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="name">{ml.strMeal}</div>
      <div className="recipe-description">
        Welcome to the recipe section, where culinary dreams become reality.
        Today we will implement a traditional dish of {ml.strArea} cuisine,
        which will allow you to have a wonderful meal - the signature {ml.strMeal}
      </div>
      <ul>
        <li>1 HOUR</li>
        <li>HARD PREP</li>
        <li>4 SERVES</li>
      </ul>
      <div className="recipe-img-container" onClick={() => handleClick(ml)}>
        <img src={ml.strMealThumb} alt="meal-photo" />
      </div>
      <div className="recipe-mainInfo">
        <div className="recipe-text" style={{ whiteSpace: "pre-wrap" }}>
          {`Recipe: \n\n${ml.strInstructions}`}
        </div>
        <div className="ingredients-container">
          <div className="ingredients-text">Ingredients</div>
          <ul className="ingredients">
            {ingredients.map((ingredient) => (
              <li className="ingredient" key={ingredient}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
