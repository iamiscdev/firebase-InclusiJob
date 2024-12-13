import React, {useState} from 'react';
import { View, KeyboardAvoidingView, Platform, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import {auth} from '../../firebase/config';
import {signOut} from 'firebase/auth';

export default function HomeScreen2(props) {
  const [settingsVisible, setSettingsVisible] = useState(false); // State to toggle pop-up visibility


  const userID = props.extraData?.id;
  const name = props.extraData?.fullName.split(' ')[0];
  const name2 = props.extraData?.fullName.split(' ')[1];

  const userName = name + " " + name2;

  // Function to toggle the visibility of the pop-up menu
  const toggleSettings = () => {
      setSettingsVisible(!settingsVisible);
  };

  const onLogoutPress = async () => {
      try {
          await signOut(auth);
          props.navigation.navigate('SignIn'); // Use props.navigation
      } catch (error) {
          alert(error.message);
      }
  };

  // Sample data for jobs
  const jobData = [
      {
          id: '1',
          category: 'PWD HIRING 2024',
          position: 'TELECOMS ASSOCIATE',
          salary: '₱62K/Mo',
          details: 'UBIQUITY • ⭐ 4.8 • 📍 MANILA',
          tags: ['Call Manager', 'Full Time'],
      },
      {
          id: '2',
          category: 'YOUTH HIRING 2024',
          position: 'Customer Service Representative Retail Account | Fairview',
          salary: '₱18-22K/Mo',
          details: 'PSG Find • ⭐ 4.5 • 📍 QUEZON CITY',
          tags: ['Retail', 'Full Time'],
      },
      {
          id: '3',
          category: 'YOUTH HIRING 2024',
          position: 'Customer Service Representative Retail Account | Fairview',
          salary: '₱18-22K/Mo',
          details: 'PSG Find • ⭐ 4.5 • 📍 QUEZON CITY',
          tags: ['Retail', 'Full Time'],
      },
  ];

  // Render each job card
  const renderItem = ({item}) => (
      <View style={styles.jobCard}>
          <Text style={styles.jobCategory}>{item.category}</Text>
          <Text style={styles.jobPosition}>{item.position}</Text>
          <View style={styles.salaryRow}>
              <Text style={styles.salary}>{item.salary}</Text>
              <Text style={styles.jobDetails}>{item.details}</Text>
          </View>
          <View style={styles.tagsRow}>
              {item.tags.map((tag, index) => (
                  <Text key={index} style={styles.tag}>
                      {tag}
                  </Text>
              ))}
          </View>
          <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
      </View>
  );

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
        >
            <View style={styles.container}>
                {/* Header Section */}
                <TouchableOpacity style={styles.header} onPress={toggleSettings}>
                    <Image
                        source={{uri: 'https://lh3.googleusercontent.com/a/ACg8ocL7Qolb0XP4DhMXv1YWf6OP1TmSAnmqm4Z_iOA7gk2UQXtjNQ=s288-c-no'}}
                        style={styles.profileImage}
                    />
                    <Text style={styles.greeting}>Hello, {"\n"}{userName}</Text>
                </TouchableOpacity>

                {/* Pop-up View for Settings */}
                {settingsVisible && (
                    <View style={styles.popupContainer}>
                        <View style={styles.popupContent}>
                            {/* Settings Options */}
                            <TouchableOpacity style={styles.optionButton}>
                                <Text style={styles.optionText}>Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton}>
                                <Text style={styles.optionText}>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={onLogoutPress}>
                                <Text style={styles.optionText}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                
                <SafeAreaView>
                    <ScrollView>
                        {/* Classifications Section */}
                        <Text style={styles.firstTitle}>Classifications</Text>
                        <View style={styles.classifications}>
                            <View>
                                <TouchableOpacity style={[styles.classificationBox, styles.blueBox]}>
                                    <Text style={styles.number}>44.5k</Text>
                                    <Text style={styles.label}>Marginalized Sectors</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={[styles.classificationBox2, styles.purpleBox]}>
                                    <Text style={styles.number2}>66.8k</Text>
                                    <Text style={styles.label2}>PWD</Text>
                                </TouchableOpacity>
                                <View style={[styles.classificationBox2, styles.orangeBox]}>
                                    <Text style={styles.number2}>38.9k</Text>
                                    <Text style={styles.label2}>Youth</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>

                {/* Suggested Jobs Section */}
                <Text style={styles.sectionTitle}>Suggested Jobs</Text>
                <FlatList
                    data={jobData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      paddingTop: 50,
      paddingHorizontal: 16,
      paddingVertical: 10,
  },

  scrollContainer: {
    paddingBottom: 5,
  },

  header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  },

  profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
      left: 285,
  },

  greeting: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#002974',
      left: -60,
  },

  popupContainer: {
      position: 'absolute',
      top: 110, // Adjust based on where you want the popup
      left: 150, // Adjust based on where you want the popup
      right: 5,
      borderRadius: 8,
      zIndex: 100, // To ensure it's on top of other components
  },

  popupContent: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 8,
  },

  optionButton: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
  },

  optionText: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
  },

  closeButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
  },

  classifications: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 24,
  },

  classificationBox: {
      flex: 1,
      padding: 16,
      borderRadius: 10,
      paddingVertical: 12, // Button height
      paddingHorizontal: 20, // Button width
      marginHorizontal: 6, // Spacing between buttons
      alignItems: 'center',
  },

  classificationBox2: {
      flex: 1,
      padding: 16,
      borderRadius: 10,
      paddingVertical: 12, // Button height
      paddingHorizontal: 55, // Button width
      marginVertical: 4, // Spacing between buttons
      alignItems: 'center',
      marginHorizontal: 4,
  },

  blueBox: {
      backgroundColor: '#AFECFE',
  },

  purpleBox: {
      backgroundColor: '#BEAFFE',
  },

  orangeBox: {
      backgroundColor: '#FFD6AD',
  },

  number: {
      fontSize: 20,
      fontWeight: 'bold',
      top: 35,
      color: '#333',
  },

  number2: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
  },

  label: {
      fontSize: 14,
      color: '#666',
      top: 45,
      textAlign: 'center',
  },

  label2: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
  },

  firstTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#002974',
      marginBottom: 16,
  },

  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 16,
  },

  jobCard: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
  },

  jobCategory: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#002974',
      marginBottom: 4,
  },

  jobPosition: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
  },

  salaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
  },

  buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Use this for spacing
      alignItems: 'center', // Align vertically in the center
      marginBottom: 12,
  },

  salary: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#4caf50',
  },

  jobDetails: {
      fontSize: 12,
      color: '#666',
  },

  tagsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
  },

  tag: {
      backgroundColor: '#f2f2f2',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      fontSize: 12,
      color: '#333',
      marginHorizontal: 2,
  },

  button: {
      flex: 1, // Equal width for all buttons
      paddingVertical: 12, // Button height
      borderRadius: 12, // Rounded corners
      marginHorizontal: 4, // Spacing between buttons
      alignItems: 'center',
  },

  applyButton: {
      flex: 1, // Equal width for all buttons
      paddingVertical: 12, // Button height
      borderRadius: 12, // Rounded corners
      marginHorizontal: 4, // Spacing between buttons
      alignItems: 'center',
      backgroundColor: '#002974',
  },

  grayButton: {
      flex: 1, // Equal width for all buttons
      paddingVertical: 12, // Button height
      borderRadius: 12, // Rounded corners
      marginHorizontal: 4, // Spacing between buttons
      alignItems: 'center',
      backgroundColor: '#F3F3F3', // Light gray background
  },

  applyButtonText: {
      color: '#fff',
      fontWeight: 'bold',
  },

});