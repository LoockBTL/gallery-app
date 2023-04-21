import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { RootState, useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { photoActions } from "../store/reducer/photosSlice";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TNavigation } from "../types/navigation.type";
import { useState } from "react";
import MiniPhotos from "./components/MiniPhoto";

type TPhotoProps = NativeStackScreenProps<TNavigation, "Home">;

export default function HomeScreen({ navigation }: TPhotoProps) {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const photos = useSelector((state: RootState) => state.photos.photos);
  useEffect(() => {
    dispatch(photoActions.callApi(page));
  }, []);
  if (photos.length === 0) {
    return (
      <ActivityIndicator
        size="large"
        color="#000000"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }
  return (
    <SafeAreaView>
      <FlatList
        onEndReachedThreshold={0.25}
        onEndReached={() => {
          dispatch(photoActions.callApi(page + 1));
          setPage((cur) => cur + 1);
        }}
        data={photos}
        keyExtractor={(item, index) => item.id + index}
        renderItem={(item) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Photo", {
                id: item.item.id,
                title: item.item.first_name,
              })
            }
          >
            <MiniPhotos details={item.item} />
          </TouchableOpacity>
        )}
      />
      <StatusBar />
    </SafeAreaView>
  );
}
