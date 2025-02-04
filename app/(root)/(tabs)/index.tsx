import { Card, FeaturedCard } from "@/components/Cards";
import Search from "@/components/Search";
import Filters from "@/components/filters";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Text, View, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <SafeAreaView className="bg-white px-2 flex-1">

      <FlatList
        data={[1, 2,]}
        renderItem={({ item }) => (
          <Card/>
        )}
        keyExtractor={(item)=>item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
            <View className="px-2">
            <View className="flex flex-row items-center justify-between mx-2 mt-5">
              <View className="flex-row flex items-start mx-2">
                <Image
                  source={images.avatar}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
                <View className="flex flex-col ml-2">
                  <Text className="text-sm font-rubik-light">Good Morning</Text>
                  <Text className="text-sm font-rubik-bold">Jhon Doe</Text>
                </View>
              </View>
              <Image
                source={icons.bell}
                className="w-6 h-6 items-end"
                resizeMode="contain"
              />
            </View>
            <Search />
    
            <View className="my-5 ">
              <View className="flex flex-row items-center justify-between mx-2 mt-2">
    
                <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>
              <FlatList 
              data={[1,2,3]}
              horizontal
              keyExtractor={(item)=>item.toString()}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              contentContainerClassName="flex mt-5 gap-5"
              renderItem={(item)=>(
                <FeaturedCard/>
              )}
              
              />
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
