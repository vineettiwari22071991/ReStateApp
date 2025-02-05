import icons from "@/constants/icons";
import { Text, View, Image } from "react-native"
import { Models } from "react-native-appwrite"

interface Props {
    item: Models.Document;
}

const Comment = ({ item }: Props) => {
    return (
        <View className="flex-1 w-full rounded-lg py-4 px-4 m-5 bg-slate-50">
            <View className="flex-row w-full gap-x-3">
                <Image
                    source={{ uri: item.avatar }}
                    className="size-16 rounded-full"
                    resizeMode="cover"
                />
                <Text className="text-base font-rubik-medium text-black-300">{item.name}</Text>

            </View>

            <Text className="text-base mt-4 mb-4 font-rubik-light">{item.review}</Text>

            <View className="flex flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <Image
                        source={icons.heart}
                        className="size-5"
                        tintColor={"#0061FF"}
                    />
                    <Text className="text-black-300 text-sm font-rubik-medium ml-2 mt-1">
                    120
                </Text>
                </View>
                <Text className="text-black-100 text-sm font-rubik"> {new Date(item.$createdAt).toDateString()}</Text>

            </View>
        </View>
    )
}

export default Comment