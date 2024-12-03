import { Slot, useRouter } from "expo-router";
import { View,Text, StyleSheet } from "react-native";
import { useEffect } from 'react';


export default  mainlayout = ()=>{

    const router = useRouter();

    useEffect(() => {
      // Redirect to the login screen on app start
      router.replace('/login'); // Change to '/auth' if you prefer
    }, []);

    // const session = useSession ();
    // if session.loggedIn {
    // router.push("/login"); 
    // }

    return (
        // provider bu seviyeden veriliyor ama burdan verilince tüm herşey bu contexte erişebiliyor
        <View  >
        <View style={styles.container}>
            <Text style={{fontSize:24}}
             onPress={() => router.push("/login")}            
            >MANAGMENT PANEL</Text>
            </View>
        <Slot />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffa500',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'blue',
      padding: 5,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
  });