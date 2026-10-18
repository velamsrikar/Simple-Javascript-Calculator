import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from '../utils/Colors';


const Button = ({
    title, 
    type,
    onPress
}: {
    title: string, 
    type: "top" | "right" | "number";
    onPress: Function
}) => {
    return(
    <TouchableOpacity style ={[styles.button, {
        backgroundColor: 
            type == 'top' ? Colors.btnDark: 
            type == 'right' ? Colors.btnRight: 
            Colors.btnLight,
        },
    ]} 
    onPress={onPress}>
        <Text style={{fontSize:40, 
            color: 
                type == "number" ? Colors.black:
                Colors.white,
        }}>{title}</Text>
    </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        height: 70,
        width: 70,
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.btnDark
    },
})