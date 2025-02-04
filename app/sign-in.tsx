import icons from '@/constants/icons';
import images from '@/constants/images';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect, router } from 'expo-router';
import {View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
const { height } = Dimensions.get('window'); 
const SignIn = () => {

  const {refetch, loading, isLogged} = useGlobalContext()

  if (!loading && isLogged) return <Redirect href="/(root)/(tabs)" />;
  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
   
  }

return(
    <SafeAreaView className='bg-white flex-1'>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
      <View className='flex-1 flex'>
      <Image
      source={images.onboarding}
      style={{ width: '100%', height: height * 0.60 }} 
      resizeMode='contain'
      />
      <View className='px-10'>
        <Text className='text-base text-center uppercase'>Welcome to ReState</Text>
        <Text className=' text-3xl font-rubik-bold text-black-300 text-center mt-2'>
          Let's Get You Closer to {"\n"}
          <Text className='text-primary-300'>Your Ideal Home</Text>
        </Text>
        <Text className='text-lg font-rubik text-black-200 text-center mt-12'> Login to ReState with Google</Text>

        <TouchableOpacity className='bg-white rounded-full shadow-zinc-300 w-full shadow-md py-4 mt-5'
        onPress={handleLogin}
        >
          <View className='flex flex-row items-center justify-center pt-3'>
            <Image 
            source={icons.google}
            className='w-5 h-5'
            resizeMode='contain'
            />
            <Text className='text-lg font-rubik-medium text-black-300 ml-2'>Continue with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
)
}

export default SignIn;