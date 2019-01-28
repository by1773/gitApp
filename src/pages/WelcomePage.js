import React, {Component} from 'react';
import NavigationUtil from "../common/navigation/NavigationUtil";
import SplashScreen from 'react-native-splash-screen'
// import actions from "../action";
// import {connect} from "react-redux";
import {
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'
 
type Props = {};

export default class WelcomePage extends Component<Props> {
    constructor(props){
      super(props)
      this.state = {
        // text:'',
        // alertMsg:'邮箱'
      }
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
            <View style={styles.formItem}>
            <TextInput
              style ={styles.inputs}
              onChangeText={(v) => {}}
              value='邮箱'
            />
            </View>
            <View style={styles.formItem}>
            <TextInput
              style ={styles.inputs}
              onChangeText={(v) => {}}
              value='密码'
            />
            </View>
            <View style={styles.formItem}>
            <Button
                onPress={()=>{
                  this.changeNavgation()
                }}
                title="登录"
                color="#841584"
                style={styles.btn}
              />
            </View>
        </View>;
    }
}
// const mapDispatchToProps = dispatch => ({
//     onThemeInit: () => dispatch(actions.onThemeInit()),
// });

// export default connect(null, mapDispatchToProps)(WelcomePage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  inputs: {
    height: 40, 
    width:200,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius:20
  },
  formItem:{
    borderRadius: 20,
    marginBottom:12,
    // flex:1,
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  btn:{
    backgroundColor:'#333'
  }
});