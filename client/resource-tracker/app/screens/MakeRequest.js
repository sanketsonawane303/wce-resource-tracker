import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import DateTimePicker from '../components/DateTimePicker'
import RNEInput from '../components/RNEInput'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'

const resourceList = [
  { label: "Classroom 20", value: "classroom20" },
  { label: "Classroom 21", value: "classroom21" },
  { label: "Classroom 22", value: "classroom22" },
  { label: "Classroom 23", value: "classroom23" },
  { label: "Mini CCF", value: "miniCCF" },
  { label: "PG Lab", value: "pgLab" },


]

export default function MakeRequest() {
  const [toDate, setToDate] = useState(new Date().toISOString())
  const [fromDate, setFromDate] = useState(new Date().toISOString())

  return (

    <>

      <Formik
        initialValues={{
          resource: ""
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {
          ({ setFieldValue, values, submitForm }) => (
            <>
              <View>
                <Text>MakeRequest</Text>

                <Text>Select Resource</Text>
                <RNEInput placeholder={"Select Resource"} name="resource" />
                <Text> ----Resource 1</Text>
                <Text> ----resource 2</Text>

                <DateTimePicker name="date1" />
                <DateTimePicker name="date2" />


                <Text>Time and Date</Text>
                <Text>Time and Date Selector</Text>

                <Text>Link</Text>
                <AppTextInput />
                <AppButton title={"submit"} onPress={submitForm} />

              </View>
            </>
          )
        }

      </Formik>

    </>

  )
}