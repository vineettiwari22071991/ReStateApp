import { Card, FeaturedCard } from "@/components/Cards";
import NoResults from "@/components/NoResult";
import Search from "@/components/Search";
import Filters from "@/components/filters";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, FlatList, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {

  const { user } = useGlobalContext()
  const params = useLocalSearchParams<{ query?: string; filter: string }>()

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`)

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white px-2 flex-1">
      <View className="px-2">
        <View className="flex flex-row items-center justify-between mx-2 mt-5">
          <View className="flex-row flex items-start mx-2">
            <Image
              source={{ uri: user?.avatar }}
              className="w-8 h-8 rounded-full"
              resizeMode="contain"
            />
            <View className="flex flex-col ml-2">
              <Text className="text-sm font-rubik-light">Good Morning</Text>
              <Text className="text-sm font-rubik-bold">{user?.name}</Text>
            </View>
          </View>
          <Image
            source={icons.bell}
            className="w-6 h-6 items-end"
            resizeMode="contain"
          />
        </View>
        <Search />
      </View>
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => {
            handleCardPress(item.$id)
          }} />
        )}
        keyExtractor={(item) => item.$id.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-2">



            <View className="my-5 ">
              <View className="flex flex-row items-center justify-between mx-2 mt-2">

                <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>

              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}

             
            </View>


            <View className="my-3 ">
              <View className="flex flex-row items-center justify-between mx-2 mt-2">

                <Text className="text-xl font-rubik-bold text-black-300">Recommendation</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>

            </View>
            <Filters />

          </View>
        }
      />



    </SafeAreaView>
  );
}
