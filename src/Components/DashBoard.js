import React from 'react'
import MarginAndFluctuation from './Recipes/MarginAndFluctuation/MarginAndFluctuation'
import RecipeTabs from './Recipes/DisplayRecipes/RecipeTab'

export default function DashBoard() {
    return (
        <div>
            <MarginAndFluctuation />
            <div style={{margin:'15px'}}>
            <RecipeTabs />
            </div>
        </div>
    )
}
