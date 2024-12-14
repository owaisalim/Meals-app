import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Platform, Button } from 'react-native';;
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from './screens/CategoriesScreen';
import CategoryMealsScreen from './screens/CategoryMealsScreen';
import MealsDetailScreen from './screens/MealsDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { DefaultTheme } from 'react-native-paper';
import {name as AppName} from './app.json'
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import { useFonts } from 'expo-font';
import Headerbuttons from './.expo/components/Headerbuttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import colors from './constraints/colors';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler'
import FiltersScreen from './screens/FiltersScreen';
//const Tab = createBottomTabNavigator();
import {legacy_createStore, combineReducers } from 'redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import mealsReducer from './screens/store/reducers/meals';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
  meals:mealsReducer
})

const store = legacy_createStore(rootReducer)
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator

    screenOptions={{
      drawerActiveTintColor:"#f4511e",
      drawerLabelStyle:{
        fontFamily:"MyCustomFont-Bold"
      },
      drawerStyle: {
        backgroundColor: '#c6cbef',
        width: 240,
      
      },
      

    }}
    >
      
      <Drawer.Screen name="Meals" component={TabNavigation}
      options={{ headerShown:false }}
      />
      <Drawer.Screen name="Favorites" component={FiltersScreen}

      
      options={{ title:'Filters', 
      headerTitleAlign: 'center',
      headerTintColor:"white",
         headerStyle: {
          backgroundColor:Platform.OS==='android' ?'#f4511e' : 'white'},
         headerTitleStyle: {
          fontWeight: 'bold',
        },
      
    }}
      
      />
    </Drawer.Navigator>
  );
}

const theme = {
  ...DefaultTheme,
  fonts: {
    regular: 'MyCustomFont-Regular',
    medium: 'MyCustomFont-Bold',
  },
};


function Favnavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={FavoritesScreen}
        options={{ title:' Your Favourites', 
        headerTitleAlign: 'center',
        headerTintColor:"white",
           headerStyle: {
            backgroundColor:Platform.OS==='android' ?'#f4511e' : 'white'},
           headerTitleStyle: {
            fontWeight: 'bold',
          },
      }}
      />
    </Stack.Navigator>
  );
}
 const Stack = createStackNavigator();


const Tab = createMaterialBottomTabNavigator();

  function TabNavigation() {    
    return <Tab.Navigator
    
    inactiveColor="black" 
     activeColor ="#f4511e"
    barStyle={{ backgroundColor:'white',
    
    }}>
      <Tab.Screen name='Meals' component={StackNavigation}
      options={{
        tabBarIcon: tabinfo =>{
          return(
          <Ionicons name="ios-restaurant" size={25} color={'#346365'}
          />
       ) }
      }}/>
      <Tab.Screen name="Favourites" component={Favnavigator} 
      options={{
        headerTitleAlign:'center',
        headerTintColor:"white",
           headerStyle:{
            backgroundColor:Platform.OS==='android' ?'#f4511e' : 'white'},
            tabBarIcon: tabinfo =>{
              return(
              <Ionicons name="ios-star" size={25} color={'#346365'}/>
           ) }
      }}/>
    </Tab.Navigator>
}
 function StackNavigation () {
  const [loaded] = useFonts({

    'MyCustomFont-Bold': require('./assets/Fonts/OpenSans-Bold.ttf'),
  });

  if (!loaded) {
    return null; // Render a loading component or null until fonts are loaded
  }

    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  
AppRegistry.registerComponent(AppName, () => App);
const navigation = useNavigation()

  return (

  <Stack.Navigator >
        <Stack.Screen  name="MealCategories" component={CategoriesScreen} 
        options={{
          title: ' Meal Categories',
        headerTitleAlign: 'center',
        headerTintColor:"white",
           headerStyle: {
            backgroundColor:Platform.OS==='android' ?'#f4511e' : 'white'},
           headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft:()=>(   
              <HeaderButtons HeaderButtonComponent={Headerbuttons} >
                <Item 
                title='faav'
                iconName='ios-menu'

                onPress={() =>{
                  navigation.toggleDrawer();
                }}
                />                 
              </HeaderButtons>
             )
           }} />
        <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen}
           options={{
            title: ' Meal Categories',
           headerTitleAlign: 'center',
           headerTintColor:"white",
              headerStyle: {
               backgroundColor:Platform.OS==='android' ?'#f4511e' : 'white'},
              headerTitleStyle:{
               fontWeight: 'bold',
             },
              }} 

        />
        <Stack.Screen name="Mealdetails" component={MealsDetailScreen}
           options={{
           headerTitleAlign: 'center',
           headerTintColor:"white",
              headerStyle: {
               backgroundColor:Platform.OS==='android' ?'#f4511e' : 'white'},
              headerTitleStyle:{
               fontWeight: 'bold',
             },

             }}         
        />
      
      </Stack.Navigator>
      
  )
}

export default function App () {
return(
  <Provider store={store} >
  <NavigationContainer>
<MyDrawer/>
  </NavigationContainer>
  </Provider>
)
}


       



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Headers:{
justifyContent:"center",
alignItems:'center'
  }
});
