import { useState } from 'react';
import { LogBox, StyleSheet, Text } from 'react-native';

import Screen from '../layout/Screen';
import Icons from '../UI/Icons';
import { Button, ButtonTray } from '../UI/Button';
import ModuleList from '../entity/modules/ModuleList';
import initialModules from '../../data/modules';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const ModuleListScreen = ({ navigation }) => {
  //Initialisation.......................................

  //State..............................................
  const [modules, setModules] = useState(initialModules);

  //Handlers.............................................
  const handleDelete = (module) =>
    setModules((current) =>
      current.filter((item) => item.ModuleID !== module.ModuleID)
    );

  const handleAdd = (module) => setModules((current) => [...current, module]);

  const handleModify = (updatedModule) =>
    setModules((current) =>
      current.map((m) =>
        m.ModuleID === updatedModule.ModuleID ? updatedModule : m
      )
    );

  const onDelete = (module) => {
    handleDelete(module);
    navigation.popToTop();
  };

  const onAdd = (module) => {
    handleAdd(module);
    navigation.goBack();
  };

  const onModify = (updatedModule) => {
    handleModify(updatedModule);
  };

  const gotoViewScreen = (module) =>
    navigation.navigate('ModuleViewScreen', { module, onDelete, onModify });

  const gotoAddScreen = () => navigation.navigate('ModuleAddScreen', { onAdd });

  //View.................................................
  return (
    <Screen>
      <Text style={styles.heading}>List modules</Text>

      <ButtonTray>
        <Button
          label="Add module"
          icon={<Icons.Add />}
          onClick={gotoAddScreen}
        />
      </ButtonTray>

      <ModuleList modules={modules} onSelect={gotoViewScreen} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
});

export default ModuleListScreen;
