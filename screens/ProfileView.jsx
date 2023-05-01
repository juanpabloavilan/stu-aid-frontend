import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import StyledView from "../styled_components/StyledView";
import useThemedStyles from "../hooks/useThemedStyles";
import StyledText from "../styled_components/StyledText";
import { useContext } from "react";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import useJwtLogInService from "../hooks/useJwtLogInService";
import { useEffect } from "react";
import { useState } from "react";
import { log } from "react-native-reanimated";
import StyledButton from "../components/StyledButton";

const ProfileView = () => {
  const styles = useThemedStyles(stylesheetCallback);
  const authStorage = useContext(AuthStorageContext);
  const { jwtSignIn } = useJwtLogInService();

  const onLogOut = async () => {
    await authStorage.removeAccessToken();
    await authStorage.removeUserInfo();
    const accessToken = null;
    await jwtSignIn(accessToken);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await authStorage.getUserInfo();
      setUser(userInfo);
    };
    getUserInfo();
  }, []);

  return (
    <StyledView main paddingDefault>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ProfileIcon style={styles.profileIcon} name="user-circle" size={100} />
      </View>
      <StyledView
        rounded
        bgSecondary
        style={{ paddingVertical: 8, paddingHorizontal: 16, marginTop: 16 }}
      >
        <StyledText style={{ marginTop: 4 }}>
          Nombre: {user?.fullname}
        </StyledText>
        <StyledText style={{ marginTop: 8 }}>Email: {user?.email}</StyledText>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <StyledButton red rounded style={styles.button} onPress={onLogOut}>
            <StyledText white bold>
              Cerrar sesión
            </StyledText>
          </StyledButton>
        </View>
      </StyledView>
    </StyledView>
  );
};

export default ProfileView;

const stylesheetCallback = (theme) =>
  StyleSheet.create({
    profileIcon: {
      color: theme.themeTokens.regularIconColor,
    },
    button: {
      marginVertical: 16,
      marginHorizontal: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });
