import React, { useState} from 'react';
import MapView from "react-native-map-clustering";  // culstering kümeleme
import { Marker } from "react-native-maps";
import { StyleSheet, Text, View} from 'react-native';
import vakalar from './Son 30 Gün olay Listesi.json';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';


export default function App() {

  const [item, setItem] = useState(vakalar);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{   //Burası bize merkez noktayı gösteriyor.
          latitude:41.014578,
          longitude: 28.979540,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {item.features.map(
          item => {   //Burası alınan Json dosyasında hiyerarşiyi ifade ediyor.
            if (typeof item["geometry"]["coordinates"][1] != "object") {  
              //İlk olarak geometri dizisindeki ilk elemanın içerisindeki coordinates dizisindeki 1. indise bakın ve nesne mi olduğunu bakın demek. 
              return(
                <Marker 
                  coordinate={{
                    latitude: item["geometry"]["coordinates"][1],
                    longitude: item["geometry"]["coordinates"][0]
                  }}
                  title={item.properties.adi}
                  key={item.id}
                >
                  <Text style={{fontSize:30}}>💥</Text>
                </Marker>
              )   
            }
          }
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: "100%",
  },
});