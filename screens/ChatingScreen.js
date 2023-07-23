import React,{ useState , useEffect} from 'react'
import { Text, View,Keyboard,Image} from 'react-native';
import { styles } from './style/chatingScreenStyle';
import defaultImage from '../assets/images/3.png'
import { GiftedChat } from 'react-native-gifted-chat'
function ChatingScreen({route}) {
  const [flex,setFlex] =useState(0.15)
  const [messages, setMessages] = useState([])
  const {userId,fristname,lastName,userImage,loginStatus} = route.params
  useEffect(() =>{
    setMessages([
      {
        _id: 1554,
        text: 'I am'+" "+ fristname,
        createdAt: new Date(),
        user: {
          _id:userId,
          name: fristname+" "+lastName,
          avatar: userImage,
        },
      },
    ])
  },[])
  // useEffect(() => {
    
  //   const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
  //     setFlex(0.28)
  //   });
  //   const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
  //     setFlex(0.15)
  //   });
  //   return () => {
  //     showKeyboard.removeListener('keyboardDidShow');
  //     hideKeyboard.removeListener('keyboardDidHide');
  //   };
  // }, [])

  const onSend = (messagesarry) => {
    const array = messagesarry[0]
    const sendMessage ={
      ...array,
      sentTo :userId
    }
    setMessages(previousMessages =>GiftedChat.append(previousMessages, sendMessage))
    console.log(messages)
  

  }
  return (
    <View style={{flex:1}}>
      <View style={{ flex:flex,backgroundColor:"#1D50CF"}}>
        <Image style={{width:60,height:60,borderRadius:60/2,position:'absolute',top:40,left:40}} source={userImage} />
        <Text style={styles.chatingUserName}>{fristname+" "+ lastName}</Text>
        {
          loginStatus==true?
            <Text style={styles.chatingUserStatus}>Online</Text>
          :
          <Text style={styles.chatingUserStatus}>offline</Text>
        }
      </View>
      <View style={styles.chatingBox}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </View>
  )
}

export default ChatingScreen
