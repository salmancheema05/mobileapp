import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    homeHeader:{
        flex:0.10,
        backgroundColor:"#1D50CF"
    },
    contactBox:{
        flex:2,
        justifyContent:"flex-end"
    },
    contactText:{
        color:"white",
        fontSize:24,
        fontWeight:"bold",
        marginLeft:30,
    },
    chatListBox:{
        flex:1
    },
    userBox:{
        margin:10
    },
    UserName:{
       position:"absolute",
       left:120,
       top:15,
       fontWeight:"bold"  
    },
    loginStatus:{
        position:"absolute",
        backgroundColor:"green",
        width:15,
        height:15,
        borderRadius:100,
        left:75,
        top:80
    },
    lastMessage:{
        position:"absolute",
        left:120,
        top:50,
        color:'gray'
    }
})