import { MEALS } from "../../Data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/ameals";
const initialState ={
    meals:MEALS,
    filteredMeals:MEALS,
    favoriteMeals:[]
};
const mealsReducer = (state = initialState, action) =>{
    switch(action.type){
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meals =>meals.id === action.mealId);
            if(existingIndex >=0){
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1)
                return{...state,  favoriteMeals:updatedFavMeals}
            }
            else{
                const meal = state.meals.find(meal =>meal.id === action.mealId);
                return{...state, favoriteMeals:state.favoriteMeals.concat(meal)}
            }

            case SET_FILTERS:
                const appliedFilters = action.filters
                const updatedfilteredMeals = state.meals.filter(meal =>{

              if(appliedFilters.glutenFree && !meal.isGluetenFree){
                        return false;
                    }
              if(appliedFilters.lactoseFree&& !meal.isLactoseFree){
                        return false;
                    }
              if(appliedFilters.veganFree && !meal.isVegan){
                        return false;
                    } 
             if(appliedFilters.vegetarianFree && !meal.isVergitarian){
                        return false;
                    }
                return true;    
                });
                return {...state, filteredMeals:updatedfilteredMeals}
                default:
              return state;
            }      
}
export default mealsReducer;