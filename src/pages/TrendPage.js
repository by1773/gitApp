import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
type Props = {};

export default  class TrendPage extends Component<Props> {

  constructor(props) {
    super(props);

  }

  render(){
    return  <View style={styles.container}>
              <Text>TrendPage</Text>
            </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})