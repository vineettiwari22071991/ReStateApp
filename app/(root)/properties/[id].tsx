import { useLocalSearchParams } from "expo-router"
import { View , Text} from "react-native"

const PropertyScreen = () => {
    const {id} = useLocalSearchParams()
    return(
        <View>
            <Text>Property Screen {id}</Text>
        </View>
    )
}

export default PropertyScreen