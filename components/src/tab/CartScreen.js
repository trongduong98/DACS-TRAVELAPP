import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {CustomHeader} from '../index';
import InputSpinner from 'react-native-input-spinner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import {IMAGE} from '../constants/image';

export class CartScreen extends Component {
  async setCart(cart) {
    try {
      await AsyncStorage.setItem('@Cart', JSON.stringify(cart));
      this.setState({
        cart: cart,
      });
    } catch (e) {
      //save error
    }
  }
  async getCart() {
    try {
      let cart = await AsyncStorage.getItem('@Cart');
      if (cart != null) {
        this.setState({
          cart: JSON.parse(cart),
        });
      }
    } catch (e) {
      // read error
    }
  }
  async removeCart() {
    try {
      await AsyncStorage.removeItem('@Cart');
    } catch (e) {
      // read error
    }
  }
  addItemCart(product) {
    // Get current list of products
    let products = this.state.cart.products;
    let idx = this.search(product, this.state.cart.products);
    // Update the total price by quantity * price of the added product
    let totalPrice =
      this.state.cart.totalPrice + product.price * product.quantity;
    if (idx > -1) {
      products[idx].quantity += 1;
    } else {
      products.push(product);
    }
    // Update the state
    let cart = {
      products: products,
      totalPrice: totalPrice,
    };
    this.setCart(cart);
  }
  editItemCart(product, operation) {
    // Get current list of products
    let products = this.state.cart.products;
    let idx = this.search(product, products);
    let totalPrice = parseInt(this.state.cart.totalPrice);

    if (operation == 'add') {
      totalPrice += parseInt(product.price);
      products[idx].quantity += 1;
    } else if (operation == 'sub') {
      if (products[idx].quantity > 1) {
        totalPrice -= parseInt(product.price);
        products[idx].quantity -= 1;
      }
    }
    // Update the state
    let cart = {
      products: products,
      totalPrice: totalPrice,
    };
    this.setCart(cart);
  }
  removeItemCart(product) {
    let products = this.state.cart.products;
    let idx = this.search(product, products);
    let totalPrice =
      this.state.cart.totalPrice - product.price * product.quantity;
    // Remove single item
    products.splice(idx, 1);
    // Update the state
    let cart = {
      products: products,
      totalPrice: totalPrice,
    };
    this.setCart(cart);
  }
  search(product, products) {
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        return i;
      }
    }
    return -1;
  }
  constructor(props) {
    super(props);
    this.state = {
      cart: {
        products: [],
        totalPrice: 0,
      },
      nameInput: '',
      phoneInput: '',
      addressInput: '',
    };
  }
  createBill() {
    // navigation
    let navigation = this.props.navigation;
    if (this.state.phoneInput != '') {
      // Gửi thông tin lên server 192.168.64.2
      fetch('http://192.168.1.4:81/createBillTour.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: this.state.nameInput,
          phone: this.state.phoneInput,
        }),
      })
        .then(response => response.text())
        .then(function(data) {
          // Thông báo đặt hàng thành công
          // eslint-disable-next-line no-alert
          alert(
            'Cám ơn bạn đã đặt tour ! Chúng tôi sẽ liên hệ bạn sớm nhất có thể',
          );
          // Chuyển về trang chủ
          navigation.navigate('Home');
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      // Báo lỗi nếu chưa nhập sdt
      // eslint-disable-next-line no-alert
      alert('Vui lòng nhập số điện thoại');
    }
  }
  componentDidMount() {
    this.getCart().then(() => {
      let product = this.props.route.params;
      if (product != null) {
        this.addItemCart(product);
      }
    });
  }
  render() {
    console.log(this.props.route.params);
    console.log(this.state.cart.products);
    return (
      <View style={styles.view}>
        <CustomHeader Title="Thanh toán" navigation={this.props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.cart.products != null &&
          this.state.cart.products.length > 0 ? (
            this.state.cart.products.map((item, key) => {
              return (
                <View key={key}>
                  <ImageBackground
                    source={{uri: item.imageBackground}}
                    style={[styles.image, styles.shadow]}
                    imageStyle={styles.style_image}
                  />
                  <View style={[styles.info, styles.shadow]}>
                    <View style={styles.detail_text}>
                      <Text style={styles.detail_tour}>details</Text>
                    </View>
                    <View style={styles.addDlete_cover}>
                      <InputSpinner
                        min={1}
                        step={1}
                        rounded={true}
                        showBorder={false}
                        fontSize={18}
                        inputStyle={{
                          paddingVertical: 5,
                        }}
                        width={130}
                        height={40}
                        style={{marginTop: 7, marginLeft: 20}}
                        value={item.quantity}
                        onIncrease={increased => {
                          this.editItemCart(item, 'add');
                        }}
                        onDecrease={decreased => {
                          this.editItemCart(item, 'sub');
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          this.removeItemCart(item);
                        }}>
                        <Image
                          source={IMAGE.ICON_DELETE}
                          style={styles.image_delete}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <Text>Không có sản phẩm trong giỏ hàng</Text>
          )}
          <View style={styles.textInput_cover}>
            <Text style={styles.infomation_text}>Thông tin khách hàng</Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              selectionColor="#922C88"
              placeholder="Vui lòng nhập họ tên "
              onChangeText={text =>
                this.setState({
                  nameInput: text,
                })
              }
              value={this.state.nameInput}
            />
            <TextInput
              style={styles.textInput}
              multiline={true}
              selectionColor="#922C88"
              placeholder="Vui lòng nhập số điện thoại "
              onChangeText={text =>
                this.setState({
                  phoneInput: text,
                })
              }
              value={this.state.phoneInput}
            />
          </View>
        </ScrollView>
        <View style={styles.cover_cart}>
          <View style={styles.info_Tour}>
            <Text style={styles.text_info}>số lượng: </Text>
            <Text style={styles.text_info_cart}>
              {this.state.cart.products.length}
            </Text>
          </View>
          <View style={styles.info_Tour}>
            <Text style={styles.text_info}>tổng tiền: </Text>
            <Text style={styles.text_info_cart}>
              {this.state.cart.totalPrice}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.createBill();
            }}>
            <View style={styles.button_cover}>
              <Text style={styles.text_button}>Đặt tour</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 370,
    height: 180,
    marginTop: 10,
    marginLeft: 15,
    borderRadius: 15,
    marginRight: 10,
    overflow: 'visible',
  },
  style_image: {
    borderRadius: 15,
  },
  info: {
    backgroundColor: 'white',
    overflow: 'visible',
    marginHorizontal: 50,
    height: 130,
    width: 310,
    borderRadius: 20,
    marginLeft: 95,
    marginTop: -30,
  },
  detail_text: {
    flex: 1,
    flexDirection: 'column',
  },
  detail_tour: {
    fontSize: 22,
    marginTop: 4,
    marginLeft: 10,
  },
  addDlete_cover: {
    flex: 0.7,
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  image_delete: {
    width: 35,
    height: 35,
    marginLeft: 100,
    marginTop: 11,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10.6,
    borderWidth: 0.4,
    elevation: 18,
  },
  infomation_text: {
    fontSize: 22,
    marginLeft: 85,
  },
  textInput_cover: {
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f1f1f1',
    fontSize: 16,
    marginTop: 14,
  },
  info_Tour: {
    padding: 4,
    marginLeft: 10,
    flexDirection: 'row',
  },
  text_info: {
    fontSize: 18,
  },
  text_info_cart: {
    fontSize: 18,
    marginLeft: 200,
  },
  cover_cart: {
    backgroundColor: 'rgba(78, 81, 105, 0.4)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  button_cover: {
    backgroundColor: '#006CA6',
    width: 393,
    height: 45,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 4,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_button: {
    fontSize: 23,
    color: 'white',
  },
});
