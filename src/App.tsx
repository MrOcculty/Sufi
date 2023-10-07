import store from './redux_toolkit/store'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Songs from './screens/Songs/Songs'
import QuickPicks from './screens/QuickPicks/QuickPicks'
import Playlists from './screens/Playlists/Playlists'
import Artists from './screens/Artists/Artists'
import Albums from './screens/Albums/Albums'
import AlbumPage from './screens/Albums/AlbumPage'
import ArtistPage from './screens/Artists/ArtistPage'
import PlaylistPage from './screens/Playlists/PlaylistPage'
import SongPage from './screens/Songs/SongPage'
import PlaybackControllerDisplayer from './components/PlaybackController'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='QuickPicks' screenOptions={{ headerShown: false, animation: 'fade' }} >
          <Stack.Screen
            name="QuickPicks"
            component={QuickPicks}
          />
          <Stack.Screen
            name="Songs"
            component={Songs}
          />
          <Stack.Screen
            name="Artists"
            component={Artists}
          />
          <Stack.Screen
            name="Albums"
            component={Albums}
          />
          <Stack.Screen
            name="Playlists"
            component={Playlists}
          />
          <Stack.Screen
            name="SongPage"
            component={SongPage}
          />
          <Stack.Screen
            name="AlbumPage"
            component={AlbumPage}
          />
          <Stack.Screen
            name="ArtistPage"
            component={ArtistPage}
          />
          <Stack.Screen
            name="PlaylistPage"
            component={PlaylistPage}
          />
        </Stack.Navigator>
        <PlaybackControllerDisplayer />
      </NavigationContainer>
    </Provider>
  )
}

export default App