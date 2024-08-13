
export enum Barangay {
  Aclan = 'Aclan',
  Amontay = 'Amontay',
  AtaAtahon = 'Ata-atahon',
  Barangay1Poblacion = 'Brgy. 1 (Poblacion)',
  Barangay2Poblacion = 'Brgy. 2 (Poblacion)',
  Barangay3Poblacion = 'Brgy. 3 (Poblacion)',
  Barangay4Poblacion = 'Brgy. 4 (Poblacion)',
  Barangay5Poblacion = 'Brgy. 5 (Poblacion)',
  Barangay6Poblacion = 'Brgy. 6 (Poblacion)',
  Barangay7Poblacion = 'Brgy. 7 (Poblacion)',
  Camagong = 'Camagong',
  CubiCubi = 'Cubi-Cubi',
  Culit = 'Culit',
  Jaguimitan = 'Jaguimitan',
  Kinabjangan = 'Kinabjangan',
  Punta = 'Punta',
  SantaAna = 'Santa Ana',
  Talisay = 'Talisay',
  Triangulo = 'Triangulo',
}

export const BarangayList = Object.entries(Barangay).map(([key, value]: [string, string]) => value)