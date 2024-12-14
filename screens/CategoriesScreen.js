import React from "react";
import {View,Text,StyleSheet, Button, FlatList, TouchableOpacity,Platform} from 'react-native';
import { CATEGORIES } from "./Data/dummy-data";
import CategoryGridtitle from "../.expo/components/CategoryGridtitle";


const CategoriesScreen = props =>{
 const renderGridItem =( itemData) =>{
    
return <CategoryGridtitle 
title = {itemData.item.title}
color = {itemData.item.color}
onSelect ={()=>{
       
    props.navigation.navigate('CategoryMeals', {     
        categoryid:itemData.item.id

    } 
            )}}/>


}
    return(
        <FlatList  keyExtractor={(item, index) =>item.id}
         data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
    )
};



const styles = StyleSheet.create({

    screen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    GridItem:{
        flex:1,
        margin:15,
        height:150,
        

    }
}); 

export default CategoriesScreen;