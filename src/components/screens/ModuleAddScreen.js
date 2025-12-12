import { StyleSheet } from 'react-native';
import Screen from '../layout/Screen';
import ModuleForm from '../entity/modules/ModuleForm';

const ModuleAddScreen = ({ navigation, route }) => {
  //Initialisation.......................................
  const { onAdd } = route.params;

  //State..............................................

  //Handlers.............................................
  const handleCancel = () => navigation.goBack();

  const handleSubmit = (module) => {
    onAdd(module);
    
    navigation.goBack();
  };

  //View.................................................
  return (
    <Screen title="Add module">
      <ModuleForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Screen>
  );
};

const styles = StyleSheet.create({});
export default ModuleAddScreen;
