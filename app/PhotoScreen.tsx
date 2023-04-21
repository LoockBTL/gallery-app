import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import { TNavigation } from "../types/navigation.type";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

type TPhotoProps = NativeStackScreenProps<TNavigation, "Photo">;

export default function PhotoScreen({ route, navigation }: TPhotoProps) {
  const { params } = route;
  const photo = useSelector((state: RootState) =>
    state.photos.photos.find((item) => params.id === item.id)
  );
  navigation.setOptions({ title: params.title });
  return (
    <SafeAreaView>
      <Image source={{ uri: photo?.full }} style={style.photo} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  photo: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
});
