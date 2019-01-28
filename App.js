import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import Navigation from './src/common/navigation/Navigation'

// import BottomTabNavigation from './src/common/navigation/BottomTabNavigation'
type Props = {};
export default class App extends Component<Props> {
    constructor(props){
      super(props)
      console.log(Navigation)
    }
    render() {
        // <Navigation></Navigation>
        // <BottomTabNavigation></BottomTabNavigation>
        
      return  <Navigation></Navigation>
        
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
