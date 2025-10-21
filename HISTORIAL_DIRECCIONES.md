# Sistema de Historial de Direcciones

## Descripción
El sistema de historial de direcciones permite guardar automáticamente todas las direcciones nuevas que se registren en los pedidos, evitando duplicados y manteniendo un historial completo de las ubicaciones de cada cliente.

## Funcionamiento

### 1. Registro Automático
Cuando se registra un nuevo pedido (manual o desde aplicación), el sistema:
- Verifica si la dirección ya existe en el historial del cliente
- Si es nueva, la agrega al array `direcciones` del documento del cliente
- Si ya existe, actualiza las coordenadas si son diferentes
- Marca la nueva dirección como activa y desactiva las anteriores

### 2. Estructura del Documento
Cada cliente en `clientestelefonos1` tiene un array `direcciones` con la siguiente estructura:

```javascript
direcciones: [
  {
    direccion: "call leon",
    coordenadas: "-0.000000,-78.000000",
    fechaRegistro: "16 de octubre de 2025, 12:28:36 p.m. UTC-5",
    activa: true,
    modoRegistro: "manual", // o "aplicacion"
    sector: "la tola"
  }
]
```

### 3. Funciones Implementadas

#### `guardarNuevaDireccionEnHistorial(telefono, nuevaDireccion, coordenadas, modoRegistro)`
- Función principal para guardar nuevas direcciones
- Verifica duplicados antes de agregar
- Actualiza coordenadas si la dirección existe pero las coordenadas son diferentes

#### `verificarDireccionExistente(direccionesActuales, nuevaDireccion, coordenadas)`
- Función de utilidad para verificar si una dirección ya existe
- Compara tanto dirección como coordenadas

#### `actualizarHistorialDireccionesCliente(telefono, nuevaDireccion, coordenadas, modoRegistro)`
- Función genérica para actualizar historial desde cualquier parte del sistema
- Maneja tanto clientes de 7 dígitos como celulares

### 4. Integración en el Flujo

#### Pedidos Manuales
En `handleInsertarViaje()`:
```javascript
if (telefono && direccion) {
  await guardarEnHistorialCliente(telefono, direccion, coordenadas, 'manual');
  await guardarNuevaDireccionEnHistorial(telefono, direccion, coordenadas, 'manual');
}
```

#### Pedidos desde Aplicación
En `handleSolicitarAplicacion()`:
```javascript
if (telefono && direccion) {
  await guardarEnHistorialCliente(telefono, direccion, coordenadas, 'aplicacion');
  await guardarNuevaDireccionEnHistorial(telefono, direccion, coordenadas, 'aplicacion');
}
```

### 5. Validaciones

- **Teléfono válido**: Debe tener 7 dígitos (teléfonos fijos) o 9-10 dígitos (celulares)
- **Dirección válida**: No puede estar vacía
- **Cliente existente**: El cliente debe existir en la base de datos
- **No duplicados**: No se agregan direcciones exactamente iguales

### 6. Modos de Registro

- **manual**: Cuando se registra desde el formulario manual
- **aplicacion**: Cuando se registra desde la aplicación móvil

### 7. Beneficios

1. **Historial completo**: Se mantiene un registro de todas las direcciones usadas
2. **Evita duplicados**: No se almacenan direcciones repetidas
3. **Actualización automática**: Las coordenadas se actualizan si cambian
4. **Trazabilidad**: Se registra cuándo y cómo se agregó cada dirección
5. **Dirección activa**: Siempre se marca la última dirección como activa

## Uso

El sistema funciona automáticamente cuando se registran pedidos. No requiere intervención manual, pero las funciones están disponibles para uso programático si es necesario.

## Logs

El sistema genera logs detallados para monitoreo:
- `📍 Guardando nueva dirección en historial`
- `📍 La dirección ya existe en el historial, no se agregará duplicada`
- `📍 Nueva dirección agregada al historial como principal`
- `✅ Nueva dirección guardada exitosamente en el historial del cliente`
