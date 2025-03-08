import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import {useState} from 'react'

const CreateScreen = ({data, setData}) => {

  const [itemName, setitemName] = useState('')
  const [stock, setStock] = useState('')
  const [isEdit, setisEdit] = useState(false)
  const [editItemId, seteditItemId] = useState(null)

  const addItemHandler = () =>{
    const newItem = {
        id: Date.now(),
        name: itemName,
        stock: stock
    }


    setData([...data, newItem])
    setitemName('')
    setStock('')
    setisEdit(false)
  }


  const deleteItemHandler = (id) =>{
    setData(data.filter((item)=> item.id !== id))
  }

  const editItemHandler = (item) => {
    setisEdit(true)
    setitemName(item.name)
    seteditItemId(item.id)
  }

  const updateItemHandler = () => {
    setData(data.map((item) =>(
        item.id === editItemId ? {...item, name: itemName, stock: stock} : item
    )
    ))
  }

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Enter an item name...'
        placeholderTextColor="#999"
        style= {styles.input}
        value={itemName}
        onChangeText={(item) => setitemName(item)}
      />
      <TextInput 
        placeholder='Enter stock amount...'
        placeholderTextColor="#999"
        style= {styles.input}
        value={stock}
        onChangeText={(item) => setStock(item)}
      />

      <Pressable style={styles.addButton} onPress={() => isEdit ? updateItemHandler() : addItemHandler()}>
        <Text style={styles.btnText}>{isEdit ?'Edit Item': 'Add Item'}</Text>
      </Pressable>

      <View style={{marginTop:10}}>
            <Text style={styles.headingText}>All items in the stock</Text>
      
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <View style={[styles.itemContainer, {backgroundColor: item.stock<4 ? "#FFCCCC" : "#D7F6BFFF"}]}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <View style={{flexDirection: 'row', gap: 20}}>
                        <Text style={styles.itemText}>{item.stock}</Text>
                        <Pressable onPress={() => editItemHandler(item)}>
                        <Text style={styles.itemText}>Edit</Text>
                        </Pressable>
                        <Pressable onPress={() => deleteItemHandler(item.id)}>
                            <Text style={styles.itemText}>Delete</Text>
                        </Pressable>
                    </View>
                </View>
            )}
      
            contentContainerStyle = {{gap:10}}            
        />
      </View>
    </View>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
    container: {
        paddingVertical: "4%",
        gap: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        paddingHorizontal: 140,
        paddingVertical:10,
        borderRadius:7,
    },
    addButton: {
        borderWidth:1,
        backgroundColor: "#CABFEEFF",
        paddingHorizontal: 15,
        paddingVertical:10,
        borderRadius:7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15, 
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 280,
    },
    headingText: {
        fontWeight: "500",
        fontSize: 16,
        marginVertical: 10
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 15,
        gap: 100,
        paddingVertical: 10,
        borderRadius:8,
    },
    itemText: {
        fontWeight: "400",
        fontSize: 14,
        paddingVertical: 10
    },
})