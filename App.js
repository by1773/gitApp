import React, {Component} from 'react';
import Navigation from './src/common/navigation/Navigation'
import { Provider } from 'react-redux'
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

