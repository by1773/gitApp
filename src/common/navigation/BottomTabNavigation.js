import React, {Component} from 'react';
import {createBottomTabNavigator, createAppContainer} from "react-navigation";
import HomePage from '../../pages/HomePage'     //主页
import PersonalPage from '../../pages/PersonalPage'  //我的页面
import TrendPage from '../../pages/TrendPage' //趋势页面
import PopularPage from '../../pages/PopularPage' //最新页面
import FavoritePage from '../../pages/FavoritePage' //我的搜藏页面
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux'
type Props = {};

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: "最热",
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    },
    TrendPage:
        {
            screen: TrendPage,
            navigationOptions: {
                tabBarLabel: "趋势",
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={'md-trending-up'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        }
    ,
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    },
    PersonalPage: {
        screen: PersonalPage,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({tintColor, focused}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    }
};

class BottomTabNavigation extends Component<Props> {
    constructor(props) {
        super(props);
        console.disableYellowBox = false;//／／
        console.log(this.props)

    }

    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs;
        }
        const {PopularPage, TrendPage,FavoritePage, PersonalPage} = TABS;
        const tabs = {PopularPage,TrendPage, FavoritePage,PersonalPage};//根据需要定制显示的tab
        // HomePage.navigationOptions.tabBarLabel = '我的';//动态配置Tab属性
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
                tabBarComponent: props => {
                    return <TabBarComponent theme={this.props.theme} {...props}/>
                }
            }
        ))
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab
            onNavigationStateChange={(prevState, newState, action) => {
                // EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {//发送底部tab切换的事件
                //     from: prevState.index,
                //     to: newState.index
                // })
            }}
        />
    }
}

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
             tintColor: props.activeTintColor,
             updateTime: new Date().getTime(),
        }
    }

    render() {
        return <BottomTabBar
            {...this.props}
             activeTintColor={this.props.theme.themeColor}    
        />
    }
}
const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(BottomTabNavigation);

