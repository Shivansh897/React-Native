import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FrontScreen = ({ itemsToDisplay }) => {
  return (
    <View>
      {itemsToDisplay.map((item, index) => (
        <View key={item.itemId}>
          <View style={styles.TransactionsDetails}>
            <View style={styles.column}>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.itemAttribute}>
                Added on: {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.amount}>
                Planned Amount: ${item.plannedAmount}
              </Text>
              <Text style={styles.itemAttribute}>
                Actual Amount: ${item.actualAmount}
              </Text>
            </View>
          </View>
          {index !== itemsToDisplay.length - 1 && (
            <View style={styles.separator} />
          )}
        </View>
      ))}
    </View>
  );
};

export default FrontScreen;

const styles = StyleSheet.create({
  TransactionsDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  column: {
    flex: 1,
  },
  itemName: {
    fontWeight: "700",
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemAttribute: {
    fontSize: 14,
    color: "#777",
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
});
