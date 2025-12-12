import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Icons from '../../UI/Icons.js';
import Form from '../../UI/Form.js';

const ModuleForm = ({ originalModule, onSubmit, onCancel }) => {
  //Initialisation.......................................
  const levels = useMemo(
    () => [
      { value: 3, label: '3 (Foundation)' },
      { value: 4, label: '4 (First Year)' },
      { value: 5, label: '5 (Second Year)' },
      { value: 6, label: '6 (Final Year)' },
      { value: 7, label: '7 (Masters)' },
    ],
    []
  );

  const freshModule = useMemo(() => {
    const id = Math.floor(10000 + Math.random() * 900000);

    return {
      ModuleID: id,
      ModuleCode: '',
      ModuleName: '',
      ModuleLevel: 4,
      ModuleLeaderID: null,
      ModuleLeaderName: '',
      // IMPORTANT: support BOTH keys (your data often uses ModuleImage)
      ModuleImage:
        'https://images.freeimages.com/images/small-previews/4e8/sala-de-parto-03-1432033.jpg',
      ModuleImageURL:
        'https://images.freeimages.com/images/small-previews/4e8/sala-de-parto-03-1432033.jpg',
    };
  }, []);

  //State..............................................
  const [module, setModule] = useState(() => {
    if (!originalModule) return freshModule;

    // normalise image key so View screen can always show something
    return {
      ...freshModule,
      ...originalModule,
      ModuleImage:
        originalModule.ModuleImage ||
        originalModule.ModuleImageURL ||
        freshModule.ModuleImage,
      ModuleImageURL:
        originalModule.ModuleImageURL ||
        originalModule.ModuleImage ||
        freshModule.ModuleImageURL,
    };
  });

  //Handlers.............................................
  const handleChange = (field, value) =>
    setModule((current) => ({ ...current, [field]: value }));

  const handleSubmit = () => {
    const cleaned = {
      ...module,
      // keep both fields in sync
      ModuleImage: module.ModuleImageURL || module.ModuleImage,
      ModuleImageURL: module.ModuleImageURL || module.ModuleImage,
      ModuleCode: (module.ModuleCode || '').trim(),
      ModuleName: (module.ModuleName || '').trim(),
      ModuleLeaderName: (module.ModuleLeaderName || '').trim(),
    };

    onSubmit(cleaned);
  };

  //View.................................................
  const submitLabel = originalModule ? 'Modify' : 'Add';
  const submitIcon = originalModule ? <Icons.Edit /> : <Icons.Add />;

  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
      submitIcon={submitIcon}
    >
      <Form.InputText
        label="Module code"
        value={module.ModuleCode}
        onChange={(value) => handleChange('ModuleCode', value)}
      />

      <Form.InputText
        label="Module name"
        value={module.ModuleName}
        onChange={(value) => handleChange('ModuleName', value)}
      />

      <Form.InputSelect
        label="Module level"
        prompt="Select module level..."
        options={levels}
        value={module.ModuleLevel}
        onChange={(value) => handleChange('ModuleLevel', value)}
      />

      <Form.InputText
        label="Module leader"
        value={module.ModuleLeaderName}
        onChange={(value) => handleChange('ModuleLeaderName', value)}
      />

      <Form.InputText
        label="Module image URL"
        value={module.ModuleImageURL}
        onChange={(value) => handleChange('ModuleImageURL', value)}
      />
    </Form>
  );
};

const styles = StyleSheet.create({});

export default ModuleForm;
