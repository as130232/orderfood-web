
import { useState, useEffect } from "react"
import { API_GET_MEAL } from '../../../global/constants'
import { useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


const MealIdByUrl = () => {
    const search = useLocation().search
    return new URLSearchParams(search).get("mealId")
}

const getMeal = async () => {
    const mealId = MealIdByUrl()
    let url = API_GET_MEAL.replace(":mealId", mealId)
    const res = await fetch(url)
    return res.json();
}


const MenuDetail = () => {
    const queryClient = new QueryClient()
    const { data, isLoading, error } = useQuery('meal', getMeal)
    console.log(data)
    return (
        <QueryClientProvider client={queryClient}>
            <div />
        </QueryClientProvider>
    );
};
export default MenuDetail;
