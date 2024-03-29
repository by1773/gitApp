import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, DeviceInfo} from 'react-native';
import {WebView}from 'react-native-webview';
import NavigationBar from '../../common/navigation/NavigationBar'
import ViewUtil from "../../utils/ViewUtil";
import share from "../../extend/Res/data/share";
import ShareUtil from "../../utils/ShareUtil";
import SafeAreaViewPlus from "../../common/SafeAreaViewPlus";
const TRENDING_URL = 'https://github.com/';
type Props = {};
const THEME_COLOR = '#678';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from "../../common/navigation/NavigationUtil";
//import BackPressComponent from "../common/BackPressComponent";
import FavoriteDao from "../../extend/Dao/FavoriteDao";

export default class PopularDetailPage extends Component<Props> {
    constructor(props) {
        super(props);
        // params
        // theme
        // projectModel
        // flag: FLAG_STORAGE.flag_popular
        // callback
        this.params = this.props.navigation.state.params;
        console.log(this.params)
        const {projectModel,flag} = this.params;
        this.favoriteDao = new FavoriteDao(flag);
        this.url = projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName;
        const title = projectModel.item.full_name || projectModel.item.fullName;
        this.state = {
            title: title,
            url: this.url,
            canGoBack: false,
            isFavorite:projectModel.isFavorite
        };
        // this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
    }

    componentDidMount() {
        // this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        // this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }
    onFavoriteButtonClick(){
        const {projectModel,callback}=this.params;
        const isFavorite=projectModel.isFavorite=!projectModel.isFavorite;
        callback(isFavorite);//更新Item的收藏状态
        this.setState({
            isFavorite:isFavorite,
        });
        let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
    }
    renderRightButton() {
        return (<View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => this.onFavoriteButtonClick()}>
                    <FontAwesome
                        name={this.state.isFavorite ? 'star' : 'star-o'}
                        size={20}
                        style={{color: 'white', marginRight: 10}}
                    />
                </TouchableOpacity>
                {ViewUtil.getShareButton(() => {
                    let shareApp = share.share_app;
                    ShareUtil.shareboard(shareApp.content, shareApp.imgUrl, this.url, shareApp.title, [0, 1, 2, 3, 4, 5, 6], (code, message) => {
                        console.log("result:" + code + message);
                    });
                })}
            </View>
        )
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    render() {
        const {theme} = this.params;
        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            titleLayoutStyle={titleLayoutStyle}
            title={this.state.title}
            // style={theme.styles.navBar}
            rightButton={this.renderRightButton()}
        />;

        return (
            <SafeAreaViewPlus
                // topColor={theme.themeColor}
            >
                {navigationBar}
                <WebView
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}
                />
            </SafeAreaViewPlus>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
    },
});
