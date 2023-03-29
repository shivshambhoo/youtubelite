import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api"

export const Context = createContext();

export const AppContext = (props) => {
    // create state 
    const [loding, setLoading] = useState(false);
    const [searchResults, setsearchResults] = useState([]);
    const [selectCategories, setselectCategories] = useState("New");
    const [mobileMenu, setmobileMenu] = useState(false);

    // useEffect use
    useEffect(() => {
        fetchSelectedCategoryData(selectCategories)
    }, [selectCategories]);

    // fetch Api Methed call
    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`).then(({contents})=>{
            console.log(contents);
            setsearchResults(contents);
            setLoading(false);  
        })
    }


    return (
        <Context.Provider
            value={{
                loding, setLoading,
                searchResults, 
                selectCategories, setselectCategories,
                mobileMenu, setmobileMenu,
            }}>
            {props.children}
        </Context.Provider>
    )
}