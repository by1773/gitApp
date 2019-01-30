import {createStackNavigator, createSwitchNavigator, createAppContainer} from "react-navigation";
import React,{Component} from 'react'
// 引入页面
import HomePage from '../../pages/HomePage';
import PopularDetailPage from '../../pages/PopularPage/PopularDetailPage';
import WelcomePage from '../../pages/WelcomePage';
import SearchPage from '../../pages/SearchPage/SearchPage'
import CustomKeyPage from '../../pages/PersonalPage/CustomKeyPage'
// store 方法
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
 export const rootCom = 'Init';//设置根路由

 const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen:WelcomePage,
        navigationOptions:{
            header:null,
        }
    }
});
 const MainNavigator = createStackNavigator({
    HomePage: {
        screen:HomePage,
        navigationOptions:{
            header:null,
        }
    },
    PopularDetailPage:{
        screen:PopularDetailPage,
        navigationOptions:{
            header:null
        }
    },
    SearchPage:{
        screen:SearchPage,
        navigationOptions:{
            header:null,
        }
    },
    CustomKeyPage: {
        screen: CustomKeyPage,
        navigationOptions: {
            header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        }
    },
},
{
    defaultNavigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
}
);
export const RootNavigator = createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    initialRouteName:'Init'
}
));

export const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
    state: state.nav,//v2
});
/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);


