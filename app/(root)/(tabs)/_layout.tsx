import { Tabs } from "expo-router"
import { Image, View, Text } from "react-native"
import icons from "@/constants/icons"

const TabsLayout = () => {

    const TabIcon = ({ focused, title, icon }: {
        focused: boolean;
        title: string; icon: any
    }) => (
        <View className="flex-1 mt-3 flex flex-col items-center">
            <Image
                source={icon}
                tintColor={focused ? '#0061ff' : '#666876'}
                resizeMode="contain"
                className="size-6"
            />
            <Text className={`${focused ? 'text-primary-300' : 'text-black-300'} text-xs mt-1 font-rubik w-full`}>{title}</Text>
        </View>
    )
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    elevation: 0,
                    borderTopColor: "#0061FF1A",
                    borderTopWidth: 1,
                    position: 'absolute',
                    minHeight: 70
                },
                headerShown: false
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.home} focused={focused} title="Home" />
                    )
                }}

            />

            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.search} focused={focused} title="Explore" />
                    )
                }}

            />

            <Tabs.Screen 
            name= "profile"
            options={{
                title:'Profile',
                tabBarIcon:({focused}) => (
                    <TabIcon icon={icons.person} focused={focused} title="Profile"/>
                )
            }}
            />

        </Tabs>
    )
}

export default TabsLayout