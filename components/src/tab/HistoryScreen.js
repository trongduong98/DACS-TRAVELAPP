import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {Image} from 'react-native';
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: require('../../image/vinhHaLong.jpg'),
  },
];

export class HistoryScreen extends Component {
  render() {
    return (
      <Container>
        <Header />
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item => (
              <Card style={{elevation: 3}}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{height: 300, flex: 1}} source={item.image} />
                </CardItem>
                <CardItem>
                  <FontAwesome
                    name="heart"
                    style={{color: '#ED4A6A', fontSize: 30}}
                  />
                  <Text style={{fontSize: 20, marginLeft: 6}}>{item.name}</Text>
                </CardItem>
              </Card>
            )}
          />
        </View>
      </Container>
    );
  }
}
