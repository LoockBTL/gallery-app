import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { IPhotoMin } from "../../types/entity.types";

type TMiniPhotos = { details: IPhotoMin };

export default function MiniPhotos({ details }: TMiniPhotos) {
  return (
    <SafeAreaView style={style.div}>
      <View style={style.photo__div}>
        <Image style={style.photo} source={{ uri: details.thumb }} />
      </View>
      <View style={style.text__div}>
        <Text style={style.text}>{`Author: ${details.first_name}`}</Text>
        <Text
          style={style.text}
        >{`Description: ${details.alt_description}`}</Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  div: {
    display: "flex",
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
  },
  photo__div: {
    width: "50%",
    marginRight: 5,
  },
  text__div: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    resizeMode: "cover",
    width: "100%",
    height: 200,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    width: "80%",
  },
});
