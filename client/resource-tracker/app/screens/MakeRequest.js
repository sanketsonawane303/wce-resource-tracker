import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import DateTimePicker from '../components/DateTimePicker'
import RNEInput from '../components/RNEInput'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import { Feather } from '@expo/vector-icons'; 
import { colors } from 'react-native-elements'

const resourceList = [
  { label: "Classroom 20", value: "classroom20" },
  { label: "Classroom 21", value: "classroom21" },
  { label: "Classroom 22", value: "classroom22" },
  { label: "Classroom 23", value: "classroom23" },
  { label: "Mini CCF", value: "miniCCF" },
  { label: "PG Lab", value: "pgLab" },


]


export default function MakeRequest() {
  return (
    <>
      <Formik
        initialValues={{
          resource: "",
          fromDate: new Date(),
          toDate: new Date()

        }}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {
          ({ setFieldValue, values, submitForm }) => (
            <>
              <View  style={styles.container}>
                <Text style={styles.title}>Select Resource</Text>
                <RNEInput  bg={colors.grey5} placeholder={"Select Resource"} name="resource" />

                <View>
                <DateTimePicker from={true} name="fromDate" />
                  {/* <Text>From</Text>
                  <Text>{formatAMPM(values.fromDate)}</Text> */}
                </View>

                <View>
                <DateTimePicker from={false}  name="toDate" />
                  {/* <Text>To</Text>
                  <Text>{formatAMPM(values.fromDate)}</Text> */}
                </View>

                <Text style={styles.title}>Link</Text>
                <RNEInput bg={colors.grey5} placeholder={"Permission Letter Link"} name="letterLink"/>
                <Text style={styles.title}>Details</Text>
                <RNEInput  bg={colors.grey5} multiline={true} placeholder={"Details"} name="details"/>
                <AppButton title={"submit"} onPress={submitForm} />

              </View>
            </>
          )
        }

      </Formik>

    </>

  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  }
})