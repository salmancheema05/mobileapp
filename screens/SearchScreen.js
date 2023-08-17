import React,{useState,useEffect,useContext} from 'react'
import { Text, View , SafeAreaView, Image,TouchableOpacity,TextInput, KeyboardAvoidingView,FlatList,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { styles } from "./style/HomeStyle"
import image1 from '../assets/images/1.jpg'
import defaultImage from '../assets/images/3.png'
import { searchPeople } from '../api/searchApi';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { acceptRequests,removeRequest } from '../api/requestApi';
const SearchScreen = () =>{
  const [allFriends,setAllFriends] = useState(null)
  const userSearch = async(search)=>{
    try{
      const result = await searchPeople(search)
      const getData = await AsyncStorage.getItem("data")
      const parsed = JSON.parse(getData); 
      const id =  parsed.id
      if(result.status==200){
        const filteredData = result.data.filter(item => item.id != id);
        setAllFriends(filteredData)
      }
      else{
        setAllFriends(null)
      }
    }
    catch(error){
      console.error(error)
    }
  }
  const accept = async (senderId) =>{
    try{
      let object ={sender_id:0,receiver_id:0}
      const getData = await AsyncStorage.getItem("data")
      const parsed = JSON.parse(getData); 
      const id =  parsed.id
      
      object.sender_id=senderId
      object.receiver_id=id
      const result = await acceptRequests(object)
      //Alert.alert(result.data.message)
      console.log(result)
    }
    catch(error){
        console.error(error)
    }
  }
  const removeRequst = async (senderId) =>{
    try{
      let object ={sender_id:0,receiver_id:0}
      const getData = await AsyncStorage.getItem("data")
      const parsed = JSON.parse(getData); 
      const id =  parsed.id
      object.sender_id=senderId
      object.receiver_id=id
      console.log(object)
      const result = await removeRequest(object)
      if(result.status==200){
        Alert.alert(result.data.message)
      }
      else{
        Alert.alert('some thing wrong')
      }
      console.log(object)
    }
    catch(error){
      // Alert.alert(error.error)
      console.log(error)
    }
  }
  useEffect(()=>{
  },[])
  return(
    <SafeAreaView style={{flex:1}} > 
      <KeyboardAvoidingView 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
        style={{flex:1}}
      >
      <View style={{flex:.13,backgroundColor:'#1D50CF'}}>

        <TouchableOpacity style={{position:"absolute",top:40,left:20}}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <TextInput
          style={{borderBottomWidth:1,width:"80%",marginTop:40,marginLeft:70,borderColor:'white', color:'white'}}  
          placeholderTextColor="white" onChangeText={usersearch=>userSearch(usersearch)} placeholder='Search' 
          autoCapitalize="none"
        />
      </View> 
      <View style={styles.chatListBox}>
        <FlatList
          data={allFriends}
          renderItem={({item}) =>(
            <View style={styles.userBox} >
              {
                item.image_name?(
                  <Image style={{width:100,height:100,borderRadius:100/2}} source={{ uri: `data:image/jpg;base64,${item.image_name}` }}/>
                ):
                <Image style={{width:100,height:100,borderRadius:100/2}} source={defaultImage} />
              }
              <Text style={styles.UserName}>{item.firstname+ " "+item.lastname} </Text>
              {
                item.request_status=='pending'&&item.sender_id == item.id?(
                  <>
                    <TouchableOpacity style={styles.acceptButton} onPress={() =>accept(item.id)}>
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() =>removeRequst(item.id)}>
                      <Text style={styles.acceptText}>cancel</Text>
                    </TouchableOpacity>
                  </>
                ):
                item.receiver_id == item.id?(
                  <TouchableOpacity style={styles.removeButton}  onPress={() =>removeRequst(item.id)}>
                    <Text style={styles.acceptText}>Remove Reques</Text>
                  </TouchableOpacity>
                ):
                item.request_status=='accept'&&item.sender_id == item.id?(
                  <TouchableOpacity style={styles.removeButton}  onPress={() =>removeRequst(item.id)}>
                    <Text style={styles.acceptText}>Delete Friend</Text>
                  </TouchableOpacity>
                ):
                (
                  <TouchableOpacity style={styles.removeButton} >
                    <Text style={styles.acceptText}>Send Request</Text>
                  </TouchableOpacity>
                )
              }
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView> 
  )
}
export default SearchScreen