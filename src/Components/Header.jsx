import { NavLink, useNavigate, useSearchParams} from 'react-router-dom'
import { InputContext } from '../inputContext';
import { memo, useContext } from 'react';

export const Header = memo(({linksArr}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const {inputValue} = useContext(InputContext)

    const stSrchParamsHandle = (e) => {
        inputValue.current = e.target.value;
        console.log(inputValue.current)
        setSearchParams(new URLSearchParams({p: e.target.value}))
    }
    return(
        <header>
            <nav className='header'>
                <ul className='header-items'>
                    {linksArr.map((elem)=> {
                        return(
                            <li key={elem.id}>
                                <NavLink to={elem.path}         
                                className={({ isActive }) => 
                                    isActive ? "link link-active" : "link"}>
                                    {elem.name}
                                </NavLink>
                            </li>
                        )
                    })}
                    <li className='search-container'><input onClick={()=> navigate("/recipes")} onChange={(e)=> stSrchParamsHandle(e)} type="text" name="search" id="search" placeholder='search recipe' /></li>
                    <li className='profile-container'><div className="profile" onClick={()=> navigate("/profile")}><img src='/icons/person-outline.png'/></div></li>
                </ul>
            </nav>
        </header>
    )
})