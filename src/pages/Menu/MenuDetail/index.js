import { useState, useEffect } from "react"
import { API_GET_MEAL } from '../../../global/constants'
import { useParams } from "react-router-dom";
import Meal from './components/Meal'

async function fetchMeal(setMeal, mealId) {
    let url = API_GET_MEAL.replace(":mealId", mealId)
    const data = await fetch(url).then(res => res.json()).then(res => res.data).catch(err => console.log(err))
    setMeal(data)
}

const MenuDetail = () => {
    const { mealId } = useParams();
    const [meal, setMeal] = useState({})

    useEffect(() => {
        fetchMeal(setMeal, mealId);
    }, [])

    if (mealId.length == 36){
        //購物車
    }
    
    return (
        <div>
            <Meal meal={meal} />
        </div>
    )
}
export default MenuDetail
