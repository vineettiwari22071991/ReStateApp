import { categories } from "@/constants/data"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { ScrollView, TouchableOpacity, View, Text } from "react-native"

const Filters = () => {
    const params = useLocalSearchParams<{ filter?: string }>()
    const [selectedCategory, setSelectedCategory] = useState(params.filter || "All")

    const handleCategory = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory('All')
            router.setParams({ filter: 'All' })
            return
        }

        setSelectedCategory(category)
        router.setParams({ filter: category })
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3 mb-2"
        >
            {
                categories.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            className={`px-4 py-2 rounded-full items-center mr-2 ${selectedCategory === item.category ? 'bg-primary-300' : 'bg-primary-100'
                                }`}
                            onPress={() => handleCategory(item.category)}
                        >
                            <Text className={`text-sm ${item.category === selectedCategory ? 'text-white font-rubik-bold mt-0.5' :
                                    'text-black-300 font-rubik'

                                }`}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                })

            }
        </ScrollView>
    )
}

export default Filters