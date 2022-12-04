import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import DropDownPicker from 'react-native-dropdown-picker';
import AppButton from '../components/AppButton';

import RequestInfoShortCard from '../components/RequestInfoShortCard';
import { getAllRequests } from '../apis/request';
import { useIsFocused } from '@react-navigation/native';
const items = [{
  label: "Handover Keys", value: "handover"
},
{ label: "Return", value: "return" }
]

export default function ApproveResource({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [requestid, setRequestid] = useState('6385ad7d0d17f478202fc6ff');
  const [request, setRequest] = useState(null);
  const focus = useIsFocused()

  const handleCamera = async () => {
    try {
      const result = await launchImageLibrary()

    } catch (error) {
    }

  }

  const getRequestDetails = () => {
    const body = {
      _id: requestid
    }

    getAllRequests(body).then(res => {
      setRequest(res?.data?.data[0])
    }).catch(err => {
      console.log(err)
    }
    )
  }

  useEffect(() => {
    if (!focus) return;
    setRequest(null);
    setRequestid(null);
    setScanned(false);
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();



  }, [focus]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getRequestDetails();
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
            scanned ? null :
              <View style={styles.scanner}>
                <Text style={{
                  fontWeight: "bold",
                  marginBottom: 5,
                  fontSize: 20
                }}>
                  Scan the QR Code of Request
                </Text>

                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  // style={StyleSheet.absoluteFillObject}
                  style={{
                    width: 200,
                    height: 200
                  }}
                />

              </View>

          }
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

          {
            request ? (
              <View>
                <View style={styles.resourceinfo}>
                  <RequestInfoShortCard {...request} />
                </View>


              </View>)
              : null
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