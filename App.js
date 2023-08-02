import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import dataJson from "./src/assets/data.json";
export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");

  const [dataSearch, setDataSearch] = useState([]);

  const fetchPostDataApi = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "Nhat",
        body: "Dev",
        usedId: "1",
      }),
      headers: {
        "Content-type": "application/json ; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error));
  };

  const fetchGetDataApi = async (page = 0) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getDataApi = async (page) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetchGetDataApi(page);
      const items = data.concat(response);
      setData(items);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    await fetchGetDataApi();
  };
  const searchData = (textSeach) => {
    const dataFillter = dataJson.filter((item) =>
      item.models.includes(textSeach)
    );

    if (dataFillter.length !== 0) {
      const data1 = dataFillter[0].models.filter((item) =>
        item.includes(textSeach)
      );

      setDataSearch(data1);
      console.log("-------", data1);
    }
  };

  // useEffect(() => {
  //   searchData();
  // }, [text]);
  useEffect(() => {
    getDataApi();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 20, color: "#949" }}>{item}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button
          backgroundColor="#912"
          title="Post "
          onPress={fetchPostDataApi}
        />
        <TextInput
          style={{
            height: 40,
            width: 250,
            margin: 12,
            borderColor: "#768",
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={(text) => {
            searchData(text);
          }}
          placeholder="Search"
        />
        <FlatList
          data={dataSearch}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          // onEndReached={() => getDataApi(data.length / 20 + 1)}
          // onEndReachedThreshold={0.1}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={loading}
          //     tintColor="red"
          //     onRefresh={onRefresh}
          //   />
          // }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
