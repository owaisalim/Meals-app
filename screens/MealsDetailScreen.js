import React, { useEffect,useCallback } from "react";
import {View,Text,StyleSheet, Button,ScrollView,Image} from 'react-native';
import { MEALS } from "./Data/dummy-data";
import { useRoute } from "@react-navigation/native";
import DefautlText from "../.expo/components/DefaultText";
import {HeaderButtons,Item} from 'react-navigation-header-buttons'; 
import { Headerbuttons } from "../.expo/components/Headerbuttons"; 
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch} from "react-redux";
import { toggleFavorite } from "./store/actions/ameals";
import { TouchableRipple } from 'react-native-paper';

const ListItem = props =>{
    return <View style ={styles.listItem} >
        <DefautlText>{props.children}</DefautlText>
    </View>
}
const MealsDetailScreen =({navigation}) =>{
    const dispatch = useDispatch()
    const availableMeals = useSelector(state =>state.meals.meals);
    const {mealId} = useRoute().params;
    const currentMealsIsFavorite= useSelector(state =>state.meals.favoriteMeals.some(meal =>meal.id ===mealId));

    
   const {mealTittle} = useRoute().params;
    const selectedMeal =availableMeals.find(meal => meal.id === mealId)

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() =>{
     navigation.setParams({mealTittle:selectedMeal.title})
     navigation.setParams({isFav: currentMealsIsFavorite})


     
 },[toggleFavoriteHandler,navigation,currentMealsIsFavorite]);

 
   const {isFav} = useRoute().params;
    
useEffect(()=>{


 navigation.setOptions({
    headerRight:()=>( 
        <HeaderButtons HeaderButtonComponent={Headerbuttons} >
           <TouchableRipple
      onPress={toggleFavoriteHandler}
      style={{ borderRadius: 30, overflow:"visible" }}
      rippleColor="rgba(39, 41, 48, 50)"
      borderless={true}
    >
        
<Ionicons name= {isFav ? 'ios-star' : 'ios-star-outline'} size={20} color={'white'}/>
    </TouchableRipple>
        </HeaderButtons>
       )
  });
})
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: mealTittle
        });
      }, [navigation, mealTittle]);
 
   
    return(
        <ScrollView>
            <Image source={{uri:selectedMeal.imageUrl}} style ={styles.image} />
            <View style ={styles.Details}>
        <DefautlText>{selectedMeal.duration}m</DefautlText>
        <DefautlText>{selectedMeal.complexity.toUpperCase()}</DefautlText>
        <DefautlText>{selectedMeal.affordability.toUpperCase()}</DefautlText>
       </View>
        <Text style ={styles.title} >Ingredients</Text>
        {selectedMeal.ingredients.map(ingredients =>(
            <ListItem key={ingredients} >{ingredients}</ListItem>
           ))}
        <Text style ={styles.title} >steps</Text>
        {selectedMeal.steps.map(step =>(
            <ListItem key={step} >{step}</ListItem>
           ))}
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    image:{
        width:"100%",
        height:200
    },
    Details:{
        flexDirection:"row",
        padding:15,
        justifyContent:"space-around"
    },
    title:{
       textAlign:"center",
       fontFamily:"MyCustomFont-Bold",
       fontSize:22,
    },
    listItem:{
        marginVertical:10,
        marginHorizontal:20,
        borderColor:"#ccc",
        borderWidth:1,
        padding:10
    }
});


export default MealsDetailScreen;