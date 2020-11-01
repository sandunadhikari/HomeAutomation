import React, { Component } from 'react';
import { Image, View,Text, Button,TouchableHighlight, YellowBox } from 'react-native';
import io from 'socket.io-client';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOn:'LIGHT OFF'
    };
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.socket = io('https://pacific-beach-19018.herokuapp.com');
    //this.socket = io('http://192.168.8.101:4200');
    this.socket.on('led', this.onReceivedMessage);
  }

  componentDidMount() {
    
    this.socket.on('connect', data => {
      this.socket.emit('join', 'Browser connected');
    });
  }

  submitChatMessage() {
    
    this.socket.emit('toggle', {state:true});

    // this.socket.on('led', function(light) {
    //   console.log(JSON.stringify(light));
      
    
    
  }
  onReceivedMessage(led){
    //console.log(led.state);
    if(led.state == true) {
      //$('#led').text('ON');
      this.setState({isOn:'LIGHT ON'});
    } else {
      //$('#led').text('OFF');
      this.setState({isOn:'LIGHT OFF'});
    }
  
  }


  render() {
    return (
      <View>
        <Image  source={require('./Images/smarthome.png')} style={{width:'100%',height:250}}/>
        <View style={{margin:20}}>
        <Button
          title={this.state.isOn}
          color="#002B60"
          onPress={() => this.submitChatMessage()}
        />
        </View>
        
        
      </View>
    );
  }
}

