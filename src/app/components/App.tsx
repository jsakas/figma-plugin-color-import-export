import React from 'react';
import { ExportScreen } from 'app/screens/ExportScreen/ExportScreen';
import { useMuiMode } from 'app/hooks/useMuiMode';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

function App() {
  useMuiMode();

  return (
    <Tabs aria-label="Select screen" defaultValue={0}>
      <TabList size="sm">
        <Tab>Export</Tab>
        <Tab>Import</Tab>
      </TabList>
      <TabPanel value={0}>
        <ExportScreen />
      </TabPanel>
      <TabPanel value={1}>Import Screen</TabPanel>
    </Tabs>
  );
}

export default App;
