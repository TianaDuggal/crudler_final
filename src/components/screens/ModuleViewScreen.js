import { StyleSheet, View, Image, Text } from 'react-native';
import Screen from '../layout/Screen';
import Icons from '../UI/Icons';
import { Button, ButtonTray } from '../UI/Button';

const ModuleViewScreen = ({ navigation, route }) => {
  //Initialisation.......................................
  const { module, onDelete, onModify } = route.params;

  const imageUri = module.ModuleImage || module.ModuleImageURL;

  //State..............................................

  //Handlers.............................................
  const gotoModify = () =>
    navigation.replace('ModuleModifyScreen', {
      module,
      onModify,
      onDelete,
    });

  const doDelete = () => onDelete(module);

  //View.................................................
  return (
    <Screen title="View module">
      {!!imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      )}

      <View style={styles.details}>
        <Text style={styles.title}>
          {module.ModuleCode} {module.ModuleName}
        </Text>
        <Text style={styles.text}>Level {module.ModuleLevel}</Text>
        <Text style={styles.text}>
          {module.ModuleLeaderName} (Module Leader)
        </Text>
      </View>

      <ButtonTray>
        <Button label="Modify" icon={<Icons.Edit />} onClick={gotoModify} />
        <Button label="Delete" icon={<Icons.Delete />} onClick={doDelete} />
      </ButtonTray>
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: 180, borderRadius: 8 },
  details: { marginTop: 12 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  text: { fontSize: 14, marginBottom: 4 },
});

export default ModuleViewScreen;
