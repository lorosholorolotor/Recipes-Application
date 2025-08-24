import {Layout} from './Components/Layout'
import { createBrowserRouter } from 'react-router-dom';
import { AboutPage } from './Pages/AboutPage';
import { Recipe } from './Components/Recipe';
import { FavouritesPage } from './Pages/FavouritesPage';
import { Profile } from './Pages/Profile';
import { MainPage } from './Pages/MainPage';
import { fetchMeal } from './api';
import {Reg} from './Pages/Reg/Reg';



const arr = [{id: 1, name: "Home", path: "/"}, {id: 2, name: "About", path: "/about"}, {id: 3, name: "Recipes", path: "/recipes"}, {id: 4, name: "Favourites", path: "favourites"}];
export const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout linksArr={arr}/>, 
    children: [
      {
        index: true,
        element: <MainPage/>,
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "recipes",
        children:[
            {
              index: true,
              lazy: () =>
                import("./Pages/RecipesPage").then((module) => ({
                  Component: module.RecipesPage,
                  loader: module.RecipesLoader,
                })),
            },
            {
                path: ":id",
                element: <Recipe/>,
                loader: ({params})=> {
                    return { meal: fetchMeal(params.id)}
                }
            }
        ]
      },
      {
        path: "favourites",
        element: <FavouritesPage />
      },
      {
        path: "profile",
        element: <Profile/>
      },
      {
        path: "register", 
        element: <Reg/>
      }
    ]
  }
])
