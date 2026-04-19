// Main reusable text and select inputs used by the cycle and expense forms.

//Initialisation.......................................
// Imports
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Text input field
export const TextField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
}) => {
  //View.................................................
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[styles.input, multiline && styles.multilineInput]}
      />
    </View>
  );
};

// Select input field
export const SelectField = ({
  label,
  value,
  onValueChange,
  options,
  prompt = 'Select an option',
}) => {
  //View.................................................
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selectWrapper}>
        <Picker selectedValue={value} onValueChange={onValueChange}>
          <Picker.Item label={prompt} value="" />
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

// Input styles
const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },
  input: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0f172a',
  },
  multilineInput: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
  selectWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
});
