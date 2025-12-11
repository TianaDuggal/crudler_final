// src/components/screens/ModuleModifyScreen.js

import { StyleSheet } from 'react-native';

import Screen from '../layout/Screen';
import ModuleForm from '../entity/modules/ModuleForm';

const ModuleModifyScreen = ({ navigation, route }) => {
  // Provided when navigating from ModuleViewScreen
  const { module, onModify } = route.params;

  const handleCancel = () => navigation.goBack();

  const handleSubmit = (updatedModule) => {
    onModify(updatedModule);   // update list state in ModuleListScreen
  };

  return (
    <Screen title="Modify module">
      {/* Use the prop name your ModuleForm expects for initial data.
         In your earlier version it was `initialValues`, so we keep that. */}
      <ModuleForm
        initialValues={module}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default ModuleModifyScreen;
