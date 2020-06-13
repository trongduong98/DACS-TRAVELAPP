import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  Item,
  Input,
  Icon,
  Text,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
} from 'native-base';
import _ from 'lodash';
import {FlatList} from 'react-native-gesture-handler';
export class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fullData: [],
      loading: false,
      error: null,
      query: '',
    };
  }
  componentDidMount() {
    this.requesAPIphoto();
  }

  requesAPIphoto = _.debounce(() => {
    const apiURL = 'https://jsonplaceholder.typicode.com/photos';
    this.setState({loading: true});
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          loading: false,
          data: resJson,
          fullData: resJson,
        });
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  }, 250);

  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View style={styles.renderFooter}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _renderItem = ({item, index}) => {
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            square
            source={{uri: 'https://via.placeholder.com/150/771796'}}
          />
        </Left>
        <Body>
          <Text>{item.title}</Text>
          <Text note numberOfLines={1}>
            Its time to build a difference . .
          </Text>
        </Body>
        <Right>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('HomeDetail')}>
            <Text>View</Text>
          </TouchableOpacity>
        </Right>
      </ListItem>
    );
  };

  handleSearch = text => {
    const formatttedQuery = text.toLowerCase();
    const data = _.filter(this.state.fullData, photo => {
      if (photo.title.includes(formatttedQuery)) {
        return true;
      }
      return false;
    });
    this.setState({data, query: text});
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={this.handleSearch} />
          </Item>
        </Header>
        <List>
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter}
          />
        </List>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  renderFooter: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});
