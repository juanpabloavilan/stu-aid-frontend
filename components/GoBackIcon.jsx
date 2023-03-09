import { View, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const GoBackIcon = ({ style, goBack, color }) => {
  return (
    <TouchableWithoutFeedback style={style} onPress={goBack}>
      <View style={style}>
        <Icon name="chevron-back" size={40} color={color} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GoBackIcon;
