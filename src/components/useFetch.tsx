import {useState, useEffect } from "react";

export function useFetch(url:string) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        if (!url) return;
        setLoading(true);
        fetch(url)
        .then((response)=> {
        return response.json()
        })
        .then((data)=>{
            setData(data)
            setLoading(false)
        })
        .catch((error)=>{
            setError(error)
            setLoading(false)
        })
    },[url])

    return {loading, data, error}
}