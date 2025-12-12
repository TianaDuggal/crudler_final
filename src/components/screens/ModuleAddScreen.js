//Initialisation.........................................................
import { StyleSheet } from 'react-native';

import Screen from '../layout/Screen';
import ModuleForm from '../entity/modules/ModuleForm';

const ModuleAddScreen = ({ navigation, route }) => {
  //State.........................................................
  const { onAdd } = route.params;

  //Handlers.........................................................
  const handleCancel = () => navigation.goBack();

  const handleSubmit = (module) => {
    onAdd(module);
  };

  //View.........................................................
  return (
    <Screen title="Add module">
      <ModuleForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default ModuleAddScreen;
