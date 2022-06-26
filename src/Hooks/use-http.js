import { useState } from "react";

import axios from "axios";

const useHttp = (requestData, applyDataFunc) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const { data } = await axios[requestData.method.toLowerCase()](requestData.url, requestData.body && requestData.body)
            applyDataFunc(data)
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;