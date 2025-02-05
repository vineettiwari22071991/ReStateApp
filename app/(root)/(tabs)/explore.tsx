import { Card } from "@/components/Cards";
import NoResults from "@/components/NoResult";
import Search from "@/components/Search";
import Filters from "@/components/filters";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ExploreScreen = () => {
    const params = useLocalSearchParams<{ query?: string; filter: string }>()


    const {
        data: properties,
        refetch,
        loading,
    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 20,
        },
        skip: true,
    });

    const handleCardPress = (id: string) => router.push(`/properties/${id}`)

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 20,
        });
    }, [params.filter, params.query]);

    return (
        <SafeAreaView className="bg-white px-2 flex-1">

            <View className="px-5">

                <Search />
                <View className="mt-5">
                    <Filters />
                    {
                        <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                            Found {properties?.length} Properties
                        </Text>
                    }

                </View>
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
            />



        </SafeAreaView>
    );
}

export default ExploreScreen