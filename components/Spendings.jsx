import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import FrontScreen from "./FrontScreen";
import { useSelector } from "react-redux";
import * as Progress from "react-native-progress";

const Spendings = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [speceficMonthData, setSpeceficMonthData] = useState([]);

  const { budgets } = useSelector((state) => state.budget);
  console.log(budgets);

  // savedItems

  //setsavedItems

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  useEffect(() => {
    if (selectedMonth !== null) {
      const filteredItems = budgets.filter((item) => {
        // Extract the month from the item's date
        const itemMonthName = new Date(item.date).toLocaleString("en-US", {
          month: "long",
        });

        console.log("selected month" + selectedMonth);
        console.log("item name month" + itemMonthName);

        // Compare the extracted month with the selected month
        return itemMonthName === selectedMonth;
      });
      setSpeceficMonthData(filteredItems);
    } else {
      console.log("NO month selected");
    }
  }, [selectedMonth]);

  const Separator = () => {
    return <View style={styles.separator} />;
  };

  const calculateTotalActualAmount = () => {
    let totalAmount = 0;
    budgets.forEach((item) => {
      totalAmount += parseFloat(item.actualAmount);
    });
    return totalAmount.toFixed(2); // Assuming you want to round the total to 2 decimal places
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    budgets.forEach((item) => {
      totalAmount += parseFloat(item.plannedAmount);
    });
    return totalAmount.toFixed(2); // Assuming you want to round the total to 2 decimal places
  };

  const calculatePercentage = () => {
    const totalActualAmount = parseFloat(calculateTotalActualAmount());
    const totalPlannedAmount = parseFloat(calculateTotalAmount());

    const percentage = (totalActualAmount / totalPlannedAmount) * 100;

    return parseFloat(percentage.toFixed(1));
  };

  const progressBarValue = calculatePercentage() / 100;

  const handlePress = (label) => {
    setSelectedMonth(label);
    setIsMonthSelected(true);
    setDropDown(!dropDown);
    console.log("Tapped item:", label);
  };

  return (
    <View style={{ backgroundColor: "#4f6d94" }}>
      <View style={styles.secondaryContainer}>
        <Entypo name="chevron-with-circle-left" size={38} color="#FAF9F6" />
        <Text style={styles.mainText}>${calculateTotalActualAmount()}</Text>
        <Entypo name="chevron-with-circle-right" size={38} color="#FAF9F6" />
      </View>
      <View style={styles.mainContainer}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 60,
            marginHorizontal: 20,
          }}
        >
          <Text style={styles.secondaryText}>Monthly Budget</Text>

          <Text style={{ fontWeight:"500" , color:"#C7C150"}}>${calculateTotalAmount()}</Text>
          <Text style={{ fontWeight:"500" , color:"green"}}>{calculatePercentage()}%</Text>
        </View>
        <Progress.Bar
          style={{ marginLeft: 15, marginTop:15 }}
          progress={progressBarValue}
          width={350}
          color="#1663C7"
        />

        {/* transactions */}
        <View style={styles.TransactionsHeading}>
          <Text style={styles.TransactionsText}>Transactions</Text>

          <TouchableOpacity onPress={() => setIsMonthSelected(false)}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 14, color: "#1663C7" }}>
                All Transactions{" "}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDropDown(!dropDown)}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginRight: 40,
              }}
            >
              <Text style={{ fontSize: 14, color: "#1663C7" }}>Month </Text>
              <Entypo name="chevron-down" size={20} color="#1663C7" />
            </View>
          </TouchableOpacity>
        </View>
        {dropDown &&
          months.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => handlePress(item.label)}
            >
              <View style={styles.dropDown}>
                <Text style={styles.dropDownText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        <Separator />

        <ScrollView>
          {isMonthSelected ? (
            <FrontScreen itemsToDisplay={speceficMonthData} />
          ) : (
            <FrontScreen itemsToDisplay={budgets} />
          )}
        </ScrollView>

        <Separator />
      </View>
    </View>
  );
};

export default Spendings;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "65%",
    // backgroundColor:"#4f6d94",
    backgroundColor: "white",
    // flexDirection:"column-reverse",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  secondaryContainer: {
    height: "35%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#4f6d94",
  },
  secondaryText: {
    color: "black",
    fontWeight: "600",
    fontSize:20
  },
  mainText: {
    fontSize: 48,
    fontWeight: "500",
    color: "#FAF9F6",
  },
  TransactionsText: {
    marginVertical: 20,
    marginLeft: 15,
    color: "black",
    fontWeight: "600",
    fontSize: 20,
  },
  TransactionsHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  separator: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "85%", // Adjust width as needed
  },
  TransactionsDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  TransactionsDetailsHeading: {
    fontWeight: "700",
    fontSize: 16,
  },
  dropDown: {
    height:25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  dropDownText:{
    fontWeight:"500",
    fontSize:16,
    marginBottom:4
  }
});
