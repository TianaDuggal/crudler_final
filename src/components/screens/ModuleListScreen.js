// src/components/screens/ModuleListScreen.js

import { useState } from 'react';
import { LogBox, StyleSheet } from 'react-native';

import Screen from '../layout/Screen';
import Icons from '../UI/Icons';
import { Button, ButtonTray } from '../UI/Button';
import ModuleList from '../entity/modules/ModuleList';
import initialModules from '../../data/modules';

// ignore noisy warnings like in UserListScreen
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const ModuleListScreen = ({ navigation }) => {
  // ---------- State ----------
  const [modules, setModules] = useState(initialModules);

  // ---------- Pure handlers on state ----------
  const handleDelete = (module) =>
    setModules((current) =>
      current.filter((item) => item.ModuleID !== module.ModuleID)
    );

  const handleAdd = (module) =>
    setModules((current) => [...current, module]);

  const handleModify = (updatedModule) =>
    setModules((current) =>
      current.map((module) =>
        module.ModuleID === updatedModule.ModuleID ? updatedModule : module
      )
    );

  // ---------- Callbacks passed via navigation ----------
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

  // ---------- Navigation helpers ----------
  const gotoViewScreen = (module) =>
    navigation.navigate('ModuleViewScreen', {
      module,
      onDelete,
      onModify,
    });

  const gotoAddScreen = () =>
    navigation.navigate('ModuleAddScreen', { onAdd });

  // ---------- View ----------
  return (
    <Screen title="List modules">
      <ButtonTray>
        <Button
          label="Add module"
          icon={<Icons.Add />}
          onClick={gotoAddScreen}
        />
      </ButtonTray>

      {/* IMPORTANT: pass onSelect, because ModuleItem expects onSelect */}
      <ModuleList modules={modules} onSelect={gotoViewScreen} />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default ModuleListScreen;
