import { useNavigation } from "expo-router";
import { SettingsScreen } from "../../screens/user/settings";

export default function Modal() {
  const navigation = useNavigation();

  return <SettingsScreen />;
}
