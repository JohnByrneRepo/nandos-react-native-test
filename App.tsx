import React from 'react';
import { useState, useEffect } from 'react';
import type { Node } from 'react';
var DeviceInfo = require('react-native-device-info');

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';

type Address = {
  addressLocality: string,
  postalCode: string,
  streetAddress: string,
}

type Geo = {
  address: Address,
}

type Restaurant = {
  name: string,
  url: string,
  geo: Geo
}

const App: () => Node = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        'https://storage.googleapis.com/nandos-engineering-public/coding-challenge-rn/restaurantlist.json',
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {          
          setRestaurants(data.data.restaurant.items);
        });
    };
    fetchData();
  }, []);

  const trimAddress = (address: string) => {
    return address ? address.trim() : address;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.header}>Nando's Restaurants</Text>
      <Text style={styles.versionCode}>Version {DeviceInfo.getVersion()}</Text>
      <ScrollView style={styles.scrollView}>
        {restaurants.map((r: Restaurant, idx: number) => (
          <View style={styles.restaurantListItem} testID={idx === 0 ? 'listItemTestID' : ''} key={idx}>
            <Text style={styles.name}
              onPress={() => {
                Linking.openURL(r.url);
              }}>
              {r.name}
            </Text>
            <Text style={styles.address}>
              {r.geo.address.streetAddress.split(',')[0]}
            </Text>
            <Text style={styles.address}>
              {trimAddress(r.geo.address.streetAddress.split(',')[1])}
            </Text>
            <Text style={styles.postalCode}>
              {r.geo.address.postalCode}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    marginTop: 30
  },
  versionCode: {
    fontSize: 12,
    textAlign: 'center',
  },
  restaurantListItem: {
    width: '100%',
    padding: 30,
    height: 120,
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10
  },
  name: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 15
  },
  address: {
    fontSize: 12,
    color: '#000'
  },
  postalCode: {
    fontSize: 12,
    color: '#000'
  }
});

export default App;
