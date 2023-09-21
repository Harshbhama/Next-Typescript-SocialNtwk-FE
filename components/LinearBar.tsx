import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import variables from "../styles/login.module.scss"
export default function LinearIndeterminate() {
  return (
    <div className={variables.linearGradient}>
        <Box sx={{ width: '100%' }}>
        <LinearProgress />
        </Box>
    </div>
  );
}