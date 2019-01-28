import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import BottomTabNavigation from '../common/navigation/BottomTabNavigation'
type Props = {};
export default class HomePage extends Component<Props> {
    render() {
        // <AppStackNavigator></AppStackNavigator>
        return  <BottomTabNavigation></BottomTabNavigation>
        
    }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center',
  },
  line: {
      flex: 1,
      height: 0.3,
      backgroundColor: 'darkgray',
  },
  hidden: {
      height: 0
  },
  item: {
      backgroundColor: "#F8F8F8",
      borderBottomWidth: 1,
      borderColor: '#eee',
      height: 50,
      justifyContent: 'center'
  },
});
