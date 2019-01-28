import {createStackNavigator, createSwitchNavigator, createAppContainer} from "react-navigation";
import React,{Component} from 'react'
import {View,Text} from 'react-native'
// 引入页面
import HomePage from '../../pages/HomePage';
import PersonalPage from '../../pages/PersonalPage';
import TrendPage from '../../pages/TrendPage';
import WelcomePage from '../../pages/WelcomePage';

 const rootCom = 'Init';//设置根路由

 const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen:WelcomePage
    }
});
 const MainNavigator = createStackNavigator({
    HomePage: {
        screen:HomePage
    }
},
{
    defaultNavigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
}
);
// export const AppStackNavigator =  createAppContainer(MainNavigator);
// export default SwitchNavigator(
//     {
//         welcome: WelComePage,
//         App: AppStackNavigator,
//     },
//     {
//         initialRouteName: 'welcome',
//     }
// )
export default  createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    initialRouteName:'Init'
}
));



