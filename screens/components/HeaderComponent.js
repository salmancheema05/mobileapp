import React,{useState} from 'react'
import { Text, View,TouchableOpacity} from 'react-native';
import { styles } from "../style/HomeStyle"

function HeaderComponent({navigation}) {
    const [tab,setTab] = useState({tabone:true,tabtwo:false,tabthree:false})
    const all =()=>{
        setTab({tabone:true,tabtwo:false,tabthree:false})
        navigation.navigate("homeScreen")
    }
    const group = () =>{
        setTab({tabone:true,tabtwo:true,tabthree:false})
        navigation.navigate("requestscreen")
    }
    const request = () =>{
        setTab({tabone:false,tabtwo:false,tabthree:true})
        navigation.navigate("groupescreen")
    }
    return(
       <View style={styles.homeHeader}>
            <View style={styles.contactBox}>
                <Text style={styles.contactText}>Contact</Text>
            </View>
            <View style={styles.tabeBox}>
                <TouchableOpacity onPress={()=>all()}>
                    <Text style={[{color:tab.tabone==true?'white':'E4E3E2'},styles.tabeText]}>ALL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>group()}>
                    <Text style={[{color:tab.tabtwo==true?"white":'E4E3E2'},styles.tabeText]}>Groups</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>request()}>
                    <Text style={[{color:tab.tabthree==true?'white':'E4E3E2'},styles.tabeText]}>Request</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default  HeaderComponent