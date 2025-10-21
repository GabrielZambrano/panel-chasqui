# Ejemplo de Documento Actualizado

## Documento Original
```javascript
clientestelefonos1/593991349447
{
  "telefono": "0991349447",
  "telefonoCompleto": "593991349447",
  "nombre": "pepe",
  "fechaRegistro": "16 de octubre de 2025, 12:28:36 p.m. UTC-5",
  "activo": true,
  "sector": "la tola",
  "prefijo": "Ecuador",
  "direcciones": [
    {
      "direccion": "call leon",
      "coordenadas": "",
      "fechaRegistro": "16 de octubre de 2025, 12:28:36 p.m. UTC-5",
      "activa": true,
      "modoRegistro": "manual",
      "sector": "la tola"
    }
  ]
}
```

## Documento Después de Registrar Nueva Dirección
```javascript
clientestelefonos1/593991349447
{
  "telefono": "0991349447",
  "telefonoCompleto": "593991349447",
  "nombre": "pepe",
  "fechaRegistro": "16 de octubre de 2025, 12:28:36 p.m. UTC-5",
  "activo": true,
  "sector": "la tola",
  "prefijo": "Ecuador",
  "direcciones": [
    {
      "direccion": "call leon",
      "coordenadas": "",
      "fechaRegistro": "16 de octubre de 2025, 12:28:36 p.m. UTC-5",
      "activa": false,  // ← Desactivada
      "modoRegistro": "manual",
      "sector": "la tola"
    },
    {
      "direccion": "las casas de don jefe",  // ← Nueva dirección
      "coordenadas": "-0.2298500,-78.5249500",  // ← Con coordenadas
      "fechaRegistro": "17 de octubre de 2025, 10:15:30 a.m. UTC-5",  // ← Nueva fecha
      "activa": true,  // ← Activa (principal)
      "modoRegistro": "manual",  // ← Modo de registro
      "sector": "las casas de don jefe"  // ← Sector automático
    }
  ]
}
```

## Escenarios de Uso

### 1. Dirección Nueva
- **Input**: `"las casas de don jefe"` con coordenadas `"-0.2298500,-78.5249500"`
- **Resultado**: Se agrega como nueva dirección activa
- **Direcciones anteriores**: Se marcan como inactivas

### 2. Dirección Existente
- **Input**: `"call leon"` (ya existe)
- **Resultado**: No se agrega duplicado
- **Log**: `"📍 La dirección ya existe en el historial, no se agregará duplicada"`

### 3. Dirección Existente con Coordenadas Diferentes
- **Input**: `"call leon"` con coordenadas `"-0.123456,-78.654321"`
- **Resultado**: Se actualizan las coordenadas de la dirección existente
- **Log**: `"📍 Coordenadas actualizadas en dirección existente"`

### 4. Coordenadas Iguales con Dirección Diferente
- **Input**: `"nueva dirección"` con coordenadas `"-0.000000,-78.000000"` (ya existen)
- **Resultado**: No se agrega (se considera duplicado por coordenadas)

## Flujo de Validación

1. **Validar teléfono**: Debe ser válido (7 o 9-10 dígitos)
2. **Buscar cliente**: En la colección correspondiente
3. **Verificar existencia**: Cliente debe existir
4. **Comparar direcciones**: Normalizar y comparar con historial
5. **Decidir acción**:
   - Si es nueva → Agregar
   - Si existe → Actualizar coordenadas si es necesario
   - Si es duplicado → No hacer nada
6. **Actualizar documento**: En Firebase
7. **Log resultado**: Para monitoreo
