import { router, useLocalSearchParams, usePathname } from 'expo-router';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import icons from '@/constants/icons';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

const Search = () => {
    const path = usePathname()
    const params = useLocalSearchParams<{ query?: string }>()

    const [search, setSearch] = useState(params.query)

    const debounceSearch = useDebouncedCallback((text: string)=> router.setParams({query: text}), 500) 

    const handleSearch = (text: string) => {
        setSearch(text)
        debounceSearch(text)
    }
    return (
        <View className='flex flex-row item-center justify-between w-full px-4
    rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2'>

            <View className='flex-1 flex-row flex items-center justify-start z-50'>
                <Image
                    source={icons.search}
                    className='size-5'
                />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder='Search for anything'
                    className='ml-2 text-sm font-rubik-regular text-black w-full'

                />
            </View>
            <TouchableOpacity className='self-center'>
                <Image
                    source={icons.filter}
                    className='size-5'
                />
            </TouchableOpacity>
        </View>
    );
};

export default Search;