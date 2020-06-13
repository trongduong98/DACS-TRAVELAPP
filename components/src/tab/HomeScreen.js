import * as React from 'react';
import {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {CustomHeader} from '../index';
import {IMAGE} from '../constants/image';
const {width, height} = Dimensions.get('screen');

export class HomeScreen extends Component {
  //banner tự chuyển ảnh
  constructor(props) {
    super(props);
    this.state = {
      pointer: 0,
      listImage: [
        {
          url: IMAGE.IMG_BANNER2,
        },
        {
          url: IMAGE.IMG_BANNER3,
        },
        {
          url: IMAGE.IMG_BANNER4,
        },
      ],
      listCards: [],
    };
  }
  changeImage() {
    let pointer = this.state.pointer;
    pointer = pointer + 1;
    if (pointer === this.state.listImage.length) {
      pointer = 0;
    }
    this.setState({
      pointer: pointer,
    });
  }
  componentDidMount() {
    fetch('http://192.168.1.4:81/listTourHot.php')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          listCards: responseJson,
        });
      });
    this._interval = setInterval(() => {
      this.changeImage();
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this._interval);
  }
  //kết thúc tự chuyển ảnh banner
  render() {
    return (
      <View style={styles.styleFex}>
        <CustomHeader
          Title="Home"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View style={[styles.viewBanner, styles.colum]}>
          <ImageBackground
            style={[styles.styleFex, styles.shadow, styles.banner]}
            imageStyle={styles.imgBackground}
            source={{uri: this.state.listImage[this.state.pointer].url}}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.TieuDeList}>Địa điểm nỗi bật</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('More')}>
            <Text style={styles.XemThem}>Xem thêm ></Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.styleFex, styles.viewList, styles.colum]}>
          <FlatList
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            data={this.state.listCards}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('HomeDetail', {ThamSo: item})
                  }>
                  <ImageBackground
                    source={{uri: item.imageBackground}}
                    imageStyle={styles.backgroundimagelistour}
                    style={[styles.imageCard, styles.shadow]}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.price} VNĐ</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  styleFex: {
    flex: 1,
  },
  colum: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  viewBanner: {
    paddingHorizontal: 20,
    flex: 0.8,
  },
  viewList: {
    paddingHorizontal: 10,
  },
  banner: {
    width: width - 20 * 2,
    borderRadius: 12,
    marginLeft: 2,
    marginHorizontal: 10,
    overflow: 'visible',
  },
  infoImage: {
    position: 'absolute',
    borderRadius: 12,
    padding: 24,
    right: 36,
    left: 36,
    bottom: -35,
    backgroundColor: 'rgba(135,206,250,0.7)',
  },
  lisCard: {
    marginTop: 50,
    overflow: 'visible',
  },
  imageCard: {
    width: width - 120 * 2,
    height: height - 260 * 2,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  backgroundimagelistour: {
    width: width - 120 * 2,
    height: height - 260 * 2,
    borderRadius: 20,
  },
  listImgCard: {
    width: width - 36 * 2,
    borderRadius: 12,
    marginLeft: 12,
    backgroundColor: 'gray',
  },
  TieuDeList: {
    marginTop: 39,
    marginBottom: 10,
    marginLeft: 14,
    fontSize: 20,
    overflow: 'visible',
  },
  XemThem: {
    marginTop: 39,
    marginBottom: 10,
    marginLeft: 130,
    fontSize: 20,
    textDecorationLine: 'underline',
    overflow: 'visible',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10.6,
    //borderWidth: 0.4,
    elevation: 18,
  },
  imgBackground: {
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
    marginTop: 4,
  },
});
