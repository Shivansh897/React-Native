import React from "react";
import { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Pressable,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addBudgetDetails } from "../features/budgetData/budgetSlice";

import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
const AddBudget = (props) => {
  // State initialization
  const dispatch = useDispatch();
  const inputDatas = useSelector((state) => state.budget);

  const [budgetData, setBudgetData] = useState([]);

  const [showPicker, setShowPicker] = useState(false);

  const [allData, setAllData] = useState({
    itemId: "",
    itemName: "",
    plannedAmount: "",
    actualAmount: "",
    date: new Date(),
  });

  const [errors, setErrors] = useState({});

  // Function to validate form inputs
  const validateForm = () => {
    // Validation logic
    let errors = {};

    if (!allData.itemName) errors.itemName = "Name is required";
    if (!allData.plannedAmount)
      errors.plannedAmount = "Planned Amount is required";
    if (!allData.actualAmount)
      errors.actualAmount = "Actual Amount is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Function to toggle date picker visibility
  const toggleDatePicker = () => {
    // Toggles visibility of the date picker
    setShowPicker(!showPicker);
  };

  // Function to handle changes in the date picker
  const onChangeShowPicker = ({ type }, selectedDate) => {
    // Handles date picker changes
    if (type == "set") {
      const currentDate = selectedDate;
      setAllData((prevData) => ({
        ...prevData,
        date: currentDate,
      }));

      if (Platform.OS === "android") {
        toggleDatePicker();
        setAllData((prevData) => ({
          ...prevData,
          date: currentDate,
        }));
      }
    } else {
      toggleShowPicker();
    }
  };

  // Function to confirm date selection on iOS
  const confirmIOSDate = () => {
    // Confirms date selection on iOS
    setAllData((prevData) => ({
      ...prevData,
      date: allData.date,
    }));
    toggleDatePicker();
  };

  // Function to handle saving form data
  const handleSave = async () => {
    // Handles saving of form data
    if (validateForm()) {
      allData.itemId = uuid.v4();
      const date = allData.date;
      console.log(date);
      allData.date = date.toString();
      dispatch(addBudgetDetails(allData));

      console.log(budgetData);

      setAllData({
        itemName: "",
        plannedAmount: "",
        actualAmount: "",
        date: new Date(),
      });
    }
  };

  // Function to handle changes in form inputs
  const handleAllData = (name, value) => {
    // Handles changes in form inputs
    setAllData({
      ...allData,
      [name]: value,
    });
  };

  return (
    <KeyboardAvoidingView
    style={styles.conatiner}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
      <Image
        source={{
          uri: "https://edexec.co.uk/wp-content/uploads/2022/10/iStock-1286109030-661x381.jpg",
        }} // Replace with your URI
        style={styles.image}
      />
      <TextInput
        placeholder="Item Name"
        value={allData.itemName}
        onChangeText={(text) => handleAllData("itemName", text)}
        style={styles.allInputs}
      />
      {errors.itemName ? (
        <Text style={styles.errorText}>{errors.itemName}</Text>
      ) : null}
      <TextInput
        placeholder="Planned Amount"
        value={allData.plannedAmount}
        onChangeText={(text) => handleAllData("plannedAmount", text)}
        style={styles.allInputs}
        keyboardType="numeric"
      />
      {errors.plannedAmount ? (
        <Text style={styles.errorText}>{errors.plannedAmount}</Text>
      ) : null}
      <TextInput
        placeholder="Actual Amount"
        value={allData.actualAmount}
        onChangeText={(text) => handleAllData("actualAmount", text)}
        style={styles.allInputs}
        keyboardType="numeric"
      />
      {errors.actualAmount ? (
        <Text style={styles.errorText}>{errors.actualAmount}</Text>
      ) : null}
      <View>
        {showPicker && (
          <DateTimePicker
            mode="date"
            value={allData.date}
            display="spinner"
            onChange={onChangeShowPicker}
            style={styles.datePicker}
          />
        )}

        {showPicker && Platform.OS === "ios" && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={[
                styles.button,
                styles.pickerButton,
                {
                  backgroundColor: "#11182711",
                },
              ]}
              onPress={toggleDatePicker}
            >
              <Text style={[styles.buttonText, { color: "#075985" }]}>
                Cancle
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.pickerButton]}
              onPress={confirmIOSDate}
            >
              <Text style={[styles.buttonText]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPicker && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              value={allData.date.toString().split(" ").slice(0, 4).join(" ")}
              onChangeText={(text) => handleAllData("date", text)}
              style={styles.datePicker}
              editable={false}
              onPressIn={toggleDatePicker}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Save" onPress={handleSave} />

        <Button
          title="show"
          style={styles.button}
          onPress={() => props.navigation.navigate("Spendings")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddBudget;

const styles = StyleSheet.create({
  conatiner: {
    flexGrow: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  allInputs: {
    width: "90%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  pickerButton: {
    paddingHorizontal: 20,
    borderColor: "#ddd",
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    margin: 100,
    backgroundColor: "#075985",
  },
  buttonContainer: {
    flexDirection: "row",
    width:"50%",
    justifyContent:"space-between"
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
    backgroundColor: "transparent",
    paddingVertical: 0,
    marginTop: 0,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    width: "80%",
  },
});
