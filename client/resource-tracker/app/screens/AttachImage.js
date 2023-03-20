import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import AppImagePicker from '../components/ImagePicker'
import AppButton from '../components/AppButton';
import LoadingButtonButton from '../components/LoadingButton';
import { getResource } from '../apis/resource';
import { uploadImages, updateKeyStatus } from '../apis/keys';
import useAuth from '../auth/useAuth';
const AttachImage = ({ route, navigation }) => {
    const [photo, setPhoto] = useState({})
    const [id_card, setIdCard] = useState({})
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()
    const { request } = route.params;


    const handleSubmit = async () => {
        if (photo?.uri && id_card?.uri) {

            const mainbody = {
                key_id: request.key,
                request_id: request._id,
                from: request.type == "handover" ? {
                    role: "helper",
                    email: user.email
                } : {
                    role: "representative",
                    email: request.applicant
                },
                to: request.type == "return" ? {
                    role: "helper",
                    email: user.email
                } : {
                    role: "representative",
                    email: request.applicant
                },
                id_link: "",
                photo_link: "",
                key_status: request.type === "handover" ? "granted" : "returned"

            }
            setLoading(true)

            const body = new FormData()
            body.append('photo', {
                uri: photo?.uri,
                type: "image/jpeg",
                name: "student_" + Date.now()
            })

            body.append('id_card', {
                uri: id_card?.uri,
                type: "image/jpeg",
                name: "id_card_" + Date.now()
            })
            const key_ids = []

            for (let i = 0; i < request.resources.list.length; i++) {
                const name = request.resources.list[i]
                console.log(name)

                const res = await getResource({ name })
                console.log(res.data)
                key_ids.push(res.data.data.key_id)
            }

            try {
                uploadImages(body).then((res) => {
                    console.log(res.data)
                    if (res.ok && res.data.status == "success") {

                        mainbody.photo_link = res?.data?.data?.photo_link
                        mainbody.id_link = res?.data?.data?.id_link
                        console.log(mainbody)

                        for (let i = 0; i < key_ids.length; i++) {
                            let key_id = key_ids[i];

                            mainbody.key_id = key_id;

                            updateKeyStatus(mainbody).then((res) => {
                                console.log(res.data)
                            })
                                .catch((error) => {

                                })
                        }
                        setLoading(false)
                        alert("Upload Successful")
                        navigation.navigate("Home")

                    }
                })
                    .catch((err) => {
                        console.log(err)
                    })


            }

            catch (err) {

            }





        }
        else {
            alert("Please attach both images")
        }


    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.capture}>
                    <View style={{
                        alignItems: "flex-start",
                    }}>
                        <View>
                            <Text style={styles.heading}>Attach the Photo of Student </Text>
                        </View>
                        <AppImagePicker
                            imageUri={photo?.uri}
                            onChangeImage={(val) => {
                                setPhoto(val)
                            }}
                        />
                    </View>

                    <View style={{
                        alignItems: "flex-start",
                        marginTop: 50
                    }}>
                        <View>
                            <Text style={styles.heading}>Attach the Photo of Student ID Card</Text>
                        </View>
                        <AppImagePicker
                            imageUri={id_card?.uri}
                            onChangeImage={(val) => {
                                setIdCard(val)
                            }}
                        />
                    </View>

                </View>
            </View>
            {
                loading ? <View style={styles.button}>
                    <LoadingButtonButton />
                </View> : <View style={styles.button}>
                    <AppButton title="Submit" onPress={handleSubmit} />
                </View>
            }

        </>

    )
}

export default AttachImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    capture: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20
    },
    button: {
        marginHorizontal: 10
    },
    heading: {
        fontSize: 17,
        fontWeight: "700"
    }
})