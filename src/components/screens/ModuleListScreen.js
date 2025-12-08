import React from 'react';
import {ScrollView, StyleSheet } from 'react-native';
import Screen from '../layout/Screen';
import modules from '../../data/modules';
import ModuleItem from '../entity/modules/ModuleItem';

import intialModules from '../../data/modules.js';

const ModuleListScreen = () => {
  //Initialisation.......................................
  const modules = intialModules;

  //State..............................................
  //Handlers.............................................       
    const handleSelect = () => alert('Item selected');

    //View.................................................
  return (
    <Screen>
      <ScrollView style={styles.container}>
        {modules.map((module) => {
          return <ModuleItem  key={module.ModuleCode} module={module} onSelect={handleSelect}/>;
    })}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ModuleListScreen;
