import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import AppButton from '../components/AppButton';
import { Formik } from 'formik';


export default function AddRemarks() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Add Remarks</Text> */}
      {/* <Formik
        initialValues={{
          remarks:""
        }}
        
      >
      <RNEInput
        placeholder='Add remarks'
        label="Remarks"
        name="Remarks"
       multiline={true}
      />
      </Formik> */}
      <TextInput placeholder='Add Remarks' style={styles.input}  multiline={true}  />
      <AppButton buttonStyles={styles.button} title={"submit"} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    button: {
      marginHorizontal: 10
    }, 
    input:{
        borderRadius: 12,
        fontSize: 18,
        marginVertical: 10,
        backgroundColor: 'lightgrey',
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 5
    }
    
  });