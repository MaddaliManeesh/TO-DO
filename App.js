import React, { Component } from 'react'
import { FlatList, Text, StyleSheet,View,TextInput,Image,Button,ScrollView,TouchableHighlight } from 'react-native'
import { Avatar } from 'react-native-elements';
import {DrawerNavigator,TabNavigator,StackNavigator} from 'react-navigation';

 export class App extends Component {
  static navigationOptions = {
    headerTitle: 'Home',
    tabBarLabel: 'To be Completed',
    backgroundColor:'gold',
    header:null};

    constructor(props){
      super(props);
      this.state = {
        title : "",
        titleStore : [],
        completed : []
      };
    }
  handleChange = (text)=>{
    this.setState({title:text})}

  onSubmitEdit = (title,props) => {
    let array = this.state.titleStore
    if (this.state.title.length>0){
      array.push(this.state.title)
    }
    this.setState({titleStore:array})
    this.setState({title:""});
  }
  render(){
    const { navigate } = this.props.navigation;
    var titleInputComponents = this.state.titleStore.map((type) => {return(<Text>{type}</Text>)})
    return (
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',alignItems:"flex-end",justifyContent:'flex-start',height:80,backgroundColor:'gold'}}>
          <Text style = {{color:'white',fontSize:20,paddingLeft:10,paddingBottom:10,fontFamily:'monospace'}}>Tasks</Text>
        </View>
        <ScrollView>
          {/* <Button
              title="Go to Setup Tab"
              onPress={() => navigate('Complete')}
          /> */}
          {titleInputComponents}
          <Text style ={{fontSize:20}}>HA</Text>
        </ScrollView>
        <View style={{alignItems:'flex-end',position:'absolute',top:500,right:250,left:350}}>
          <Avatar
            medium
            rounded
            overlayContainerStyle={{backgroundColor: 'gold',width:50,height:50}}
            title="+"
            onPress={() => navigate('Setup')}
            activeOpacity={0.7}
          />
        </View>
      </View>

    );
  }
}

class AddScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',alignItems:"flex-end",justifyContent:'flex-start',height:80,backgroundColor:'gold'}}>
          <Text style = {{color:'white',fontSize:20,paddingLeft:10,paddingBottom:10,fontFamily:'monospace'}}>New Task</Text>
        </View>
   			<View style={{padding: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="New to-do"
            /* value={this.state.title} */
            onChangeText={this.handleChange}/>
		    </View>
        <View style={{alignItems:'center',paddingTop:20}}>
          <TouchableHighlight onPress={this.props.onSubmitEdit} underlayColor='black'>
            <View style={{alignItems:'center', width:80,height:40,backgroundColor:'#2196F3'}}>
            <Text style={{color:'white',paddingTop:10}}>Add</Text>
            </View>
            {/* onPress={() => navigate('ds')} */}
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

class Completed extends React.Component {
  static navigationOptions ={
    tabBarLabel: 'Completed Tasks',
    header:null
  };
  render(){
    const{goBack} = this.props.navigation;
    return (
      // <Button
      //   title="ADD"
      //   onPress={() => goBack()}
      // />
      <Text>Hii</Text>
    );
  }
}

export const MyApp = StackNavigator({
  Home: {
    screen: App,
  },
  Setup: {
    screen: AddScreen,
  },
})

export const BasicApp = TabNavigator({
  Main: {screen:App},
  Complete: {screen: Completed},
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  color:'red',
  tabBarOptions: {
    activeTintColor :'red',
    style : {backgroundColor:'gold'}
  },
});
export const Control = StackNavigator({
  ds: {screen:BasicApp},
  sd: {screen:MyApp},
})

export default Control;