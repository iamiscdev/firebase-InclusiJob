import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons (requires expo install)

export default function NotificationScreen() {
  // Sample notification data
  const notifications = [
    {
      id: '1',
      title: 'Ubiquity',
      message: 'Greetings! After performing detail...',
      time: '8:55 AM',
      icon: require('../../../assets/images/ubiquity-logo.png'),
      unread: true,
    },
    {
      id: '2',
      title: 'Concentrix',
      message: 'Good day, Mr. Carreon! I would like to...',
      time: 'Yesterday',
      icon: require('../../../assets/images/concentrix-logo.png'),
      unread: false,
    },
    {
      id: '3',
      title: 'PSG Find',
      message: 'Hello, we would like to inform you th...',
      time: 'Mon',
      icon: require('../../../assets/images/psg-logo.png'),
      unread: false,
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Image source={item.icon} style={styles.notificationIcon} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
      <View style={styles.notificationMeta}>
        <Text style={styles.notificationTime}>{item.time}</Text>
        {item.unread && <View style={styles.unreadIndicator} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <MaterialIcons name="more-vert" size={24} color="black" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notifications"
          placeholderTextColor="#888"
        />
        <MaterialIcons name="filter-list" size={20} color="#888" />
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      paddingTop: 50,
      paddingHorizontal: 16,
      paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#002974',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    color: '#000',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notificationMeta: {
    alignItems: 'flex-end',
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007BFF',
    marginTop: 4,
  },
});
