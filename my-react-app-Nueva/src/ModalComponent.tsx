import React from 'react';
import { Grid, TextField, Box, Modal, Typography } from '@mui/material';
import StripeDataGridComponent from './StripeDataGrid';
import { DatosCatalogo } from './datos';
import { GridColDef } from '@mui/x-data-grid';
import CustomButton from './CustomButton';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalComponentProps {
  open: boolean;
  handleClose: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  handleClear: () => void;
  handleAddRow: () => void;
  filteredDatos: DatosCatalogo[];
  catalogoColumns: GridColDef[];
  handleSelectRow: (id: any) => void;
  handleDeleteRow: (id: number) => void;
  title: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  handleClose,
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleClear,
  handleAddRow,
  filteredDatos,
  catalogoColumns,
  handleSelectRow,
  handleDeleteRow,
  title = "PACC INCART"
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>
          {title}
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={4}>
            <TextField
              variant="standard"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder=""
              InputProps={{ disableUnderline: true }} 
            />
          </Grid>
        </Grid>
        <Box mt={2} sx={{ height: '60%' }}>
          <StripeDataGridComponent
            rows={filteredDatos}
            columns={catalogoColumns}
            handleSelectRow={handleSelectRow}
            handleDeleteRow={handleDeleteRow}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <CustomButton onClick={handleAddRow} label="Añadir" />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
