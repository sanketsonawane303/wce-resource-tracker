import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import RequestCard from '../components/RequestCard'

const Requests = () => {
    return (
        <ScrollView>
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
        </ScrollView>
    )
}

export default Requests

const styles = StyleSheet.create({})