import axios from 'axios';

export const getSearchedRecipes = async (requestType, query) => {
    try {
        const response = await axios.get(`/api/search/${requestType}/query=${query}?limit=12`);
        return response.data;
    } catch (error){
        console.log(error);
    }
};