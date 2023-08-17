import React,{useContext,useEffect,useState} from 'react'
import { Text, View,Image,TouchableOpacity, Pressable} from 'react-native'
import { Context } from '../Contextapi/Provider'
import { styles } from  './style/ProfileStyle'
import defaultImage from '../assets/images/3.png'
import image1 from '../assets/images/1.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker';
import { profileImageApi , GetprofileImageApi } from '../api/userapi'
function Profile (){
    const [selectedImage, setSelectedImage] = useState(null);
    const [saveImage, setSaveImage] = useState(null);
    const [model, setModel] = useState(false);
    const {setOpenMenu} = useContext(Context)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) { 
           setSelectedImage(result.uri);
           setModel(true)   
        }
    };
    const replace = ()=>{
        setModel(false)
        pickImage()
    }
    const cencel =() =>{
        setSelectedImage(null)
        setModel(false)
    }
    const save = async () =>{
        try{
            setModel(false)
            const getData = await AsyncStorage.getItem("data")
            const parsed = JSON.parse(getData); 
            const formData = new FormData();
            formData.append('file',{
                uri:selectedImage,
                name: 'image.jpg',
                type: 'file/*', // Accepts any image MIME type
            })
            formData.append('id',parsed.id)
            const result = await profileImageApi(formData)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        const displayProfileImage = async() =>{
            try{
                const getData = await AsyncStorage.getItem("data")
                const parsed = JSON.parse(getData);
                const result = await GetprofileImageApi(parsed.id)
                
                if(result.status==200){
                    setSaveImage(`http://192.168.1.3:5000/api/userprofile/${parsed.id}`)
                    
                }
                else{
                    console.log('error')
                }
            }
            catch(error){
                console.log(error)
            }
        }
        displayProfileImage()
        setOpenMenu(false) 
        
    },[])
    return(
        <View style={{flex:1,backgroundColor:"#1D50CF"}}>
            <View style={styles.ImageBox}>
                {
                    selectedImage!==null?(<Image style={{width:150,height:150,borderRadius:150/2}} source={{ uri: selectedImage}} />):
                    saveImage!==null?(<Image style={{width:150,height:150,borderRadius:150/2}} source={{ uri: saveImage}} />) 
                    :(<Image style={{width:150,height:150,borderRadius:150/2}} source={defaultImage} />)
                }
                
            </View>
            <View style={styles.menuBox}>
                <TouchableOpacity onPress={() =>pickImage()}>
                    <Text style={styles.menuItem}>Take picture</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuItem}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuItem}>Create Group</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuItem}>Setting</Text>
                </TouchableOpacity>
            </View>
            
            {
                model===true?(
                    <View style={{backgroundColor:'#F7F7F7',height:"20%",width:"90%",position:'absolute',top:'31%',left:"5%",borderRadius:30}}>
                        <View style={{position:"absolute",top:20,width:"100%"}}>
                            <Text style={{textAlign:'center',fontSize:22}}>Do you want to save image?</Text>
                        </View>
                        <TouchableOpacity style={{backgroundColor:"green",position:'absolute',top:'50%',left:"5%",width:"25%"}} onPress={() =>cencel()}>
                            <Text style={{textAlign:"center",color:"white",fontSize:18,padding:10}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:"green",position:'absolute',top:'50%',left:"38%",width:"25%"}} onPress={() =>replace()}>
                            <Text style={{textAlign:"center",color:"white",fontSize:18,padding:10}}>Replace</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:"green",position:'absolute',top:'50%',left:"70%",width:"25%"}} onPress={()=>save()}>
                            <Text style={{textAlign:"center",color:"white",fontSize:18,padding:10}}>Save</Text>
                        </TouchableOpacity>
                    </View>)
                :null
            }
        </View>
    )
}
export default Profile