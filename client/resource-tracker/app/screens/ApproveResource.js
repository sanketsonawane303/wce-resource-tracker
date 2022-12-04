import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import DropDownPicker from 'react-native-dropdown-picker';
import AppButton from '../components/AppButton';

import RequestInfoShortCard from '../components/RequestInfoShortCard';
import { getAllRequests } from '../apis/request';
import { useIsFocused, useNavigation } from '@react-navigation/native';
const items = [{
  label: "Handover Keys", value: "handover"
},
{ label: "Return", value: "return" }
]

export default function ApproveResource({ navigation }) {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState([]);
  const focus = useIsFocused();
  const getRequestDetails = () => {
    getAllRequests().then(res => {
      console.log(res)
      if (res.ok && res.data.status == "success") {
        setRequest(res?.data?.data)
      }

      if (res.problem == "NETWORK_ERROR") {
        navigation.navigate("ServerError")
      }
    }).catch(err => {
      console.log(err)
    }
    )
  }

  useEffect(() => {
    if (!focus) return;
    getRequestDetails();
  }, [focus]);



  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <View style={{
            marginBottom: 20
          }}>
            <DropDownPicker
              containerProps={{ style: styles.dropdown }}
              open={open}
              value={value}
              items={items}
              placeholder="Select Exchange Type"
              setOpen={setOpen}
              setValue={setValue}
              onChangeValue={(value) => {
              }}
            />
          </View>

          {
            request.length > 0 ? (
              request.map((req, index) => {
                //if (req.status != "approved") return;

                return (<View key={req._id}>
                  <RequestInfoShortCard request={req} onPress={() => {
                    navigation.navigate("AttachImage", { request: { ...req, type: value } })
                  }} />
                </View>)
              })) : (<Text>No Requests</Text>)
          }

        </View>



      </ScrollView>
      <View>
        <AppButton
          title={"Proceed To Approve"}
          onPress={() => {
            navigation.navigate("AttachImage", { request: request })
          }}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  scanner: {
    marginHorizontal: 10,
    alignItems: "center"
  },
  form: {
    marginVertical: 10
  },
  resourceinfo: {
    marginTop: 20
  },
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: "space-between"

  },
  heading: {
    fontSize: 20,
    fontWeight: "bold"
  },
  capture: {
    marginHorizontal: 10,
    marginTop: 10,
  }
}); 