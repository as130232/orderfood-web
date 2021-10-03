
import { useState, useEffect } from "react"
import { API_GET_MEAL } from '../../../global/constants'
import { useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Meal from './components/Meal'

const MealIdByUrl = () => {
    const search = useLocation().search
    return new URLSearchParams(search).get("mealId")
}

async function fetchMeal(setMeal, mealId) {
    let url = API_GET_MEAL.replace(":mealId", mealId)
    const data = await fetch(url).then(res => res.json()).then(res => res.data).catch(err => console.log(err))
    setMeal(data)
}

const MenuDetail = () => {
    const mealId = MealIdByUrl()
    const [meal, setMeal] = useState({})

    useEffect(() => {
        fetchMeal(setMeal, mealId);
    }, [])

    return (
        <div >
            <Meal meal={meal} />
        </div>
    )
}
export default MenuDetail;
