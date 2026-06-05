import axios from "axios";
import axiosRetry from "axios-retry";

const httpClient = axios.create({
    timeout: 1 * 60 * 1000, // 1 minute in milliseconds (60,000 ms)
});

// retry failed requests
axiosRetry(httpClient, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        return (
            axiosRetry.isNetworkError(error) || error.response?.status >= 500
        )
    }
})

export default httpClient;