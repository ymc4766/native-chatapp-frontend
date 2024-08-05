import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import CustomInput from "../components/CustomInput";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import DatePicker from "../components/DatePicket";
import OptionModal from "../components/OptionModal";
import categories from "../utils/categories";
import colors from "../utils/colors";
import AppButton from "../ui/AppButton";
import CustomKeyAvoidingView from "../ui/CustomKeyAvoidingView";

type Props = {};
const NewListing: FC<Props> = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [purchasingDate, setPurchasingDate] = useState(new Date());
  const [productInfo, setProductInfo] = useState({
    productName: "",
    productPrice: "",
    description: "",
    name: "",
    purchasingDate: new Date(),
  });

  return (
    <CustomKeyAvoidingView>
      <View style={styles.container}>
        <Pressable
          style={styles.fileSelector}
          className="border-slate-400 p-2 rounded-2xl"
        >
          <View className="border border-gray-300 p-2 rounded-2xl">
            <FontAwesome5 name="images" size={24} color="black" />
          </View>
          <Text className="text-sm  text-primary-400">Add Images</Text>
        </Pressable>

        <CustomInput placeholder="product Name" />
        <CustomInput placeholder="product Price" />
        <DatePicker
          title="Purchasing Date: "
          value={purchasingDate}
          onChange={(date) => {
            setPurchasingDate(date);
            setProductInfo({ ...productInfo, purchasingDate: date });
          }}
        />

        <CustomInput placeholder=" description" multiline numberOfLines={4} />

        <Pressable
          onPress={() => setShowCategoryModal(true)}
          style={styles.categorySelector}
        >
          <Text style={styles.categoryTitle}>Category</Text>
          <AntDesign name="caretdown" size={24} color="black" />
        </Pressable>

        <AppButton title="New Product" />

        <OptionModal
          visible={showCategoryModal}
          onRequestClose={setShowCategoryModal}
          options={categories}
          renderItem={(item) => {
            return (
              <View className="flex flex-row  items-center">
                <View
                  style={{ transform: [{ scale: 0.5 }] }}
                  className="text-slate-200 text-lg "
                >
                  {item.icon}
                </View>
                <Text style={styles.category} className="text-slate-200">
                  {item.name}
                </Text>
              </View>
            );
          }}
          onPress={(item) => {
            console.log(item);
          }}
        />
      </View>
    </CustomKeyAvoidingView>
  );
};

export default NewListing;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  fileSelector: {
    alignItems: "center",
    justifyContent: "center",
  },
  category: {
    paddingVertical: 10,
  },
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.deActive,
    borderRadius: 5,
  },
  categoryTitle: {
    color: colors.primary,
  },
});
