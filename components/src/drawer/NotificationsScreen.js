import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {CustomHeader} from '../index';

export class NotificationsScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          Title="Notifications"
          navigation={this.props.navigation}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Notifications detail</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  headerCustomStyle: {
    flexDirection: 'row',
    height: 50,
  },
  headerRowMenu: {
    flex: 1,
    borderColor: 'red',
  },
  headerRowTitle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMenu: {
    width: 30,
    height: 30,
    marginLeft: 6,
    marginTop: 5,
  },
  customDrawerConten: {
    flex: 1,
    marginLeft: 13,
    marginTop: 5,
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
});
