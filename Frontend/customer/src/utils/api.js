import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL

export const postData = async (url, formData) => {
    try {
        const respone = await axios({
            method: 'POST',
            url: apiUrl + url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
                "Content-Type": 'application/json'
            },
            data: JSON.stringify(formData)
        })

        return {
            success: true,
            statusCode: 200,
            data: respone.data
        }

    } catch (error) {
        return {
            success: false,
            statusCode: 400,
            data: error?.response?.data
        }
    }
}

export const fetchDataFromApi = async (url) => {
    try {
        const respone = await axios.get(apiUrl + url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
                "Content-Type": 'application/json'
            }
        })

        return {
            success: true,
            statusCode: 200,
            data: respone.data
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 400,
            data: error?.response?.data
        }
    }
}

export const fetchWithAutoRefresh = async (url, method = 'GET', body = null) => {
    const accessToken = localStorage.getItem("accesstoken");
    const refreshToken = localStorage.getItem("refreshtoken");

    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        };

        const response = await axios({
            method: method,
            url: apiUrl + url,
            headers,
            data: body ? JSON.stringify(body) : null
        });

        return {
            success: true,
            statusCode: 200,
            data: response.data
        };
    } catch (error) {
        const status = error?.response?.status;

        if (status === 401 && refreshToken) {
            try {
                const refreshResp = await axios.get(`${apiUrl}/customer/auth/refresh-token`, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    }
                });

                const newAccessToken = refreshResp.data.access_token;
                localStorage.setItem("accesstoken", newAccessToken);

                const retryResponse = await axios({
                    method: method,
                    url: apiUrl + url,
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                        "Content-Type": "application/json"
                    },
                    data: body ? JSON.stringify(body) : null
                });

                return {
                    success: true,
                    statusCode: 200,
                    data: retryResponse.data
                };
            } catch (refreshError) {
                return {
                    success: false,
                    statusCode: 401,
                    data: { message: "Refresh token expired. Please login again." }
                };
            }
        }

        return {
            success: false,
            statusCode: status || 400,
            data: error?.response?.data
        };
    }
};
