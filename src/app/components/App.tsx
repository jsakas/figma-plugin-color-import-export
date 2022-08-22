import React from 'react';
import { ExportScreen } from 'app/screens/ExportScreen';
import { useMuiMode } from 'app/hooks/useMuiMode';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { ImportScreen } from 'app/screens/ImportScreen';
import Box from '@mui/joy/Box';

function App() {
  useMuiMode();

  return (
    <Tabs
      aria-label="Select screen"
      defaultValue={0}
      sx={{
        background: 'none',
      }}
    >
      <Box marginBottom={1}>
        <TabList size="sm" defaultValue={1}>
          <Tab>Export</Tab>
          <Tab>Import</Tab>
        </TabList>
      </Box>
      <TabPanel value={0}>
        <ExportScreen />
      </TabPanel>
      <TabPanel value={1}>
        <ImportScreen />
      </TabPanel>
    </Tabs>
  );
}

export default App;
