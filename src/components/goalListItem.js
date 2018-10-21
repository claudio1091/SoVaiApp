import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Text,
  findNodeHandle,
  StyleSheet
} from 'react-native';
import { robotoWeights } from 'react-native-typography';
import Moment from 'moment';

class GoalListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { viewRef: null };
    console.log('loading...');
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    Moment.locale('pt-br');

    return (
      <ImageBackground
        source={{
          uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-4.png'
        }}
        blurRadius={5}
        style={{
          flex: 1,
          height: 190,
          borderRadius: 10,
          margin: 10,
          padding: 25,
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        imageStyle={{ borderRadius: 10 }}
      >
        <View
          style={[
            styles.absolute,
            {
              borderRadius: 10,
              backgroundColor: 'rgba(170,255,199,.6)',
              borderColor: '#FFF',
              borderWidth: 1
            }
          ]}
        />
        <Text
          style={[
            robotoWeights.light,
            {
              color: '#232855',
              fontSize: 30,
              fontWeight: '300',
              elevation: 2
            }
          ]}
        >
          {this.props.item.name}
        </Text>

        <View>
          <Text
            style={[
              robotoWeights.light,
              {
                color: '#232855',
                fontSize: 20,
                fontWeight: '300',
                elevation: 2
              }
            ]}
          >
            {this.props.item.repeatIn === 'days' ? 'Diariamente' : '--'} - até{' '}
            {Moment(this.props.item.dtGoal).format('DD/MM')}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 190
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default GoalListItem;
