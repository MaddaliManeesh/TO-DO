import React, {Component} from 'react';
import {CheckBox,Picker,AppRegistry,Text,View,TextInput,StyleSheet,Alert,TouchableHighlight,ScrollView,FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
class Greetings extends Component{
	render(){
		return(
			<Text style={{fontSize:30,color:'white',fontFamily:'monospace'}}>{this.props.name}</Text>
		);
	}
}

class Blink extends Component{
	constructor(props){
		super(props);
		this.state = {showText : true}
		setInterval(()=>{	
			this.setState(previousState => {
				return { showText: !previousState.showText};
			});
		},1000);
	}

	render(){
		let display = this.state.showText ? this.props.text : ' ';
		return (
			<Text style={{fontSize:30}}>{display}</Text>
		);
	}
}


export default class Names extends Component{
	
	constructor(props){
		super(props);
		this.state = { 
			title : '',
			titleStore:[],
			completedTitles:[],
			onoffValue:false,
			id:0,category:[]};
	}

	handleChange = (text)=>{
		this.setState({title:text})
	}
	
  onSubmitEdit = () => {
    
        if (this.state.title.length>0){
					let array1 = {id:this.state.id,text:this.state.title}
					this.setState({titleStore:[array1,...this.state.titleStore], id: this.state.id+1, title: ''})					
       }       
  }
	onCall = (item) =>{

	 	const result =  this.state.titleStore.filter((titleObject) => titleObject.id !== item.id)
		const result1 = this.state.titleStore.filter((titleObject) => titleObject === item)
		
		this.setState({titleStore:result, 
						completedTitles:[result1[0],...this.state.completedTitles]})
		console.log(this.state.completedTitles);

    }

	onDelete = (fd) =>{
		const Delete =  this.state.completedTitles.filter((titleObject) => titleObject !== fd)
		this.setState({completedTitles:Delete})
	}


	onClear = () => {
		let cleararray = this.state.titleStore
		while (cleararray.length){
			cleararray.pop();
		}
		this.setState({titleStore:cleararray})
	}

	render(){
		const extractKey = ({id}) => id  
		console.log(this.state.language);  
		// var titleInputComponents = this.state.titleStore.map((type, index)=> {
		// 	return(
		// 		<View style={{flex:1,flexDirection: 'row',padding:5}} key={index}>
		// 			<CheckBox          
		// 				onValueChange={()=>{ this.onCall(index)}}
		// 				value = {false} 
		// 			/>
		// 			<View>
		// 				<Text style={{fontSize:20}}>💼{type}</Text>
		// 			</View>
		// 		</View>)})
		// var completedInputComponents = this.state.completedTitles.map((type1,index) => {
		// 	return(
		// 		<View style={{flex:1,flexDirection:'row',padding:5}}>
		// 			<View>
		// 				<Text style={{fontSize:20,paddingRight:250}}>💼{type1}</Text>
		// 			</View>
		// 			<View style={{flex:2,flexDirection:'row'}}>
		// 				<TouchableHighlight onPress={()=>{ this.onDelete(index)}} underlayColor='white'>
		// 					<View style={{height:36}}>
		// 						<Text style={{fontSize:20}}>💣</Text>
		// 					</View>
		// 				</TouchableHighlight>
		// 			</View>
		// 		</View>)})
		return(
			<ScrollView style = {{backgroundColor:"#fff0f5"}}>
				<View style = {{flex:1,backgroundColor:"#fff0f5"}}>
					<View style={{alignItems:'flex-start',backgroundColor:"#2196F3",paddingTop:30,padding:10}}>
						<Greetings name='Tasks'/>
					</View>
					<View style={{paddingTop:10}}>
            <Text style={{fontSize:20,color:'#2196F3'}}>Enter what you want to do?</Text>
					</View>
					<View style={{padding:5}}>
						<TextInput
							style={{height:40,shadowColor:'skyblue'}}
							autoGrow={true}
							placeholder="New to-do"
							value={this.state.title}
							onChangeText={this.handleChange}
						/>
						{/* <Picker
							selectedValue={this.state.category}
							onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
							<Picker.Item label="Default" value="" />
							<Picker.Item label="Shopping" value="Shopping" />
							<Picker.Item label="Work" value="Work" />
							<Picker.Item label="Wish-List" value="Wish-List" />
					</Picker> */}
						{/* <Icon
							raised
							name='add'
							color='skyblue' 
							underlayColor='skyblue'/> */}
					</View>
          <View style={{alignItems:'flex-end',padding:10}}>
            <TouchableHighlight onPress={this.onSubmitEdit} underlayColor='white'>
              <View style={{alignItems:'center', width:80,height:40,backgroundColor:'#2196F3'}}>
                <Text style={{color:'white',paddingTop:10}}>Add</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View>
            <FlatList
                style={{padding:10}}
                data={this.state.titleStore}
								renderItem={({item}) =>  
                <View style={{flexDirection:'row',padding: 7,marginBottom:5 ,backgroundColor: 'gainsboro'}}>
									<CheckBox          
									  onValueChange={()=>{ this.onCall(item)}} 
										value = {false} 	/>
									<View style={{padding:2}}>
										<Text style={{fontSize:20}}>{item.text}</Text>
										<Text>{this.state.category}</Text>
									</View>
									{/* style={{fontSize:15,padding: 2,marginBottom:2 ,backgroundColor: 'blue'}}  */}
								</View>								}
                keyExtractor={extractKey}
            />
          </View>
					<View style={{flex:1}}>
            <FlatList
                style={{padding:10}}
                data={this.state.completedTitles}
								renderItem={({item}) =>  
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding: 7,marginBottom:5 ,backgroundColor: 'gainsboro'}}>
									<View style={{padding:2}}>
										<Text style={{fontSize:20,textDecorationLine:'line-through'}}>{item.text}</Text>
										<Text>{this.state.category}</Text>
									</View>
									<Icon name='delete' color='#2196F3' underlayColor='skyblue' style={{padding:10}} onPress={() => {this.onDelete(item)}}/>
									{/* style={{fontSize:15,padding: 2,marginBottom:2 ,backgroundColor: 'blue'}}  */}
								</View>								}
                keyExtractor={extractKey}
            />
          </View>
          {/* <View style = {{paddingTop:5,paddingBottom:5}}>
            {titleInputComponents}
          </View> */}	
					{/* <View style={{alignItems:'flex-end',paddingTop:20}}>
						<TouchableHighlight onPress={this.onClear} underlayColor='white'>
							<View style={{alignItems:'center', width:80,height:40,backgroundColor:'#2196F3'}}>
								<Text style={{color:'white',paddingTop:10}}>clear</Text>
							</View>
						</TouchableHighlight>
					</View> */}
					{/* {completedInputComponents} */}
				</View>
			</ScrollView>
		);
	}
}

AppRegistry.registerComponent('AwesomeProject', () => Names);