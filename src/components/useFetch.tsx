import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);  // Ahora acepta un tipo genérico T
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!url) return;
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data: T) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return { loading, data, error };
}
