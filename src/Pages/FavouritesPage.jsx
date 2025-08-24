import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Dish } from "../Components/Dish";
import { useNavigate } from "react-router";

export const FavouritesPage = () => {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("name")) {
      navigate("/register");
      return;
    }

    const storedFavourites = JSON.parse(localStorage.getItem("favourites") || "{}");

    const favouriteArray = Object.values(storedFavourites);
    setFavourites(favouriteArray);
  }, [navigate]);

  return (
    <div className="favourites">
      <div className="name">
        Your favorite recipes:
      </div>
      <div
        className="recipes"
        style={{
          display: "flex",
          width: "80%",
          margin: "5vh auto",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {favourites.map((meal, iter) => (
          <Link
            style={{ marginTop: "5vh" }}
            className="meal-link"
            key={meal.idMeal}
            to={`/recipes/${meal.idMeal}`}
          >
            <Dish
              iter={iter + 1}
              img={meal.strMealThumb}
              name={meal.strMeal}
              description={meal.strInstructions}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
