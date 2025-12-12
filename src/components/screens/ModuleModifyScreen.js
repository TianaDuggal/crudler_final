import { StyleSheet } from 'react-native';
import Screen from '../layout/Screen';
import ModuleForm from '../entity/modules/ModuleForm';

const ModuleModifyScreen = ({ navigation, route }) => {
  //Initialisation.......................................
  const { module, onModify, onDelete } = route.params;

  //State..............................................

  //Handlers.............................................
  const handleCancel = () => navigation.goBack();

  const handleSubmit = (updatedModule) => {
    onModify(updatedModule);

    navigation.replace('ModuleViewScreen', {
      module: updatedModule,
      onDelete,
      onModify,
      fromModify: true,
    });
  };

  //View.................................................
  return (
    <Screen title="Modify module">
      <ModuleForm
        originalModule={module}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({});
export default ModuleModifyScreen;
