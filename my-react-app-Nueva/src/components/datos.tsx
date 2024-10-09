
export const datosCatalogo = [
  { id: 1, codigoSistema: '10101501', descripcion: 'Gatos' },
  { id: 2, codigoSistema: '10101502', descripcion: 'Perros' },
  { id: 3, codigoSistema: '10101504', descripcion: 'Vison' },
  { id: 4, codigoSistema: '10101505', descripcion: 'Ratas' },
  { id: 5, codigoSistema: '10101506', descripcion: 'Caballos' },
];

export type DatosCatalogo = {
  id: number;
  codigoSistema: string;
  descripcion: string;
}

export type Datos = {
  id: number;
  codigoSistema: string;
  cuentaObjetal: string;
  descripcion: string;
  cantidad: number;
}

export const preDatos: Datos[] = [
  { id: 1, codigoSistema: '10101512', cuentaObjetal: '2.6.7.7.01', descripcion: 'Conejos', cantidad: 1 },
  { id: 2, codigoSistema: '10101513', cuentaObjetal: '2.6.7.7.01', descripcion: 'Cobayas o conejillos de indias ', cantidad: 2 },
  { id: 3, codigoSistema: '10101514', cuentaObjetal: '2.6.7.7.01', descripcion: 'Primates', cantidad: 3 },
  { id: 4, codigoSistema: '10101515', cuentaObjetal: '2.6.7.7.01', descripcion: 'Armadillos', cantidad: 4 },
  { id: 5, codigoSistema: '10101516', cuentaObjetal: '2.6.7.1.01', descripcion: 'Ganado vacuno', cantidad: 5 },
];

export type NewDatos = {
  id: number;
  codigoSistema: string;
  cuentaObjetal: string;
  descripcion: string;
  inv: string;
  medida: string;
  cantidad: number;
}

export const preNewDatos: NewDatos[] = [
  { id: 1, codigoSistema: '10101507', cuentaObjetal: '2.6.7.4.01', descripcion: 'Ovejas', inv: 'inv1', medida: 'unidades', cantidad: 1 },
  { id: 2, codigoSistema: '10101508', cuentaObjetal: '2.6.7.4.01', descripcion: 'Cabras', inv: 'inv2', medida: 'unidades', cantidad: 2 },
  { id: 3, codigoSistema: '10101509', cuentaObjetal: '2.6.7.6.01', descripcion: 'Asnos', inv: 'inv3', medida: 'unidades', cantidad: 3 },
  { id: 4, codigoSistema: '10101510', cuentaObjetal: '2.6.7.7.01', descripcion: 'Ratones', inv: 'inv4', medida: 'unidades', cantidad: 4 },
  { id: 5, codigoSistema: '10101511', cuentaObjetal: '2.6.7.2.01', descripcion: 'Cerdos', inv: 'inv5', medida: 'unidades', cantidad: 5 },
];


// datos.ts

export type DatosPacc = {
  id: number;
  codigoSistema: string;
  gerenciaDepartamento: string;
  cuentaObjetal: string;
  descripcion: string;
  unidadMedida: string;
  precioUnitario: number;
  trimestre: number;
  total: number;
}

export const datosPacc: DatosPacc[] = [
  { id: 1, codigoSistema: '83112402', gerenciaDepartamento: 'Dirección de Tecnología', cuentaObjetal: '2.1.3.01', descripcion: 'Servicios Telefónicos Y Data', unidadMedida: 'Servicios', precioUnitario: 171.000, trimestre: 4, total: 171.000 }, // Ejemplo de total
  { id: 2, codigoSistema: '26121539', gerenciaDepartamento: 'Dirección de Tecnología', cuentaObjetal: '2.3.9.01', descripcion: 'Patch Cord Utp Categoria 6 100% Cobre', unidadMedida: 'Unidad', precioUnitario: 2.665, trimestre: 4, total: 2.665 },
  { id: 3, codigoSistema: '43201803', gerenciaDepartamento: 'Dirección de Tecnología', cuentaObjetal: '2.3.9.01', descripcion: 'Disco Duro Interno Para Pc', unidadMedida: 'Unidad', precioUnitario: 5.300, trimestre: 4, total: 5.300 },
  { id: 4, codigoSistema: '81111809', gerenciaDepartamento: 'Dirección de Tecnología', cuentaObjetal: '2.2.8.7.05', descripcion: 'Contrato Mantenimiento Sistema Erp Dynamics', unidadMedida: 'Unidad', precioUnitario: 1000.00000, trimestre: 4, total: 1000.00000 },
  { id: 5, codigoSistema: '43211902', gerenciaDepartamento: 'Dirección de Tecnología', cuentaObjetal: '2.6.1.3.01', descripcion: 'Monitor Para Pc', unidadMedida: 'Unidad', precioUnitario: 7.500, trimestre: 4, total: 7.500 },
];
