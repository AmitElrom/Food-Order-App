import { useState, useCallback } from "react";

import axios from "axios";

const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestData, applyDataFunc = null) => {
        setIsLoading(true)
        setError(null)
        try {
            const { data } = await axios[requestData.method.toLowerCase()](requestData.url, requestData.body && requestData.body)
            applyDataFunc && applyDataFunc(data)
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [])

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;