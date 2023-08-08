import React,{useState} from 'react'
import { Text, View,FlatList,TouchableOpacity,Image, SafeAreaView} from 'react-native';
import { styles } from "../style/HomeStyle"
import image1 from '../../assets/images/1.jpg'
import image2 from '../../assets/images/2.jpg'
import defaultImage from '../../assets/images/3.png'
function RequestTab() {
  const [allFriends,setAllFriends] = useState([
    {id:4465653,fristname:'hina', lastName:'khan',image:image1,requeststatus:1},
    {id:1,fristname:'hina', lastName:'khan',image:image1,requeststatus:0},
    {id:2,fristname:'hina', lastName:'khan',image:image1,requeststatus:0},
    {id:3,fristname:'hina', lastName:'khan',image:image1,requeststatus:1},
    {id:4,fristname:'hina', lastName:'khan',image:image1,requeststatus:1},
    {id:5,fristname:'hina', lastName:'khan',image:image1,requeststatus:1},
    {id:6,fristname:'hina', lastName:'khan',image:image1,requeststatus:0},
    {id:7,fristname:'hina', lastName:'khan',image:image1,requeststatus:0},
    {id:8,fristname:'hina', lastName:'khan',image:image1,requeststatus:0},
    {id:9,fristname:'hina', lastName:'khan',image:image1,requeststatus:0},
    {id:10,fristname:'hina', lastName:'khan',image:image1,requeststatus:0},
  ])
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.chatListBox}>
          <FlatList
            data={allFriends}
            renderItem={({item}) =>(
              <View style={styles.userBox} >
                {
                  item.image?(
                    <Image style={{width:100,height:100,borderRadius:100/2}} source={item.image} />
                  ):
                  <Image style={{width:100,height:100,borderRadius:100/2}} source={defaultImage} />
                }
                <Text style={styles.UserName}>{item.fristname+ " "+item.lastName} </Text>
                {item.requeststatus===0?(
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
