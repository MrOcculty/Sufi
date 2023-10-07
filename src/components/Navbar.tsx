import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import cfs from '../utils/fontUtils'

const Navbar = ({ selectedTab }) => {
    const navigation = useNavigation()
    return (
        <>
            <ScrollView style={styles.navScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.wrapper}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("QuickPicks")}>
                            <Text style={[styles.tabText, selectedTab === 'Quick picks' ? styles.activeTab : styles.inActiveTab]}>Quick pics</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("Songs")}>

                            <Text style={[styles.tabText, selectedTab === 'Songs' ? styles.activeTab : styles.inActiveTab]}>Songs</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("Artists")}>
                            <Text style={[styles.tabText, selectedTab === 'Artists' ? styles.activeTab : styles.inActiveTab]}>Artists</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("Albums")}>
                            <Text style={[styles.tabText, selectedTab === 'Albums' ? styles.activeTab : styles.inActiveTab]}>Albums</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("Playlists")}>
                            <Text style={[styles.tabText, selectedTab === 'Playlists' ? styles.activeTab : styles.inActiveTab]}>Playlists</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navScroll: {
        width: cfs(340),
        marginLeft: cfs(20),
    },
    wrapper: {
        flex: 1,
        flexDirection: "row",
        marginVertical: cfs(20),
        columnGap: cfs(10)
    },
    tabText: {
        paddingHorizontal: cfs(10),
        borderRadius: cfs(5),
        height: cfs(25),
        fontSize: cfs(15),
        fontWeight: "bold",
        color: "#ffffff"
    },
    activeTab: {
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    inActiveTab: {
        opacity: 0.65,
        backgroundColor: "#614747"
    }
})