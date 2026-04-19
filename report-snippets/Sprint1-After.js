// AFTER

const [isEditingIncome, setIsEditingIncome] = React.useState(false);
const [incomeDraft, setIncomeDraft] = React.useState('');
const [incomeError, setIncomeError] = React.useState('');

React.useEffect(() => {
  if (activeCycle) {
    setIncomeDraft(String(activeCycle.incomeAmount));
  }
}, [activeCycle]);

const handleStartIncomeEdit = () => {
  if (!activeCycle) {
    return;
  }

  setIncomeError('');
  setIncomeDraft(String(activeCycle.incomeAmount));
  setIsEditingIncome(true);
};

const handleSaveIncome = async () => {
  const parsedIncome = Number(incomeDraft);

  if (!activeCycle || !incomeDraft || Number.isNaN(parsedIncome) || parsedIncome <= 0) {
    setIncomeError('Enter a valid income amount.');
    return;
  }

  await updateCycleIncome(activeCycle.id, parsedIncome);
  setIncomeError('');
  setIsEditingIncome(false);
};

const handleCancelIncomeEdit = () => {
  setIncomeError('');
  setIncomeDraft(String(activeCycle?.incomeAmount || ''));
  setIsEditingIncome(false);
};

<Pressable
  onPress={handleStartIncomeEdit}
  style={[styles.summaryTile, styles.incomeTile, styles.incomeEditableTile]}
>
  <MaterialCommunityIcons name="bank-outline" size={22} color={COLORS.navy} />
  <Text style={styles.tileLabel}>Income set</Text>
  {isEditingIncome ? (
    <>
      <TextInput
        value={incomeDraft}
        onChangeText={setIncomeDraft}
        keyboardType="decimal-pad"
        style={styles.incomeInput}
        placeholder="Enter income"
      />
      {incomeError ? (
        <Text style={styles.incomeError}>{incomeError}</Text>
      ) : null}
      <Text style={styles.editNote}>Edit income set</Text>
      <View style={styles.incomeActions}>
        <AppButton
          label="Save"
          onPress={handleSaveIncome}
          compact
        />
        <AppButton
          label="Cancel"
          onPress={handleCancelIncomeEdit}
          tone="secondary"
          compact
        />
      </View>
    </>
  ) : (
    <>
      <Text style={styles.tileValue}>
        {formatCurrency(cycleSummary.incomeAmount)}
      </Text>
      <Text style={styles.editNote}>Edit income set</Text>
    </>
  )}
</Pressable>
