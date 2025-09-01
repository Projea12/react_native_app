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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
      },
      card: {
        backgroundColor: '#fff',
        padding: 24,
        height:400,
        width:280,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      },
      title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 24,
      },
      footerText: {
        textAlign: 'center',
        marginTop: 16,
        color: '#444',
      },
      link: {
        color: '#007AFF',
        fontWeight: '600',
      },
      welcome: { fontSize: 20, marginBottom: 10 },

})