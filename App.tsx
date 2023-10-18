import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Todo from './Todo'

const App = () => {
  return (
    <View style={{backgroundColor:"#020631", height:750}}>
    <Text style={{color:"#ffffff",fontSize:28,fontWeight:'700',marginLeft:120,marginBottom:20,marginTop:20}}>ToDO List</Text>
      <Todo/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
