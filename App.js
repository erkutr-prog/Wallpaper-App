import * as React from "react";
import { useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert
} from "react-native";
import NavigationBar from 'react-native-navbar';
import { Picker } from "@react-native-picker/picker";
import RNFetchBlob from 'rn-fetch-blob';


function App() {
  const [data, setData] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("1");


  const getImage = async () => {
    var page = 0;
    page = Math.floor(Math.random() * 35);
    try {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=" + page.toString() + "&limit=" + selectedValue + ""
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadAlert = (item) => {
    Alert.alert(
      "Download",
      "Do you want to download the image?",
    [
      {
        text: "No",
      },
      {
        text:"Yes",
        onPress: () => downloadImage(item.download_url, item.author)
      }
    ]
    )
  }

  const downloadImage = async (fileUrl, saveName) => {
    let dirs = RNFetchBlob.fs.dirs

    fileUrl = fileUrl + ".jpg"

    await RNFetchBlob.config({
      appendExt: 'jpg',
      path: dirs.DownloadDir + "/download" + saveName + ".jpg",
      overwrite: false,
      indicator: true
    })
    .fetch('GET', fileUrl)
    .then((res) => {
      Alert.alert("Saved","The image saved to " + res.path())
    })
  }

  useEffect( () => {
    getImage();
 }, []);

  const Item = ({ item, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={() => downloadAlert(item)} >
      <Image style={styles.image} source={{ uri: item.download_url }} />
      <Text style={styles.itemText}>{item.author}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  const titleConfig = {
    title: "Wallpapers",
  }

  const rightButtonConfig = {
    title: "Refresh",
    handler: () => getImage(),
  };

  const leftButtonConfig = {
    title: "Filter",
    handler: () => setModalVisible(true),
  }

  return (
    <View style={styles.app}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select photo number to be shown:</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                </Picker>
                <Button color={'orange'} onPress={() => setModalVisible(false)} title="OK"></Button>
            </View>
          </View>
        </Modal>
      <NavigationBar title={titleConfig} style={styles.navbar} rightButton={rightButtonConfig} leftButton={leftButtonConfig} >
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
    alignItems: "center",
    backgroundColor: '#F5F5DC'
  },
  image: {
    width: 300,
    height: 500,
    alignSelf: "center"
  },
  navbar: {
    backgroundColor: "#F5F5DC",
  },
  itemText: {
    fontWeight: "bold"
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F5F5DC",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    height: 200,
    width: 350
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    position: 'relative', 
    paddingTop: 2, 
    fontWeight: 'bold'
  }
});

export default App;
