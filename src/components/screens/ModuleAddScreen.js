import { StyleSheet, Text } from 'react-native';
import Screen from '../layout/Screen';
import Icons from '../UI/Icons.js';
import {Button, ButtonTray} from '../UI/Button.js';

 const defaultModule = {
    ModuleID: Math.floor(10000 + Math.random() * 900000),
    ModuleCode: "CIS6000",
    ModuleName: "Mobile App Development",
    ModuleLevel: 6,
    ModuleLeaderID: 1,
    ModuleImageURL: "https://images.freeimages.com/images/small-previews/4e8/sala-de-parto-03-1432033.jpg",
    ModuleLeaderName: "Graeme JONES",
  };

 const ModuleAddScreen = ({navigation, route}) => {
  //Initialisation.......................................
  const {onAdd} = route.params;
  //State................................................

  //Handlers.............................................
    const handleAdd = () => onAdd(defaultModule);
    const handleCancel = () => navigation.goBack();

  //View.................................................
  return (
    <Screen>
      <Text>Add</Text>
      <ButtonTray>
        <Button label="Add" icon={<Icons.Add/>} onClick={handleAdd}/>
        <Button label="Cancel" onClick={handleCancel}/>
      </ButtonTray>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default ModuleAddScreen;