import * as React from "react";
import { useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Alert
} from "react-native";
import NavigationBar from 'react-native-navbar';


function App() {
  const [data, setData] = React.useState([]);

  const getImage = async () => {
    var page = 0;
    page = Math.floor(Math.random() * 35);
    try {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=" + page.toString() + "&limit=10"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect( () => {
    getImage();
 }, []);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.image} source={{ uri: item.download_url }} />
      <Text style={styles.itemText}>{item.author}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return <Item item={item}   />;
  };

  const titleConfig = {
    title: "Wallpapers",
  }

  const rightButtonConfig = {
    title: "Refresh",
    handler: () => getImage(),
  };

  return (
    <View style={styles.app}>
      <NavigationBar title={titleConfig} style={styles.navbar} rightButton={rightButtonConfig} >
      </NavigationBar>
      <View style={styles.imageContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 300,
    height: 500,
    alignSelf: "center"
  },
  btn: {
    height: 100,
    width: 100,
    alignSelf: "auto"
  },
  navbar: {
    backgroundColor: "#fff",
  },
  itemText: {
    fontWeight: "bold"
  }
});

export default App;
