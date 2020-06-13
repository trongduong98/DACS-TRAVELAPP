import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {IMAGE} from '../constants/image';
const {width, height} = Dimensions.get('screen');
import {FlatList} from 'react-native-gesture-handler';

export class LichSuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCards: [],
    };
  }
  componentDidMount() {
    fetch('http:192.168.1.4:81/listTourLichSu.php')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          listCards: responseJson,
        });
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.view}>
        <View style={styles.list}>
          <FlatList
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            data={this.state.listCards}
            renderItem={({item}) => (
              <View style={styles.flatlist}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('HomeDetail', {ThamSo: item})
                  }>
                  <Image
                    source={{uri: item.imageBackground}}
                    style={[styles.image, styles.shadow]}
                  />
                  <View style={styles.text}>
                    <Text style={styles.Header_Text}>{item.name}</Text>
                    <Text style={styles.price_Text}>{item.price} VNĐ</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'rgba(135,206,250,0.3)',
  },
  list: {
    flex: 1,
    marginHorizontal: 20,
  },
  flatlist: {
    marginVertical: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    backgroundColor: 'rgba(230,230,250,1)',
    borderBottomRightRadius: 20,
  },
  Header_Text: {
    fontSize: 23,
    marginLeft: 15,
  },
  Title_Text: {
    marginLeft: 20,
    fontSize: 16,
    color: 'gray',
  },
  price_Text: {
    fontSize: 20,
    marginLeft: 15,
  },
  shadow: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});
