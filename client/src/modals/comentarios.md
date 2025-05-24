                                                        // ArticuloModal

import
-el css
-useEffect se usa para detectar cambios (editar/crear articulo) -useState guarda valores que van cambiando (guarda lo que se va escribiendo en los inputs)


articuloTiposDatos ()
-define los tipos de datos que puede tener el objeto articuloTiposDatos
-id?: number: el ? significa que es opcional, si no le pasas nada no pasa nada, en los otros si no le pasas nada te tira error (son obligatorios)


articuloModalPropiedades
-type: se usa para definir los tipos de datos que deben aceptar las propiedades, si le pasas uno distinto typescript te tira un error
-ArticuloModalPropiedades: define las propiedades que recibe el componente ArticuloModal
-modalVisible: le tenes que pasar si o si un booleano
-modalCerrar: () => void: le dice que no va a recibir nada (()), que es una funcion flecha (=>) y que no devuelve nada (void)
-guardar: (data: articuloTiposDatos): significa que le pasas un objeto (data) y puede ser de cualquier tipo de dato dentro de los que maneja articuloTiposDatos
y va a devolver una promesa (algo a futuro) que va a ser un booleano (osea que en un tiempito tiene que devolver true o false)
-articuloInicial: puede tener un objeto que este dentro de articuloTiposDatos o puede ser null (dato nulo)
-manejarEliminacion: esto dice que podes pasar un numero o un null (number | null) y que no devuelve nada (void)
ademas el numero viene de un id (id) y ese mismo id es opcional (?) (id?)


ArticuloModal
-ArticuloModal(): entre los parentesis le decis las propiedades que recibe
-({modalInvisible, modalCerrar, ...}: articuloModalPropiedades): le pasas entre llaves las propiedades de articuloModalPropiedades que le vas a pasar


articuloValoresVacios
-le pasa un objeto (articuloTiposDatos) con los tipos de datos y le define todos los valores en 0 (para definir los valores de los inputs)


datosArticulo
-ejemplo: const [valor, setValor] = useState <tipoDeValor>(valorInicial);
-const: para hacer una nueva funcion. valor: el nombre de la variable que tiene los datos dentro. setDatosArticulo: para editar el valor de datosArticulo
-useState: viene de react, es el encargado de guardar los datos dentro de datosArticulo. <articuloTiposDatos>: son los tipos de datos que acepta
-(articuloValoresVacios): son los valores en 0


useEffect
-es el encargado de actualizar los valores de datosArticulo por medio de setDatosArticulo
-useEffect: se ejecuta automáticamente cada vez que cambian los que estan al final ([articuloInicial, modalVisible])
-if (modalVisible && articuloInicial): si modalVisible es true y articuloInicial tiene algun valor (osea q no es null) se ejecuta =>
-setDatosArticulo(articuloInicial): que setDatosArticulo le pasa el valor de articuloInicial a DatosArticulo sino =>
-else if (modalVisible && !articuloInicial): si modalVisible es true y articuloInicial no tiene ningun valor (osea que es null) se ejecuta =>
-setDatosArticulo(articuloValoresVacios): que setDatosArticulo le pasa el valor de articuloValoresVacios a DatosArticulo y =>
-[articuloInicial, modalVisible]: esta explicado arriba


manejarDecimales
-(e, campo): le pasa el evento y el campo que se quiere actualizar a la funcion manejarDecimales
-e: React.ChangeEvent<HTMLInputElement>: e es el evento que se ejecuta cuando se va escribiendo en el input y es de tipo HTMLInputElement
-campo: keyof articuloTiposDatos: la variable campo es el campo del articulo que se quiere actualizar ("pcosto", "pventa") y tiene que ser de algun tipo de los que estan dentro de articuloTiposDatos
-=> : luego se ejecuta =>
-let valor = e.target.value: iguala a "valor" al valor que tiene el input (e.target.value)
-valor = valor.replace(",", "."): si el input tiene un valor dentro de el con una "," lo cambia por un "."
-if (!/^\d{0,8}(\.\d{0,2})?$/.test(valor)): si tiene mas de 8 digitos, mas de 2 decimales o algo que no sea un "." se activa el if =>
-alert(); return: donde muestra una alerta y detiene la ejecucion del codigo con el return
-setDatosArticulo({ ...datosArticulo, [campo]: valor }): si todo salio bien se setea solo el valor que debe, los otros siguen igual de datosArticulo (...datosArticulo) con los valores que tiene campo ([campo]: valor)


cerrarYLimpiarInputs
-Esta función se encarga de cerrar el modal y limpiar los inputs


if
-si modalVisible es false retorna null (no se muestra nada) si no se cumple la condicion se ejecuta el return (se muestra el modal)


return
-lo que retorna la funcion ArticuloModal


form
-onSubmit: es lo que se ejecuta cuando se envia el formulario. async: para luego poder usar await. (e): (event) es el evento que se ejecuta
-e.preventDefault(): previene que se recargue la pagina en el evento que se envio (recargar la pagina cuando se envia un formulario es
un comportamiento por defecto de los formularios)
-await: obliga a esperar a que se termine de ejecutar la funcion guardar antes de seguir con el resto del codigo
-guardar(datosArticulo): le pasa el objeto datosArticulo a la funcion guardar para que los pase a Articulo.tsx por medio de =>
articuloModalPropiedades, para que luego se guarde en la base de datos por medio de la url
-if (exito) { modalCerrar(); }: si se guardo correctamente el articulo, convierte a exito en true y cierra el modal


input
-type: es lo que permite poner en el input
-value{datosArticulo.codigo}: es el valor que tiene ese input, en este caso tiene el valor de codigo dentro de datosArticulo
-{datosArticulo.codigo ?? ""}: el ?? evalua si datosArticulo.codigo es null, si lo es pasa el valor de la derecha ("") =>
si datosArticulo.codigo tiene un valor, le pasa ese mismo valor, el que datosArticulo.codigo tiene dentro
-onChange: se ejecuta cuando el usuario va escribiendo en el input y va cambiando el valor de datosArticulo por medio de =>
-setDatosArticulo: setea el valor de datosArticulo con el valor de =>
-codigo: e.target.value: iguala a "codigo" al valor que tiene el input (e.target.value)
-...datosArticulo: le pasa todos los valores que tiene datosArticulo y solo cambia el valor de codigo, a los otros no les cambia nada


button borrar articulo
-onClick={() => manejarEliminacion(articuloInicial?.id): le pasa el id del articulo a la funcion manejarEliminacion
-?: es para decir que si articuloInicial.id es null, no le pasa el id a la funcion manejarEliminacion

                                                        // Articulo

import
-el css
-ArticuloModal para usarlo luego
-useEffect se usa para detectar cambios y useState guarda valores que van cambiando (se usa en todos los lugares que se debe setear algo, ej: setArticulos)

articulos
-articulos: la variable donde se guardan los datos
-setArticulos la funcion que guarda los datos dentro de articulos
-useState<any[]>([]): useState es la variable que guarda datos de cualquier tipo (any[])