import React from 'react'

const Search = ({searchTerm , setsearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src="search.svg" alt="search" />

            <input type="text" placeholder='Find your movie from thousand of stocks' value={searchTerm} 
            onChange={(e)=>setsearchTerm(e.target.value)} />
        </div>
      
    </div>
  )
}

export default Search
