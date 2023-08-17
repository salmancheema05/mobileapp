import React,{useState ,useEffect} from 'react'
import { Text, View,FlatList,TouchableOpacity,Image, SafeAreaView} from 'react-native';
import { styles } from "../style/HomeStyle"
import image1 from '../../assets/images/1.jpg'
import image2 from '../../assets/images/2.jpg'
import defaultImage from '../../assets/images/3.png'
import { receiveRequests } from '../../api/requestApi';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {decode} from 'base-64';
receiveRequests
function RequestTab() {
  const [allFriends,setAllFriends] = useState("")
  useEffect(()=>{
    const requestData = async () =>{
      try{
        const getData = await AsyncStorage.getItem("data")
        const parsed = JSON.parse(getData);
        const result = await receiveRequests(parsed.id)
        setAllFriends( result.data)
      }
      catch(error){
        console.error("An error occurred:", error)
      }
    }
    requestData()

  },[])
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.chatListBox}>
          <FlatList
            data={allFriends}
            renderItem={({item}) =>(
              <View style={styles.userBox} >
                {
                  item.image_name?(
                    <Image style={{width:100,height:100,borderRadius:100/2}} source={{ uri: `data:image/jpg;base64,${item.image_name}` }} />
                  ):
                  <Image style={{width:100,height:100,borderRadius:100/2}} source={defaultImage} />
                }
                <Text style={styles.UserName}>{item.firstname+ " "+item.lastname} </Text>
                {item.request_status=="pending"?(
                  <>
                    <TouchableOpacity style={styles.acceptButton}>
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton}>
                      <Text style={styles.acceptText}>cancel</Text>
                    </TouchableOpacity>
                    
                  </>
                  
                ):
                  <TouchableOpacity style={styles.removeButton} >
                    <Text style={styles.acceptText}>Remove</Text>
                  </TouchableOpacity>
                }
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    )
}

export default RequestTab
