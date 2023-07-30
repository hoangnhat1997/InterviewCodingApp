import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataApi = async (page = 0) => {
    setLoading(true);
    return await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
    )
      .then((res) => res.json())
      .then((json) => {})
      .catch((err) => console.log(err));
  };

  const getDataApi = async() =>{
    const response = await fetchDataApi()
    
  }

  const onRefresh = () => {};

  useEffect(() => {
    getDataApi();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 20, color: "#949" }}>{item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={() => getDataApi(data.length / 20 + 1)}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              tintColor="red"
              onRefresh={onRefresh}
            />
          }
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
