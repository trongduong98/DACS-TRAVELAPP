import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IMAGE} from '../src/constants/image';

export class CustomDrawerConten extends Component {
  render() {
    return (
      <SafeAreaView style={styles.customDrawerConten}>
        <View style={styles.AccountView}>
          <Image source={IMAGE.ICON_ACOUNT} style={styles.accountImage} />
        </View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MenuTab')}>
            <Text style={styles.drawerMenu}>Meunu tab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Notifications')}>
            <Text style={styles.drawerMenu}>Notifications tab</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.drawerMenuLogout}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  customDrawerConten: {
    flex: 1,
    backgroundColor: 'rgb(135,206,250)',
  },
  AccountView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  accountImage: {
    height: 120,
    width: 120,
    borderRadius: 50,
  },
  drawerMenu: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 15,
  },
  drawerMenuLogout: {
    fontSize: 20,
    marginBottom: 30,
    marginLeft: 180,
    color: 'red',
  },
});
