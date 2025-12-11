import { Pressable, StyleSheet, Text, View } from 'react-native';

const UserItem = ({ user, onSelect }) => {
  const handleSelect = () => onSelect(user);

  return (
    <Pressable onPress={handleSelect}>
      <View style={styles.item}>
        <Text style={styles.text}>
          {user.UserFirstname} {user.UserLastname} ({user.UserType})
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    borderBotttomWidth: 1,
    borderColor: 'lightgray',
  },
  text: {
    fontSize: 16,
  },
});

export default UserItem;
