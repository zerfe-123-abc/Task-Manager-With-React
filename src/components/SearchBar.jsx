import { useState } from "react";
import './SearchBar.css';
const SearchBar = ({query,onSearch}) =>{


   const handleSubmit = (e) =>{
    e.preventDefault();
   }
    return(
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
               <input type="search" placeholder="🔍Search for tasks" value={query} 
               onChange={(e)=>{
                onSearch(e.target.value);
               }}/>
            </form>
        </div>
    )
}
export default SearchBar;