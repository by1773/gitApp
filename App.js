import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import Navigation from './src/common/navigation/Navigation'
import { Provider } from 'react-native'
import store from './src/store/index'
type Props = {};
export default class App extends Component<Props> {
    constructor(props){
      super(props)
    }
    render() {
      return   <Provider store={store}>
                    <Navigation></Navigation>
                </Provider>
        
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
