/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import axios from "axios";


export default function useFetch(url, method, requestBody = {}) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function () {
                try {
                    setLoading(true)
                    if (method === "GET") {
                        const response = await axios.get(url);
                        setData(response.data);
                    } else if (method === "POST") {
                        const response = await axios.post(url, requestBody);
                        setData(response.data);
                    }
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false)
                }
            }
        )()
    }, [])

    return { data, error, loading }

}