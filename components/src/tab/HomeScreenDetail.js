import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import {CustomHeader} from '../index';
import {CartStack} from '../APP';
import {Button, Text} from 'native-base';

export class HomeScreenDetail extends Component {
  scrollX = new Animated.Value(0);
  constructor(props) {
    super(props);
    this.state = {};
  }
  addToCart(ThamSo) {
    let tourAdd = {
      id: ThamSo.id,
      name: ThamSo.name,
      price: ThamSo.price,
      imageBackground: ThamSo.imageBackground,
      quantity: 1,
    };
    this.props.navigation.navigate('Cart', {
      screen: 'Cart',
      params: tourAdd,
    });
  }
  render() {
    const {ThamSo} = this.props.route.params;
    return (
      <SafeAreaView style={styles.flex}>
        <CustomHeader Title="Thông tin" navigation={this.props.navigation} />
        <View style={styles.flex}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {x: this.scrollX}}},
            ])}
            snapToAlignment="center">
            {ThamSo.images.map((img, index) => (
              <Image
                key={`${index}-${img}`}
                source={{uri: img}}
                resizeMode="cover"
                style={[styles.styleImg, styles.flex]}
              />
            ))}
          </ScrollView>
        </View>
        <View style={[styles.flex]}>
          <ScrollView>
            <Text style={styles.DetailName}>{ThamSo.name}</Text>
            <Text style={styles.descriptiontour}>{ThamSo.description}</Text>
          </ScrollView>
        </View>
        <View style={styles.GiaTour}>
          <Text style={styles.Gia}>{ThamSo.price} VNĐ</Text>
          <View style={styles.buttomDatTour}>
            <Button rounded danger>
              <TouchableOpacity onPress={() => this.addToCart(ThamSo)}>
                <Text style={styles.datTour}> Đặt Tour </Text>
              </TouchableOpacity>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  infoTour: {
    position: 'absolute',
    borderRadius: 12,
    left: 40,
    right: 40,
    backgroundColor: 'rgba(135,206,250,0.7)',
  },
  flex: {
    flex: 1,
  },
  flexrow: {
    flexDirection: 'row',
  },
  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 36,
    right: 0,
    left: 0,
  },
  listInf: {
    flex: 4,
  },
  GiaTour: {
    flex: 0.2,
    flexDirection: 'row',
  },
  buttomDatTour: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 40,
  },
  styleImg: {
    height: 250,
    width: 420,
  },
  headerConten: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ContenTour: {
    fontSize: 15,
  },
  DetailName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 14,
  },
  descriptiontour: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  Gia: {
    fontSize: 30,
    marginLeft: 6,
    marginTop: 4,
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datTour: {
    fontSize: 28,
  },
});
