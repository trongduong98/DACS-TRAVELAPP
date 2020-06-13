/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './components/src/APP';
//import App from './testScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
