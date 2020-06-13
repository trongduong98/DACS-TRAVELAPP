import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {IMAGE} from '../src/constants/image';

export class CustomHeader extends Component {
  render() {
    let {navigation, isHome, Title} = this.props;
    return (
      <View style={styles.headerCustomStyle}>
        <View style={styles.headerRowMenu}>
          {isHome ? (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={styles.iconMenu}
                source={IMAGE.ICON_MENU}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={styles.iconMenu}
                source={IMAGE.ICON_BACK}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.headerRowTitle}>
          <Text style={styles.TITLE}>{Title}</Text>
        </View>
        <View style={styles.headerRowMenu} />
      </View>
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
    marginTop: 10,
  },
  TITLE: {
    fontSize: 22,
  },
});
