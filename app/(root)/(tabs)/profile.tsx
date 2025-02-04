import { settings } from "@/constants/data";
import icons from "@/constants/icons"
import images from "@/constants/images"
import { Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface SettingItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: any;
    showArrow?: boolean;
}

const SettingItem = ({ icon, title, onPress, textStyle, showArrow }: SettingItemProps) => (
    <TouchableOpacity className=" hover:bg-slate-400"
    onPress={onPress}
    >
        <View className="flex flex-1 flex-row items-center justify-between rounded-full bg-slate-50 mt-2 py-2 px-2">
            <View className="flex-row items-center justify-center ">
                <Image
                    source={icon}
                    className="w-4 h-4 mx-2"
                />
                <Text className={`text-lg font-rubik-medium ${textStyle}`}>{title}</Text>

            </View>
            {
                showArrow && (
                    <Image
                        source={icons.rightArrow}
                        className="w-4 h-4"
                    />
                )
            }
        </View>

    </TouchableOpacity>
)


const ProfileScreen = () => {

    const handleLogout = async ()=>{
        console.log("Logout")
    }
    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="px-7 pb-32"
            >
                <View className="flex flex-row items-center justify-between mt-4">

                    <Text className="font-rubik-bold text-xl">Profile</Text>
                    <Image
                        source={icons.bell}
                        className="w-5 h-5"
                        resizeMode="contain"

                    />

                </View>
                <View className="flex flex-col justify-center items-center">
                    <Image
                        source={images.avatar}
                        className="size-40 rounded-full"
                    />
                    <View>
                        <TouchableOpacity className="items-center justify-center absolute bottom-11 -right-2">
                            <Image
                                source={icons.edit}
                                className="size-9"
                            />
                        </TouchableOpacity>
                        <Text className="text-2xl font-rubik-bold mt-">Adam | JSM</Text>
                    </View>
                </View>
                <View className="flex flex-col mt-10">
                    <SettingItem
                        icon={icons.calendar}
                        title="My Booking"
                        showArrow={true}
                    />
                    <SettingItem
                        icon={icons.wallet}
                        title="Payment"
                        showArrow={true}
                    />
                </View>
                <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                   {
                    settings.slice(2).map((item, index)=>{
                    return(
                        <SettingItem
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            showArrow={true}
                        />
                    
                    )
                    })
                   }
                </View>
                <View>
                    <SettingItem
                    icon={icons.logout}
                    title="Logout"
                    textStyle="text-danger"
                    onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen