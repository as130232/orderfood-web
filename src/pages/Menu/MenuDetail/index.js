import { useState, useEffect } from "react"
import { API_GET_MEAL } from '../../../global/constants'
import { useParams } from "react-router-dom"
import Meal from './components/Meal'

async function fetchMeal(setMeal, mealId) {
    let url = API_GET_MEAL.replace(":mealId", mealId)
    const data = await fetch(url).then(res => res.json()).then(res => res.data).catch(err => console.log(err))
    setMeal(data)
}

const MenuDetail = ({cart}) => {
    const { mealId } = useParams()
    const [meal, setMeal] = useState({})
   
    useEffect(() => {
        fetchMeal(setMeal, mealId);
    }, [])

    return (
        <div>
            <Meal meal={meal}/>
        </div>
    )
}

export default MenuDetail
