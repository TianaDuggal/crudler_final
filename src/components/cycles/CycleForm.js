// Main form for creating a new budgeting window around the student's real income pattern.

//Initialisation.......................................
// Imports
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DEFAULT_CYCLE_TYPES } from '../../constants/categories';
import AppButton from '../UI/AppButton';
import { SelectField, TextField } from '../UI/FormField';

const CycleForm = ({ onSubmit }) => {
  //State..............................................
  // Local form state
  const [cycle, setCycle] = useState({
    name: '',
    cycleType: 'monthly',
    incomeAmount: '',
    startDate: '',
    endDate: '',
    notes: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  //Handlers.............................................
  // Input handlers
  const handleChange = (field, value) => {
    setCycle((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    // A cycle must have dates and income before SmartSpend can calculate anything useful.
    if (
      !cycle.name.trim() ||
      !cycle.startDate.trim() ||
      !cycle.endDate.trim() ||
      Number(cycle.incomeAmount) <= 0
    ) {
      setErrorMessage('Please complete the cycle details and add a valid income amount.');
      return;
    }

    setErrorMessage('');
    onSubmit({
      ...cycle,
      name: cycle.name.trim(),
      incomeAmount: Number(cycle.incomeAmount),
      notes: cycle.notes.trim(),
    });

    setCycle({
      name: '',
      cycleType: 'monthly',
      incomeAmount: '',
      startDate: '',
      endDate: '',
      notes: '',
    });
  };

  //View.................................................
  // Form view
  return (
    <View style={styles.form}>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TextField
        label="Cycle name"
        value={cycle.name}
        onChangeText={(value) => handleChange('name', value)}
        placeholder="Example: Maintenance Loan Spring"
      />

      <SelectField
        label="Cycle type"
        value={cycle.cycleType}
        onValueChange={(value) => handleChange('cycleType', value)}
        options={DEFAULT_CYCLE_TYPES}
      />

      <TextField
        label="Income amount"
        value={cycle.incomeAmount}
        onChangeText={(value) => handleChange('incomeAmount', value)}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />

      <TextField
        label="Start date"
        value={cycle.startDate}
        onChangeText={(value) => handleChange('startDate', value)}
        placeholder="YYYY-MM-DD"
      />

      <TextField
        label="End date"
        value={cycle.endDate}
        onChangeText={(value) => handleChange('endDate', value)}
        placeholder="YYYY-MM-DD"
      />

      <TextField
        label="Notes"
        value={cycle.notes}
        onChangeText={(value) => handleChange('notes', value)}
        placeholder="Optional context for this cycle"
        multiline
      />

      <AppButton label="Create Cycle" onPress={handleSubmit} />
    </View>
  );
};

// Form styles
const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  error: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CycleForm;
