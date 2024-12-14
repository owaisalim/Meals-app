import React from "react";
import {View,Text,StyleSheet,Button, FlatList,} from 'react-native';
import { CATEGORIES, MEALS } from "./Data/dummy-data";
import { useRoute } from '@react-navigation/native';
import { useEffect } from "react";
import Meal from "./models/Meals";
import { CommonActions } from '@react-navigation/native';
import MealItem from "../.expo/components/MealItem";
import { useNavigation } from '@react-navigation/native';
import Meallist from "../.expo/components/Meallist";
import { useSelector } from "react-redux";
const CategoryMealsScreen = ({ route,  props , }) =>{
   const navigation = useNavigation();
   

   // const catId = props.navigation.getParam('categoryid');
const {categoryid} = route.params;
   const selectedCategory = CATEGORIES.find(cat =>cat.id===categoryid)

   const availableMeals = useSelector(state =>state.meals.filteredMeals)
const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(categoryid)>=0
);

if(displayedMeals.length === 0){
   return <View style ={styles.content} >
      <Text>
         No meals found, maybe check your filters?
      </Text>
   </View>
}
   React.useLayoutEffect(() => {
    navigation.setOptions({
   
      headerTitle: selectedCategory.title,
        
    });
  }, [navigation, selectedCategory]);


   
  return <Meallist listdata ={displayedMeals} initialParams={{ navigation:navigation}}/>  
};

     



//  CategoryMealsScreen.navigationOptions = navigatinData =>{
//     const catId = props.navigation.getParam('categoryid');
//    const selectedCategory = CATEGORIES.find(cat =>cat.id===catId);
//    return{
//     headerTitle:selectedCategory.title
//    }
   
//  }

 

            //     <Text>
            //     the CategoryMealsScreen
            // </Text>
            // <Text>{selectedCategory.title}</Text>
            // <Button title="Go to Meals Detail" onPress={()=> navigation.navigate(' MealsDetail')} />
  
            // <MealItem 
            // title ={itemData.item.title} 
            // image ={itemData.item.imageUrl}
            // duration ={itemData.item.duration}
            // complexity ={itemData.item.complexity}
            // affordability ={itemData.item.affordability}
    
            // onSelectMeal ={() =>{ 
            
            //       navigation.navigate('MealsDetail', {
    
            // mealId:itemData.item.id
                    
            //       } )} }/>




const styles = StyleSheet.create({

content:{
   flex:1,
   justifyContent:"center",
   alignItems:"center"
}
});


export default CategoryMealsScreen;