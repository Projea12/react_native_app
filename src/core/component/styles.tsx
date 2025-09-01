import { StyleSheet } from "react-native";


export const globalStyles = StyleSheet.create({
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius:8,
        alignItems:"center"
    },
    text:{
        color:"#00000",
        fontSize: 16,
        fontWeight:"600",
    },
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      padding:16
    },
    inputContainer: {
        width: "100%",
        marginBottom: 16,
      },
    input:{
        borderWidth:1,
        borderColor:"#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: "#000",
        backgroundColor: "#fff",
    },

})