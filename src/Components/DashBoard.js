import React, { Component } from 'react'
import  axios  from "axios";

import RecipeTabs from './Recipes/DisplayRecipes/RecipeTab';
import MarginAndFluctuation from './Recipes/MarginAndFluctuation/MarginAndFluctuation';

export default class DashBoard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             pageNumber:1
        }
    }
    
    componentWillMount(){
        let url = 'https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/recipes/'
        axios.get(url,{
            params:{
                page: this.state.pageNumber
            }
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }
     
    componentDidMount() {
        // let url = 'https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/recipes/'
        // axios.get(url,{
        //     params:{
        //         page: 1
        //     }
        // })
        // .then(res=>console.log(res.data))
        // .catch(err=>console.log(err))
      //  this.changePage();
    }

    changePage(){
        let url = 'https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/recipes/'
        axios.get(url,{
            params:{
                page: this.state.pageNumber
            }
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

    handlePage=()=>{
        console.log("button pressed!!");
        this.setState({
            pageNumber:this.state.pageNumber+1
        },()=>this.changePage())

        
    }

    render() {
        return (
            
            <div>
                <>
                <MarginAndFluctuation />
                 </>
                {/* hello dear
                <button onClick={()=>this.handlePage()}>ChangePage</button> */}
                <RecipeTabs />
            </div>
        )
    }
}
