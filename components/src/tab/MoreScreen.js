import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {
  KhamPhaScreen,
  TraiNgiemScreen,
  LichSuScreen,
  NghiDuongScreen,
  TatCaScreen,
} from '../function';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();

export class MoreScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.flex}>
        <TopTab.Navigator
          tabBarOptions={{
            scrollEnabled: true,
            tabStyle: {width: 120},
          }}>
          <TopTab.Screen name="Tất cả" component={TatCaScreen} />
          <TopTab.Screen name="Trải nghiệm" component={TraiNgiemScreen} />
          <TopTab.Screen name="Khám phá" component={KhamPhaScreen} />
          <TopTab.Screen name="Nghỉ dưỡng" component={NghiDuongScreen} />
          <TopTab.Screen name="Lịch sử" component={LichSuScreen} />
        </TopTab.Navigator>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
