import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosState = (keyInLS, baseUrl) => {
    const [responses, setResponses] = useLocalStorage(keyInLS);

    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
        const response = await axios.get(`${baseUrl}${restOfUrl}`);
        setResponses(data => [...data, formatter(response.data)]);
    };

    return [responses, addResponseData];
}

function useLocalStorage(key, initialValue = []) {
    if (localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export default useAxiosState;
export { useAxiosState, useLocalStorage };