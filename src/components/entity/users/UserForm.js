import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Icons from '../../UI/Icons.js';
import Form from '../../UI/Form.js';

const defaultUser = {
  UserID: null,
  UserFirstname: null,
  UserLastname: null,
  UserEmail: null,
  UserImageURL: null,
  UserType: null,
  UserYear: null,
};

const UserForm = ({ originalUser, onSubmit, onCancel }) => {
  // Initialisation.......................................
  defaultUser.UserID = Math.floor(10000 + Math.random() * 900000);
  defaultUser.UserImageURL =
    'https://images.freeimages.com/images/small-previews/4e8/sala-de-parto-03-1432033.jpg';

  const userTypes = [
    { value: 'Staff', label: 'Staff' },
    { value: 'Student', label: 'Student' },
  ];

  // State................................................
  const [user, setUser] = useState(originalUser || defaultUser);

  // Handlers.............................................
  const handleChange = (field, value) => setUser({ ...user, [field]: value });
  const handleSubmit = () => onSubmit(user);

  // View.................................................
  const submitLabel = originalUser ? 'Modify' : 'Add';
  const submitIcon = originalUser ? <Icons.Edit /> : <Icons.Add />;

  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
      submitIcon={submitIcon}
    >
      <Form.InputText
        label="First name"
        value={user.UserFirstname}
        onChange={(value) => handleChange('UserFirstname', value)}
      />

      <Form.InputText
        label="Last name"
        value={user.UserLastname}
        onChange={(value) => handleChange('UserLastname', value)}
      />

      <Form.InputText
        label="Email"
        value={user.UserEmail}
        onChange={(value) => handleChange('UserEmail', value)}
      />

      <Form.InputSelect
        label="User type"
        prompt="Select user type..."
        options={userTypes}
        value={user.UserType}
        onChange={(value) => handleChange('UserType', value)}
      />

      <Form.InputText
        label="User year"
        value={user.UserYear}
        onChange={(value) => handleChange('UserYear', value)}
      />

      <Form.InputText
        label="User Image URL"
        value={user.UserImageURL}
        onChange={(value) => handleChange('UserImageURL', value)}
      />
    </Form>
  );
};

const styles = StyleSheet.create({});

export default UserForm;
