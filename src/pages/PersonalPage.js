import React, {Component} from 'react'
import NavigationBar from '../common/navigation/NavigationBar';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
type Props = {};

export default class PersonalPage extends Component<Props> {

  constructor(props) {
    super(props);

  }

  render(){
    let statusBar = {
      backgroundColor: '#000',
      barStyle: 'light-content',
    };
    let navigationBar =
      <NavigationBar
          title={'我的'}
          statusBar={statusBar}
          style ={{marginTop:30}}
      />;
    return  <View style={styles.container}>
             {navigationBar}
            </View>
    }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  }
})