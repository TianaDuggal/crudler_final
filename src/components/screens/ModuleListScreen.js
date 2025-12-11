import { useState } from 'react';
import { LogBox, StyleSheet } from 'react-native';

import Screen from '../layout/Screen';
import Icons from '../UI/Icons.js';
import { Button, ButtonTray } from '../UI/Button.js';
import ModuleList from '../entity/modules/ModuleList.js';
import intialModules from '../../data/modules.js'; // keep this name if your data file exports it like that

// Ignore the warning once at the top level
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const ModuleListScreen = ({ navigation }) => {
  // State...............................................
  const [modules, setModules] = useState(intialModules);

  // Handlers............................................
  const handleDelete = (module) =>
    setModules(modules.filter((item) => item.ModuleID !== module.ModuleID));

  const handleAdd = (module) => setModules([...modules, module]);

  const handleModify = (updateModule) => setModules(
    modules.map((module) => (module.ModuleID === updateModule.ModuleID) ? updateModule : module)
  );

  const onDelete = (module) => {
    handleDelete(module);
    navigation.goBack();
  };

  const onAdd = (module) => {
    handleAdd(module);
    navigation.goBack();
  };

  const onModify = (module) => {
    handleModify(module);
    navigation.goBack();
  };

  const gotoViewScreen = (module) =>
    navigation.navigate('ModuleViewScreen', { module, onDelete, onModify });

  const gotoAddScreen = () =>
    navigation.navigate('ModuleAddScreen', { onAdd });

  // View.................................................
  return (
    <Screen>
      <ButtonTray>
        <Button label="Add" icon={<Icons.Add />} onClick={gotoAddScreen} />
      </ButtonTray>
      <ModuleList modules={modules} onSelect={gotoViewScreen} />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default ModuleListScreen;
