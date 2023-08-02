import React,{useState} from 'react'
import { Text, View,FlatList,TouchableOpacity,Image, SafeAreaView} from 'react-native';
import { styles } from "../style/HomeStyle"
import image1 from '../../assets/images/1.jpg'
import image2 from '../../assets/images/2.jpg'
import defaultImage from '../../assets/images/3.png'
function RequestScreen({navigation}) {
  const [allFriends,setAllFriends] = useState([
    {id:4465653,fristname:'hina', lastName:'kham',image:image1,loginStatus:true},
    {id:2,fristname:'ali', lastName:'khan',image:image2,loginStatus:false},
    {id:3,fristname:'hamza', lastName:'khan',image:image2,loginStatus:true},
    
  ])
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.chatListBox}>
          <FlatList
            data={allFriends}
            renderItem={({item}) =>(
              <TouchableOpacity style={styles.userBox} onPress={()=>navigation.navigate("chatingScreen",
                {userId:item.id,fristname:item.fristname,lastName:item.lastName,userImage:item.image,loginStatus:item.loginStatus}
              )}>
                {
                  item.image?(
                    <Image style={{width:100,height:100,borderRadius:100/2}} source={item.image} />
                  ):
                  <Image style={{width:100,height:100,borderRadius:100/2}} source={defaultImage} />
                }
                <Text style={styles.UserName}>{item.fristname+ " "+item.lastName} </Text>
                {item.loginStatus===true?<Text style={styles.loginStatus}></Text>:null}
                <Text style={styles.lastMessage}>hello Akshara Where r u ?....</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    )
}

export default RequestScreen
