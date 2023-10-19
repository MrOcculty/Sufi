import { SafeAreaView, StatusBar, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

const Container = ({ heading, children, navbar }) => {
    const bgColor = useSelector(state => state.currentSong.data?.basic_info?.bgColor || state.generalData.bgColor)
    return (
        <View style={{ flex: 1, backgroundColor: "rgb(0,0,0)", height: Dimensions.get('window').height }}>
            <View style={{ flex: 1, backgroundColor: bgColor, height: Dimensions.get('window').height }}>
                <SafeAreaView>
                    <StatusBar translucent backgroundColor={"transparent"} />
                    <Header heading={heading} />
                    {navbar && <Navbar selectedTab={heading} />}
                    {children}
                </SafeAreaView>
            </View>
        </View>
    )
}

export default Container