import * as React from 'react';
import {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {IMAGE} from '../constants/image';

const {height} = Dimensions.get('screen');
const height_logo = height * 0.8 * 0.76;
export class StartsScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.background}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceInDown"
            source={IMAGE.ICON_LOGO_START}
            resizeMode="stretch"
            style={styles.logo}
          />
        </View>
        <Animatable.View animation="bounceInUp" style={styles.footer}>
          <Text style={styles.hello}>Stay connect with everywhere!</Text>
          <Text style={styles.sing}>Sing in with account</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.login}>
            <Text style={styles.button}>Get started ></Text>
          </TouchableOpacity>
        </Animatable.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgb(65,105,225)',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  hello: {
    fontSize: 30,
    color: 'blue',
    fontWeight: 'bold',
  },
  sing: {
    color: 'gray',
    marginTop: 6,
  },
  login: {
    width: 140,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(65,105,225)',
    borderRadius: 50,
    marginTop: 60,
    marginLeft: 220,
  },
  button: {
    color: 'white',
    fontSize: 18,
  },
});
