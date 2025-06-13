import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL

export const postData = async (url, formData) => {
    try {
        const respone = await axios({
            method: 'POST',
            url: apiUrl + url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": 'application/json'
            },
            data: JSON.stringify(formData)
        })

        console.log(respone);

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
