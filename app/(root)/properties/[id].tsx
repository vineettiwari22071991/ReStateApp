import Comment from "@/components/Comment"
import { facilities } from "@/constants/data"
import icons from "@/constants/icons"
import images from "@/constants/images"
import { getPropertyById } from "@/lib/appwrite"
import { useAppwrite } from "@/lib/useAppwrite"
import { router, useLocalSearchParams } from "expo-router"
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, Platform, FlatList, ActivityIndicator } from "react-native"

const { width, height } = Dimensions.get("window")
const PropertyScreen = () => {
    const { id } = useLocalSearchParams<{ id?: string }>()
    const { data: property, loading } = useAppwrite({
        fn: getPropertyById,
        params: {
            id: id!
        }
    })
    if(loading) {
        return(
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" className="text-primary-300 mt-5" />
            </View>
            
        )
       
    }
   
    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-40 bg-white"
            >
                <View style={{
                    height: height / 2

                }}
                    className="relative w-full"
                >
                    <Image
                        source={{ uri: property?.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />

                    <Image
                        source={images.whiteGradient}
                        className="absolute top-0 w-full z-40"
                    />

                    <View
                        className="z-50 absolute inset-x-7"
                        style={{
                            top: Platform.OS === "ios" ? 70 : 20,
                        }}
                    >
                        <View className=" absolute top-1 w-full ">
                            <View className="flex flex-1 flex-row justify-between items-center">
                                <TouchableOpacity
                                    onPress={() => router.back()}
                                    className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                                >
                                    <Image
                                        source={icons.backArrow}
                                        className="w-8 h-8"
                                        resizeMode="contain"
                                        tintColor="black"
                                    />
                                </TouchableOpacity>

                                <View className="flex flex-row gap-x-4 items-center">
                                    <Image
                                        source={icons.heart}
                                        className="w-8 h-8"
                                        resizeMode="contain"
                                        tintColor={"#191D31"}
                                    />
                                    <Image
                                        source={icons.send}
                                        className="w-8 h-8"
                                        resizeMode="contain"
                                    />
                                </View>

                            </View>
                        </View>

                    </View>



                </View>
                <View className=" mx-5 mt-2">
                    <Text className="text-xl font-rubik-bold">{property?.name}</Text>
                    <View className="items-center flex-row gap-3">
                        <View className="flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
                            <Text className="text-xs font-rubik-bold text-primary-300">{property?.type}</Text>
                        </View>
                        <View className="flex-row items-center gap-x-2">
                            <Image
                                source={icons.star}
                                className="size-5"
                                resizeMode="contain"
                            />
                            <Text className="text-xs font-rubik-medium text-black-200 self-center">
                                {property?.rating} ({property?.reviews.length} reviews)
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-center gap-x-4 mt-2">

                        <View className="flex-row gap-x-3 items-center">
                            <View className="rounded-full px-2 py-2 bg-primary-100">
                                <Image
                                    source={icons.bed}
                                    className="size-4"
                                    resizeMode="contain"
                                />
                            </View>

                            <Text className="text-xs font-rubik-medium text-black-200">{property?.bedrooms} Beds</Text>

                        </View>

                        <View className="flex-row gap-x-3 items-center">
                            <View className="rounded-full px-2 py-2 bg-primary-100">
                                <Image
                                    source={icons.bath}
                                    className="size-4"
                                    resizeMode="contain"
                                />
                            </View>

                            <Text className="text-xs font-rubik-medium text-black-200">{property?.bathrooms} Bath</Text>

                        </View>

                        <View className="flex-row gap-x-3 items-center">
                            <View className="rounded-full px-2 py-2 bg-primary-100">
                                <Image
                                    source={icons.area}
                                    className="size-4"
                                    resizeMode="contain"
                                />
                            </View>

                            <Text className="text-xs font-rubik-medium text-black-200">{property?.area} sqft</Text>

                        </View>
                    </View>


                    <View className="bg-slate-100 w-full h-0.5 mt-5 mb-5" />

                    <View>
                        <Text className="text-xl font-rubik-bold text-black-300">Agent</Text>

                        <View className="flex flex-row justify-between items-center mt-3 mb-2">
                            <View className="flex-row gap-x-4">

                                <Image
                                    source={{ uri: property?.agent.avatar }}
                                    className="size-14 rounded-full"
                                />
                                <View className="flex-col">
                                    <Text className="text-md font-rubik-bold text-black-300 text-start">{property?.agent.name}</Text>
                                    <Text className="text-sm font-rubik-medium text-black-100 text-start">{property?.agent.email}</Text>
                                </View>

                            </View>

                            <View className="flex-row gap-x-4 items-center">
                                <Image
                                    source={icons.phone}
                                    className="size-6 rounded-full"
                                />
                                <Image
                                    source={icons.chat}
                                    className="size-6 rounded-full"
                                />

                            </View>

                        </View>

                        <View className="mt-7">
                            <Text className="text-black-300 text-xl font-rubik-bold">
                                Overview
                            </Text>
                            <Text className="text-black-200 text-base font-rubik mt-2">
                                {property?.description}
                            </Text>
                        </View>

                    </View>

                    <View className="mt-7">
                        <Text className="text-black-300 text-xl font-rubik-bold">
                            Facilities
                        </Text>

                        <View className="mt-4">
                            {
                                property?.facilities.length > 0 && (
                                    <View className="flex flex-row flex-wrap gap-3">

                                        {
                                            property?.facilities.map((item: string, index: number) => {
                                                const facility = facilities.find(
                                                    (facility) => facility.title === item
                                                )

                                                return (
                                                    <View key={index}
                                                        className="flex flex-col min-w-16 max-h-20 items-center"

                                                    >
                                                        <View className="items-center px-2 py-2 bsize-14 bg-primary-100 rounded-full flex justify-center">
                                                            <Image
                                                                source={facility ? facility.icon : icons.info}
                                                                className="size-6"
                                                            />



                                                        </View>
                                                        <Text
                                                            numberOfLines={1}
                                                            ellipsizeMode="tail"
                                                            className="text-black-300 text-sm text-center font-rubik mt-1.5"
                                                        >{item}</Text>

                                                    </View>
                                                )
                                            })
                                        }

                                    </View>

                                )
                            }
                        </View>




                    </View>

                    {
                        property?.gallery.length > 0 && (
                            <View className="mt-7">
                                <Text className="text-black-300 text-xl font-rubik-bold">
                                    Gallery
                                </Text>

                                <FlatList
                                    data={property?.gallery}
                                    renderItem={({ item }) => {
                                        return (
                                            <Image
                                                source={{ uri: item.image }}
                                                className="size-40 rounded-xl"
                                            />
                                        )
                                    }}
                                    keyExtractor={(item) => item.$id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerClassName="flex gap-4 mt-3"
                                    contentContainerStyle={{ paddingRight: 20 }}
                                />
                            </View>
                        )
                    }
                    <View className="mt-7">
                        <Text className="text-black-300 text-xl font-rubik-bold">
                            Location
                        </Text>
                        <View className="flex flex-row items-center justify-start mt-4 gap-2">
                            <Image source={icons.location} className="w-7 h-7" />
                            <Text className="text-black-200 text-sm font-rubik-medium">
                                {property?.address}
                            </Text>
                        </View>

                        <Image
                            source={images.map}
                            className="h-52 w-full mt-5 rounded-xl"
                        />
                    </View>


                    {
                        property?.reviews.length > 0 && (
                            <View className="mt-7">

                                <View className="flex flex-row justify-between items-end">
                                    <View className="flex gap-x-1 flex-row">
                                        <Image
                                            source={icons.star}
                                            className="size-8"
                                            resizeMode="contain"
                                        />
                                        <Text className="font-bold text-xl text-black-300"> {property?.rating} ({property?.reviews.length} reviews)</Text>

                                    </View>
                                    <TouchableOpacity>
                                        <Text className="font-bold text-sm text-primary-300">See All</Text>
                                    </TouchableOpacity>


                                </View>
                                <FlatList
                                    data={property?.reviews}
                                    renderItem={({ item }) => {
                                        return (
                                            <Comment item={item} />
                                        )
                                    }}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerClassName="pb-2 mt-4"
                                />

                            </View>
                        )
                    }

                </View>




            </ScrollView>
            <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
                <View className="flex flex-row items-center justify-between">
                    <View className="flex-col flex items-start">
                        <Text className="text-black-200 text-xs font-rubik-medium">Price</Text>
                        <Text
                            numberOfLines={1}
                            className="text-primary-300 text-start text-2xl font-rubik-bold"
                        >
                            ${property?.price}
                        </Text>
                    </View>
                    <TouchableOpacity className="bg-primary-300 py-4 px-20 rounded-full items-center justify-center">
                        <Text className="text-md text-white font-rubik-medium">Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PropertyScreen