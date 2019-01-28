import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, Text, View, FlatList, RefreshControl,TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation";
import NavigationUtil from '../common/navigation/NavigationUtil'
import NavigationBar from '../common/navigation/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EventBus from "react-native-event-bus";
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
type Props = {};
import keys from '../resourse/mock/keys'
import DataStore from '../utils/fetch/DataStore'
import PopularItem from '../components/PopularPage/PopularItem'
export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props);
        console.disableYellowBox = false //去掉警告提示
        console.ignoredYellowBox = false //去掉警告提示
    }
    _genTabs() {
        const tabs = {};
        keys.forEach((item, index) => {
            if (item.checked) {
                tabs[`tab${index}`] = {
                    screen: props => <PopularTabPage {...props} tabLabel={item.name} />,
                    navigationOptions: {
                        title: item.name
                    }
                }
            }
        });
        return tabs;
    }
    renderRightButton() {
        return <TouchableOpacity
            onPress={() => {
                // AnalyticsUtil.track("SearchButtonClick");
                // NavigationUtil.goPage({theme}, 'SearchPage')
            }}
        >
            <View style={{padding: 5, marginRight: 8}}>
                <Ionicons
                    name={'ios-search'}
                    size={24}
                    style={{
                        marginRight: 8,
                        alignSelf: 'center',
                        color: 'white',
                    }}/>
            </View>
        </TouchableOpacity>
    }
    render() {
        const {theme} = this.props;
        let statusBar = {
            // backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        };
        let navigationBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            // style={theme.styles.navBar}
            // rightButton={this.renderRightButton()}
        />;
        const TabNavigator = keys.length ? createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,//是否使标签大写，默认为true
                    scrollEnabled: true,//是否支持 选项卡滚动，默认false
                    style: {
                        // backgroundColor: theme.themeColor,//TabBar 的背景颜色
                        height: 30//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                    },
                    indicatorStyle: styles.indicatorStyle,//标签指示器的样式
                    labelStyle: styles.labelStyle,//文字的样式
                },
                lazy: true
            }
        )) : null;
        return <View style={styles.container}>
            {navigationBar}
            {/* <Text>---</Text> */}
            {TabNavigator && <TabNavigator/>}
        </View>
    }
}

const pageSize = 10;//设为常量，防止修改
class PopularTabPage extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
        this.isFavoriteChanged = false;
        this.state = {
            dataSourse:[]
        }
    }

    componentDidMount() {
        this.loadData();
        // EventBus.getInstance().addListener(EventTypes.favorite_changed_popular, this.favoriteChangeListener = () => {
        //     this.isFavoriteChanged = true;
        // });
        // EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
        //     if (data.to === 0 && this.isFavoriteChanged) {
        //         this.loadData(null, true);
        //     }
        // })
    }

    // componentWillUnmount() {
    //     EventBus.getInstance().removeListener(this.favoriteChangeListener);
    //     EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    // }

    loadData(loadMore, refreshFavorite) {
        const {onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite} = this.props;
        // const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback => {
                this.refs.toast.show('没有更多了');
            })
        } else if (refreshFavorite) {
            // onFlushPopularFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao);
        } else {
            const DS = new DataStore()
            DS.fetchData(url).then(({data})=>{
                console.log(data)
                this.setState({
                    dataSourse:data.items
                })
            })
            // onRefreshPopular(this.storeName, url, pageSize, favoriteDao)
        }
    }
    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    // 单元渲染
    renderItem(data) {
        return <PopularItem
            projectModel={data}
            onSelect={
            (callback) => {
                // NavigationUtil.goPage({
                //     theme,
                //     projectModel: item,
                //     flag: FLAG_STORAGE.flag_popular,
                //     callback,
                // }, 'DetailPage')
            }
            }
            // onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}
        />
    }
    // 底部加载完毕
    genIndicator() {
        return <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    render() {
        // let store = this._store();
        const {tabLabel}=this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSourse}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            onRefresh={() => this.loadData()}
                        />
                    }
                />
                {/* <Toast ref={'toast'}
                       position={'center'}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
        width:100,
        padding: 0
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
