import { StyleSheet, Text, View, TouchableOpacity} from "react-native"
import React, {useState} from 'react'
import { Colors } from '../utils/Colors'
import Button  from './Button'

const Calculator = () => {
  const [firstValue, setFirstValue] = useState('');
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState('');
  const [isDisplayValueCalculated, setIsDisplayValueCalculated] = useState(false); //Note for this, I manually searched up how to make booleans in javascript
  const [isDecimalPoint, setIsDecimalPoint] = useState(false); //I used a similar feature here, as this was not shown in the Calculator App Tutorial

  const handleNumberInput = (num: string) => {
    if(isDisplayValueCalculated){ //Only checks if the display value was calculated. If it is, then we reset it back to 0 when we click a new number.
        if(num === '.'){ //If the new input after verifying the display value was calculated is a '.', then we instead set the display value to '0.' and update the isDecimalPoint flag
          setDisplayValue("0.");
          setIsDecimalPoint(true);//Here to make sure there's only one decimal point in the display value
        }else{
          setDisplayValue(num); //Otherwise, we simply replace the display value with our new input
        }
        setIsDisplayValueCalculated(false); //Resetting the isDisplayValueCalculated flag.
        return;//Exits the program
    }
    if(num === '.'){ //If current display value ISN'T calculated and the input is a '.', it runs through this sequence to prevent more than one decimal point from beign used.
      if(isDecimalPoint){
        return; //If there's already a decimal point, exit entire if statement
      }

      if(displayValue == '0'){
        setDisplayValue('0.'); //If the display value was initially 0, then set display value to '0.'
      }else{
        setDisplayValue(displayValue + '.'); //Otherwise, just append to the end of the current display value
      }
      setIsDecimalPoint(true); //Make sure to signal this flag so as to prevent a second decimal value from appearing
      return; 
    }
    if(displayValue == '0'){ //Normal case, if it's just 0, change the display value to instead be the input
        setDisplayValue(num);
    } 
    else{
        setDisplayValue(displayValue + num); //Else, append the input to the current display value
    }
  }

  const handleOperatorInput = (operator: string) => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue('0');
    setIsDecimalPoint(false); //Reset decimal point flag
  }

  const handleCalculation = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);

    if(operator === '+'){
        setDisplayValue(((num1+num2).toFixed(3)).toString());
    }
    else if(operator === '-'){
        setDisplayValue(((num1-num2).toFixed(3)).toString());
    }
    else if(operator === '*'){
        setDisplayValue(((num1*num2).toFixed(3)).toString());
    }
    else if(operator === '/'){
        setDisplayValue(((num1/num2).toFixed(3)).toString());
    }
    else if(operator === '%'){
        setDisplayValue(((num1%num2).toFixed(3)).toString());
    }
    setIsDisplayValueCalculated(true);
    setOperator('');
    setFirstValue('');
  }

  const handleClear = () =>{
    setDisplayValue('0');
    setOperator(''); //Resetting both the first and operator value, so that the calculator goes back to its original state.
    setFirstValue('');
  }

  const handleDelete = () =>{
    if(displayValue.length == 1){
        setDisplayValue('0');
    }
    else{
        setDisplayValue(displayValue.slice(0, -1))
    }
  }
  return (
    <View style ={styles.container}>
      <View style = {styles.display}>
        <Text style ={{fontSize: 30, fontWeight: '300'}}>{firstValue + operator}</Text>
        <Text style ={{fontSize: 70, fontWeight: '300'}}>{displayValue}</Text>
      </View>
      <View style = {styles.keypad}>
        <Button title='C' type = 'top' onPress = {handleClear}/>
        <Button title='⌫' type = 'top' onPress = {handleDelete} />
        <Button title='%' type = 'top' onPress={() => handleOperatorInput('%')}/>
        <Button title='÷' type = 'right' onPress={() => handleOperatorInput('/')}/>
        <Button title='7' type = 'number' onPress={() => handleNumberInput('7')}/>
        <Button title='8' type = 'number' onPress={() => handleNumberInput('8')}/>
        <Button title='9' type = 'number' onPress={() => handleNumberInput('9')}/>
        <Button title='X' type = 'right' onPress={() => handleOperatorInput('*')}/>
        <Button title='6' type = 'number' onPress={() => handleNumberInput('6')}/>
        <Button title='5' type = 'number' onPress={() => handleNumberInput('5')}/>
        <Button title='4' type = 'number' onPress={() => handleNumberInput('4')}/>
        <Button title='-' type = 'right' onPress={() => handleOperatorInput('-')}/>
        <Button title='1' type = 'number' onPress={() => handleNumberInput('1')}/>
        <Button title='2' type = 'number' onPress={() => handleNumberInput('2')}/>
        <Button title='3' type = 'number' onPress={() => handleNumberInput('3')}/>
        <Button title='+' type = 'right' onPress={() => handleOperatorInput('+')}/>
        <Button title='0' type = 'number' onPress={() => handleNumberInput('0')}/>
        <Button title='00' type = 'number' onPress={() => handleNumberInput('00')}/>
        <Button title='.' type = 'number' onPress={() => handleNumberInput('.')}/>
        <Button title='=' type = 'right' onPress={handleCalculation}/>
      </View>
    </View>
  );
}

export default Calculator

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    display: {
        flex: 1,
        backgroundColor: Colors.gray,
        paddingVertical:20,
        paddingHorizontal:20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    keypad: {
        flex: 3,
        backgroundColor: Colors.light,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 30,
        paddingVertical: 30

    }
})