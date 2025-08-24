export const Dish = ({img, name, description, iter}) => {
    return(
        <div className="dish">
            <img src={img} alt="dish-img" />
            <h2 className="dish-name">{`${iter}. ${name}`}</h2>
            {description? <div className="description">{description}</div> : <div> </div>} 
        </div>
    )
}