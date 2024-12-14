import React from "react";
import {View,Text,StyleSheet} from 'react-native';
import Meallist from "../.expo/components/Meallist";
import { MEALS } from "./Data/dummy-data";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
const FavoritesScreen = props =>{
    const favMeals = useSelector(state =>state.meals.favoriteMeals);

    if(favMeals.length === 0 || !favMeals){
        return <View style ={styles.content}>
            <Text  >
                No favorite meals found, start adding some!
            </Text>
        </View>
    }
    const navigation = useNavigation();
    return <Meallist listdata ={favMeals}  initialParams={{ navigation: navigation }}  />
        
};

const styles = StyleSheet.create({

    content:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
});


export default FavoritesScreen;