import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import AllItems from './AllItems'
import CreateScreen from './CreateScreen'
import { useState } from 'react'


const Home = () => {
  const [view, setView] = useState(0)  
  const [data, setData] = useState([
    {id: 1, name: "Wheat", stock: 5, unit: "kg"},
    {id: 2, name: "Rice", stock: 10, unit: "kg"},
    {id: 3, name: "Pulses", stock: 3, unit: "kg"},
    {id: 4, name: "Corn", stock: 1, unit: "kg"},
    {id: 5, name: "Kidney Beans", stock: 2, unit: "kg"},
    {id: 6, name: "Grams", stock: 4, unit: "kg"},
    {id: 7, name: "Soyabean", stock: 1, unit: "kg"},
  ])


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, view===0 ? {backgroundColor:"#72C37AFF"} : null]} onPress={() => setView(0)}>
            <Text style={[styles.btnText, view===0 ? {color: "white"} : null]}>All Items</Text>
        </Pressable>
        <Pressable style={[styles.button, view===1 ? {backgroundColor:"#72C37AFF"} : null]} onPress={() => setView(1)}>
            <Text style={[styles.btnText, view===1 ? {color: "white"} : null]}>Low Stock</Text>
        </Pressable>
        <Pressable style={[styles.button, view===2 ? {backgroundColor:"#72C37AFF"} : null]} onPress={() => setView(2)}>
            <Text style={[styles.btnText, view===2 ? {color: "white"} : null]}>Create Item</Text>
        </Pressable>
      </View>

      {view === 0 && <AllItems data={data} />}
      {view === 1 && <AllItems data={data.filter((item) => item.stock<4)}/>}
      {view === 2 && <CreateScreen data={data} setData={setData}/>}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        padding: "4%",
        alignItems: "flex-start",
        backgroundColor: "#ffffff"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#333',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        paddingVertical: 3.5,
        paddingHorizontal: 10,
        borderRadius:50,
        borderWidth: 1,
        borderColor:"72C37AFF",
        backgroundColor: 'yellow'
    },
    btnText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold"
    },
})