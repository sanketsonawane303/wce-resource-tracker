import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import AppImagePicker from '../components/ImagePicker'
import AppButton from '../components/AppButton';
const AttachImage = ({ route, navigation }) => {
    const [photo, setPhoto] = useState({})

    const { request } = route.params;
    console.log(request)

    const handleSubmit = () => {
        if (photo?.uri) {
            const body = new FormData()
            body.append('image', {
                uri: photo?.uri,
                type: photo?.type,
                name: photo?.name
            })
            body.append('requestid', request?._id)
            // body.append('type', 'handover')
            console.log(body)
        }
        else {
            alert("Please attach an image")
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.capture}>
                    <View>
                        <Text style={styles.heading}>Attach the Image</Text>
                    </View>
                    <AppImagePicker
                        imageUri={photo?.uri}
                        onChangeImage={(val) => {
                            setPhoto(val)
                        }}
                    />
                </View>
            </View>
            <View style={styles.button}>
                <AppButton title="Submit" onPress={handleSubmit} />
            </View>
        </>

    )
}

export default AttachImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    capture: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    button: {
        marginHorizontal: 10
    }
})