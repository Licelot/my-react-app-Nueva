import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  MenuItem,
  Tooltip,
  Box
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import StripeDataGridComponent from './StripeDataGrid';
import { DatosCatalogo, DatosPacc, datosCatalogo, Datos, preDatos, preNewDatos, datosPacc } from './datos';
import { columnsPacc, columnsCatalogo, columnsObras, newColumns } from '../columns'; // Importa las columnas definidas
import CustomTextField from './CustomTextField';
import ModalComponent from './ModalComponent';
import Input from '@mui/material/Input';
import * as yup from 'yup';
import { Formik, Form, Field, useFormikContext, ErrorMessage } from 'formik';

const validationSchema = yup.object().shape({
  tipoRequerimiento: yup.string().test('is-required', 'Tipo de requerimiento es obligatorio', function (value) {
    const { TérminosyCondiciones } = this.parent;
    if (TérminosyCondiciones === 'condición' && !value) {
      return false;
    }
    return true;
  }),
  Observaciones: yup.string(),
  NoDeControl: yup.string().required('No. De Control es obligatorio'),
});



const ContractForm: React.FC = () => {
  const [rows, setRows] = useState<Datos[]>([]);
  const [terms, setTerms] = useState('');
  const [observations, setObservations] = useState('');
  const [tipoRequerimiento, setTipoRequerimiento] = useState('');
  const [titlo, setTitlo] = useState('REQUERIMIENTO DE CONTRATACIÓN');
  const [hide, setHide] = useState('none');
  const [datos, setDatos] = useState<Datos[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [open, setOpen] = useState(false);
  const [openPacc, setOpenPacc] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDatos, setFilteredDatos] = useState<DatosCatalogo[]>(datosCatalogo);
  const [filteredDatosPacc, setFilteredDatosPacc] = useState<DatosCatalogo[]>(datosPacc);
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

  const handleSelectRow = (id: any) => {
    console.log(id);
    setRowSelectionModel(id);
  }

  const handleAddRow = () => {
    console.log('Añadir');
    const selectedItems = rowSelectionModel.map(id =>
      filteredDatos.find(item => item.id === id)
    ).filter(item => item !== undefined) as DatosCatalogo[];

    const newRows = selectedItems.map(item => ({
      id: Date.now() + Math.random(), // Para evitar duplicados
      codigoSistema: item.codigoSistema,
      cuentaObjetal: '',
      descripcion: item.descripcion,
      cantidad: 1
    }));

    setDatos([...datos, ...newRows]);
    setOpen(false);
  };

  const handleAddRowPacc = () => {
    console.log('Añadir desde PACC');
    const selectedItems = rowSelectionModel.map(id =>
      filteredDatosPacc.find(item => item.id === id)
    ).filter(item => item !== undefined) as DatosPacc[];

    const newRows = selectedItems.map(item => ({
      id: Date.now() + Math.random(),
      codigoSistema: item.codigoSistema,
      cuentaObjetal: '',
      descripcion: item.descripcion,
      cantidad: 1
    }));

    setDatos([...datos, ...newRows]);
    setOpenPacc(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenPacc = () => setOpenPacc(true);
  const handleClosePacc = () => {
    setSearchTerm('');
    setOpenPacc(false);
  };

  const handleDeleteRow = (id: number) => {
    setDatos(datos.filter(row => row.id !== id));
  };

  useEffect(() => {
    console.log('Ejecutando useEffect al inicio');
    setDatos(preDatos);
    setColumns(columnsObras);
  }, []);

  const handleAgregarFila = () => {
    const temp = [...datos, { id: Date.now(), codigoSistema: '', cuentaObjetal: '', descripcion: '', cantidad: 1 }];
    setDatos(temp);
  };

  const addRow = () => {
    setRows([...rows, { id: Date.now(), codigoSistema: '', cuentaObjetal: '', descripcion: '', cantidad: 1 }]);
  };

  const handleTipoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTipoRequerimiento(e.target.value);

    if (e.target.value === 'OBRAS') {
      setTitlo('REQUERIMIENTO DE CONTRATACIÓN DE OBRAS');
      setHide('');
      setDatos(preDatos);
      setColumns(columnsObras);
    } else if (e.target.value === 'BIENES') {
      setTitlo('REQUERIMIENTO DE CONTRATACIÓN DE BIENES');
      setHide('none');
      setDatos(preNewDatos);
      setColumns(newColumns);
    } else {
      setTitlo('REQUERIMIENTO DE CONTRATACIÓN DE SERVICIO');
      setHide('');
      setDatos(preDatos);
      setColumns(columnsObras);
    }
  };

  const handleSearch = () => {
    const filtered = datosCatalogo.filter(item =>
      item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDatos(filtered);
  };

  const handleSearchPacc = () => {
    const filtered = datosPacc.filter(item =>
      item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDatosPacc(filtered);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredDatos(datosCatalogo);
    setFilteredDatosPacc(datosPacc);
  };

  const catalogoColumns = [
    ...columnsCatalogo,
  ];

  const CustomValidationButton = () => {
    const { validateForm, setFieldTouched } = useFormikContext()

    const handleValidation = async () => {
      setFieldTouched('NoDeControl', true);
      const errors = await validateForm();
      if (Object.keys(errors).length > 0) {
        console.log('Errors:', errors);
      } else {
        console.log('No validation errors.');
      }
    };
    return (
      <Button variant="contained" color="primary" onClick={handleValidation}>
        Validar Formulario
      </Button>
    );
  };

  return (
    <Formik
      initialValues={{
        tipoRequerimiento: '',
        TérminosyCondiciones: '',
        Observaciones: '',
        NoDeControl: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form values:', values);

      }}
    >
      {({ errors, touched }) => (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
          <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>
            {titlo}
          </Typography>

          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={1} style={{ padding: '20px', marginBottom: '20px' }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        label="Área Solicitante"
                        variant="outlined"
                        fullWidth
                        value=''
                        onChange={(e) => { }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name="NoDeControl">
                        {({ field, meta }: { field: any; meta: { touched: boolean; error?: string } }) => (
                          <TextField
                            {...field}
                            label="No. De Control"
                            variant="outlined"
                            fullWidth
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Fecha"
                        variant="outlined"
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                      />

                    </Grid>
                    <Grid item xs={12} sm={6}>

                      <TextField
                        name='tipoRequerimiento'
                        label="Tipos de Requerimientos " 
                        variant="outlined"
                        select
                        fullWidth
                        value={tipoRequerimiento}
                        onChange={handleTipoOnChange}
                        error={touched.tipoRequerimiento && !!errors.tipoRequerimiento}
                        helperText={touched.tipoRequerimiento && errors.tipoRequerimiento}

                      >
                        <MenuItem value="OBRAS">OBRAS</MenuItem>
                        <MenuItem value="BIENES">BIENES</MenuItem>
                        <MenuItem value="SERVICIO">SERVICIO</MenuItem>
                      </TextField>

                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Grid>
              <Box className="custom-box">
                <div className="custom-header">
                  <StripeDataGridComponent
                    rows={datos}
                    columns={columns}
                    handleDeleteRow={handleDeleteRow}
                    handleSelectRow={handleSelectRow}
                  />
                </div>
              </Box>
              <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleOpen}>
                    Agregar Fila
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleOpenPacc}>
                    Agregar Fila desde PACC
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <ModalComponent
              open={open}
              handleClose={handleClose}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
              handleClear={handleClear}
              handleAddRow={handleAddRow}
              filteredDatos={filteredDatos}
              catalogoColumns={catalogoColumns}
              handleSelectRow={handleSelectRow}
              handleDeleteRow={handleDeleteRow}
              title="CATALOGO DE BIENES Y SERVICIOS"
            />

            <ModalComponent
              open={openPacc}
              handleClose={handleClosePacc}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearchPacc}
              handleClear={handleClear}
              handleAddRow={handleAddRowPacc}
              filteredDatos={filteredDatosPacc}
              catalogoColumns={columnsPacc}
              handleSelectRow={handleSelectRow}
              handleDeleteRow={handleDeleteRow}
              title="PACC INCART"
            />

            <Grid item xs={12}>
              <Paper elevation={1} style={{ padding: '20px', marginBottom: '20px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} style={{ display: hide }}>
                    <TextField
                      label="Términos y Condiciones"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                      error={touched.TérminosyCondiciones && !!errors.TérminosyCondiciones}
                      helperText={touched.TérminosyCondiciones && errors.TérminosyCondiciones}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Observaciones"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={2}
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                    />
                  </Grid>

                  <Input type='file' />

                  <CustomValidationButton />
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={1} style={{ padding: '20px', marginBottom: '20px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Solicitado por (Nombre y firma)"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Tooltip
                      title={
                        <span style={{ fontSize: '16px' }}>
                          Tecnología de la información y comunicación: Relacionadas a
                          instalación de sistemas tecnológicos. Mercadeo: Relacionado a
                          servicios audiovisuales, eventos y comunicaciones.
                          Electromedicina: Relacionado a instalación, mantenimiento y
                          calibración de equipos médicos. Servicios Generales: Relacionado
                          a instalación, mantenimiento de equipos, plantas física y bienes.
                        </span>
                      }
                    >
                      <HelpIcon />
                    </Tooltip>
                    <TextField
                      label="Verificado por (Nombre y firma)"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Tooltip
                      title={
                        <span style={{ fontSize: '16px' }}>
                          Encargado(a) del área/ Dirección
                        </span>
                      }
                    >
                      <HelpIcon />
                    </Tooltip>
                    <TextField
                      label="Aprobado por (Nombre y firma)"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Tooltip
                      title={
                        <span style={{ fontSize: '16px' }}>
                          Encargado(a) de compras
                        </span>
                      }
                    >
                      <HelpIcon />
                    </Tooltip>
                    <TextField
                      label="Recibido por (Nombre y firma)"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Tooltip
                      title={
                        <span style={{ fontSize: '16px' }}>
                          Encargado(a) Administrativo
                        </span>
                      }
                    >
                      <HelpIcon />
                    </Tooltip>
                    <TextField
                      label="Validado por (Nombre y firma)"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Button type="submit" variant="contained" color="primary">Enviar</Button>
          </Form>
        </Paper>
      )}
    </Formik>
  );
};

export default ContractForm;