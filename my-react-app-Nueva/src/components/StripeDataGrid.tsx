import React from 'react';
import { DataGrid, GridColDef, gridClasses, GridRowSelectionModel } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
  '& .custom-header': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '& .MuiDataGrid-columnHeaderTitleContainer': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}));

interface StripeDataGridProps {
  rows: any[]; // Adjust the type according to your data
  columns: GridColDef[];
  handleDeleteRow: (id: number) => void;
  handleSelectRow: (id: GridRowSelectionModel) => void;
}

const StripeDataGridComponent: React.FC<StripeDataGridProps> = ({
  rows,
  columns,
  handleDeleteRow,
  handleSelectRow,
}) => {
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

  return (
    <>
      <StripedDataGrid
        rows={rows}
        columns={columns.map((column) =>
          column.field === 'borrarBoton'
            ? {
              ...column,
              renderCell: (params) => (
                <IconButton onClick={() =>
                  handleDeleteRow(params.row.id as number) // Ensure the id is a number
                }>
                  <DeleteIcon />
                </IconButton>
              ),
            }
            : column
        )}
        checkboxSelection
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
          handleSelectRow(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />
    </>
  );
};

export default StripeDataGridComponent;
