import React, { useCallback, useEffect, useState } from "react";
import {View,Text,StyleSheet, Platform,Button,TouchableHighlight} from 'react-native';
import { Switch } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {HeaderButtons,Item} from 'react-navigation-header-buttons'; 
import { Headerbuttons } from "../.expo/components/Headerbuttons"; 
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableRipple } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setFilters } from "./store/actions/ameals";
const FilterSwitch = props =>{
    return(
<View style ={styles.FilterContainer} >
                <Text>{props.label}</Text>
                <Switch 
                trackColor={{true:'blue'}}
                thumbColor={Platform.OS ==="android" ? "blue" : ""}
                value ={props.state}
                 onValueChange={props.onChange} />
            </View>
    )
}
const FiltersScreen = props =>{

    const [isGlutenFree, SetisGlutenFree] = useState(false)
    const [isLactoseFree, SetisLactiseFree] = useState(false)
    const [isVegan, SetisVegan] = useState(false)
    const [isVegetarian, SetisVegetarain] = useState(false)

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const saveFilters = React.useCallback(() => {
      const appliedFilters = {
        glutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        veganFree: isVegan,
        vegetarianFree:isVegetarian,
      };
      dispatch(setFilters(appliedFilters));

    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian,dispatch]);
    React.useEffect(() => {
      navigation.setOptions({
        headerRight:()=>( 
            <HeaderButtons HeaderButtonComponent={Headerbuttons} >
               <TouchableRipple
          onPress={saveFilters}
          style={{ borderRadius: 50, overflow: "visible" }}
          rippleColor="rgba(39, 41, 48, 3)"
          borderless={true}
        >
<Ionicons name="ios-save" size={25} color={'white'}/>
        </TouchableRipple>
            </HeaderButtons>
           )
      });
    }, [navigation, saveFilters]);
    return(
        <View style = {styles.screen} >
            <Text style ={styles.title} >Available Filters / Restrictions</Text>
            <FilterSwitch label ="Gluten-Free"
             state ={isGlutenFree} 
            onChange ={newVlaue => SetisGlutenFree(newVlaue)} />

            <FilterSwitch label ="Lactose-Free"
             state ={isLactoseFree} 
            onChange ={newVlaue => SetisLactiseFree(newVlaue)} />

            <FilterSwitch label ="Vegan"
             state ={isVegan} 
            onChange ={newVlaue => SetisVegan(newVlaue)} />

            <FilterSwitch label ="Vegetarian"
             state ={isVegetarian} 
            onChange ={newVlaue => SetisVegetarain(newVlaue)} />
            
        </View>
    )
};

const styles = StyleSheet.create({

    screen:{
        flex:1,
        alignItems:"center"
    },
    title:{
        fontFamily:"MyCustomFont-Bold",
        fontSize:22,
        margin:20,
        textAlign:"center"
    },
    FilterContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"80%"
    }
});
export default FiltersScreen;