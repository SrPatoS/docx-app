import { StatusBarThemed, Text, View } from '@/components/Themed';
import MapView from 'react-native-maps';
import { styles } from "@/app/main/styles";
import WorkToggle from "@/app/main/components/work-toggle";

export default function Main() {
  return (
    <View style={styles.container}>
      <StatusBarThemed/>
      {/*<Text>aaaaaaaaaa</Text>*/}
        <WorkToggle/>
      <MapView style={styles.map}/>
    </View>
  )
}