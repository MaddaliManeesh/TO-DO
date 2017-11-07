import {TabNavigator,} from 'react-navigation';
  
const BasicApp = TabNavigator({
    Main: {screen: MainScreen},
    Profile: {screen: ProfileScreen},
});