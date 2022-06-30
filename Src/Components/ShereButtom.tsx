import React from "react";
import { Share, View } from "react-native";
import { IconButton } from "react-native-paper";
const ShareButton = (url) => {
  const shere = url.url;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: shere,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View>
      <IconButton
        icon={require("../../Src/Components/assets/sherebuttom.png")}
        color="#6A7075"
        size={30}
        onPress={onShare}
      />
    </View>
  );
};

export default ShareButton;
