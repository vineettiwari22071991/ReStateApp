import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function Applayout (){
    const {loading, isLogged} = useGlobalContext()

    if(loading){
        return(
            <SafeAreaView className="bg-white h-full justify-center items-center">
                <ActivityIndicator className="text-primary-300" size="large"/>
            </SafeAreaView>
        )
    }

    if(!isLogged) return <Redirect href='/sign-in'/>

    return <Slot/>
}