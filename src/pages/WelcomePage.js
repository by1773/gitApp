import React, {Component} from 'react';
import NavigationUtil from "../common/navigation/NavigationUtil";
import SplashScreen from 'react-native-splash-screen'
// import actions from "../action";
// import {connect} from "react-redux";
import {Dimensions} from "react-native";
const BACKGROUND_COLOR = '#f3f3f4';
const {height, width} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {connect} from "react-redux";
import {
  View,
  TextInput,
  Button,
  Image,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'
 
type Props = {};
import APP_IMG from '../resourse/image/index'

class WelcomePage extends Component<Props> {
    constructor(props){
      super(props)
      console.disableYellowBox = true //去掉警告提示
      console.ignoredYellowBox = true //去掉警告提示
      this.btnColor = this.props.theme.themeColor
    }
    componentDidMount() {
      console.log(this.props)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    changeNavgation(){
      NavigationUtil.resetToHomPage({
        navigation: this.props.navigation
      })
    }
    render() {
        return <View style={styles.container}>
                {/*{头像}*/}
                <Image source={APP_IMG.LOGIN} style={styles.iconStyle}/>
                {/*账号和密码*/}
                <TextInput placeholder={'邮箱'}
                           style={styles.textInputStyle}
                />
                <TextInput placeholder={'密码'}
                           style={styles.textInputStyle}
                           password={true}
                />
                {/*登录*/}
                <TouchableHighlight
                onPress={()=>{
                  this.changeNavgation()
                }}
                >
                <View  style={[styles.loginBtnStyle,{'backgroundColor':this.btnColor}]}>
                  <Text style={{color:'white'}}>登录</Text>
                </View>
                </TouchableHighlight>
                {/*三方登录方式*/}
                <View style={styles.otherLoginStyle}>
                    <FontAwesome
                    name="weixin" 
                    size={24}
                    style={styles.icons}
                    color={'green'}
                    />
                    <FontAwesome
                    name="github" 
                    size={24}
                    style={styles.icons}
                    color={'black'}
                    />
                    <FontAwesome
                    name="weibo" 
                    size={24}
                    style={styles.icons}
                    color={'red'}
                    />
                </View>
                {/*设置*/}
                <View style={styles.settingStyle}>
                    <Text style={styles.rester}>新用户</Text>
                </View>
                
        </View>;
    }
}
const mapStateToProps = state => ({
  theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop:50,
},
iconStyle:{
    width:80,
    height:80,
    marginTop:50,
    borderRadius:40,
    borderWidth:2,
    borderColor:'orange',
    marginBottom:30,
},
textInputStyle:{
    backgroundColor:'white',
    width:width,
    height:40,
    marginBottom:1,
    textAlign:'center',
    paddingLeft:15,
},
loginBtnStyle:{
    height:40,
    width:width*0.8,
    marginTop:30,
    marginBottom:30,
    //flex布局
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8
},
settingStyle:{
    flexDirection:'row',
    width:width*0.8,
    justifyContent:'center',
    marginTop: 20,
},
rester:{
    fontSize:12,
    color:'#aaa'
},
otherLoginStyle: {
    flexDirection:'row',
    alignItems:'center',
    bottom:10,
},
icons:{
    marginLeft:5,
},
otherImageStyle:{
    width:50,
    height:50,
    borderRadius:25,
    marginLeft:10,
}
});