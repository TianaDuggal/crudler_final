// src/components/screens/ModuleAddScreen.js

import { StyleSheet } from 'react-native';

import Screen from '../layout/Screen';
import ModuleForm from '../entity/modules/ModuleForm';

const ModuleAddScreen = ({ navigation, route }) => {
  // This is passed from ModuleListScreen when we navigate
  const { onAdd } = route.params;

  const handleCancel = () => navigation.goBack();

  const handleSubmit = (module) => {
    onAdd(module);       // update list in ModuleListScreen
  };

  return (
    <Screen title="Add module">
      <ModuleForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default ModuleAddScreen;
