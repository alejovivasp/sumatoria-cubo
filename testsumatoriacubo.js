
(function(sumatoriacubo) {
var sumatoriacubo = sumatoriacubo || {};

describe("Conversion de cadenas a numeros", function() 
{
	describe("Cuando se intentar convertir un valor idefinido o nulo a entero", function() 
	{
		it("Debe indicar que no se ingreso un valor", function() 
		{
		    var resultadoValorIndefinido = sumatoriacubo.stringToEntero();
		    expect(resultadoValorIndefinido.estado).toBe('ERROR_VALOR_INDEFENIDO');
		});
		
		it("Debe indicar que se ingreso un valor nulo", function() 
		{
		    var resultadoValorIndefinido = sumatoriacubo.stringToEntero(null);
		    expect(resultadoValorIndefinido.estado).toBe('ERROR_VALOR_NULO');
		});
	});
	
	describe("Cuando se intenta convertir a entero una cadena con un valor no numerico", function() 
	{
		it("Debe indicar que no se ingreso una cadena con un valor entero para el valor ['1a']", function() 
		{
		    var resultadoValorIndefinido = sumatoriacubo.stringToEntero('1a');
		    expect(resultadoValorIndefinido.estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		
		it("Debe indicar que no se ingreso una cadena con un valor entero para el valor ['a1']", function() 
		{
		    var resultadoValorIndefinido = sumatoriacubo.stringToEntero('a1');
		    expect(resultadoValorIndefinido.estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		
		it("Debe indicar que no se ingreso una cadena con un valor entero para el valor ['']", function() 
		{
		    var resultadoValorIndefinido = sumatoriacubo.stringToEntero('');
		    expect(resultadoValorIndefinido.estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		
		it("Debe indicar que no se ingreso una cadena", function() 
		{
		    var resultadoValorIndefinido = sumatoriacubo.stringToEntero(1);
		    expect(resultadoValorIndefinido.estado).toBe('ERROR_VALOR_NO_STRING');
		});
	});
	
	describe("Cuando se intenta convertir una cadena con un valor valido", function() 
	{
		var numero = Math.floor((Math.random() *  Number.MAX_SAFE_INTEGER ) );
		var stringNumero = numero + '';
		it("Debe indicar que la operacion es exitosa y regresar el valor correctamente si se envia el valor ['" + numero + "']", function() 
		{			
		    var resultadoValorIndefinido = sumatoriacubo.stringToEntero(stringNumero);
		    expect(resultadoValorIndefinido.estado).toBe('EXITO');
		    expect(resultadoValorIndefinido.datos).toBe(numero);
		});
	});
});
	
describe("Lectura de numero de pruebas", function() 
{
	describe("Cuando el numero de pruebas a leer es invalido", function() 
	{
		it("Debe indicar que el numero de pruebas es invalido si envia texto en lugar de un numero", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerNumeroPruebas('w').estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		
		it("Debe indicar que el numero de pruebas es invalido si envia texto vacio", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerNumeroPruebas('').estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		
		it("Debe indicar que el numero de pruebas es invalido si envia texto un valor menor a 1", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerNumeroPruebas('0').estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		it("Debe indicar que el numero de pruebas es invalido si envia texto un valor mayor a 50", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerNumeroPruebas('51').estado).toBe('ERROR_RANGO_INVALIDO');
		});		
		
		var numero = Math.floor((Math.random() *  50 ) + 1 );
		var stringNumero = numero + '';
		it("Debe indicar que el numero de pruebas es valido si envia texto un valor [" + stringNumero +"] el cual esta entre 1 y 50", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerNumeroPruebas(stringNumero).estado).toBe('EXITO');
		});
	});
});	

describe("Lectura de dimension matriz y numero de sentencias", function() 
{
	describe("Cuando el valor con la dimension matriz y numero de sentencias es indefinido, nulo, no es una cadena o se una valor", function() 
	{
		it("Debe indicar error si no se define un valor para la dimension y el numero de sentencias", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias().estado).toBe('ERROR_VALOR_INDEFENIDO');
		});
		
		it("Debe indicar error si es nulo el valor para la dimension y el numero de sentencias", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias(null).estado).toBe('ERROR_VALOR_NULO');
		});
		
		it("Debe indicar error si el valor no es un string para la dimension y el numero de sentencias", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias(1).estado).toBe('ERROR_VALOR_NO_STRING');
		});
		
		it("Debe indicar error si el valor es un string vacio", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias('').estado).toBe('ERROR_DIMENSION_MATRIZ_SENTENCIA');
		});

		it("Debe indicar error si solo se envia un valor", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias('1').estado).toBe('ERROR_DIMENSION_MATRIZ_SENTENCIA');
		});
	});
	
	describe("Cuando el texto con la dimension de la matriz no es valido", function() 
	{
		it("Debe indicar que la dimension de la matriz es invalido si envia texto en lugar de un numero", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias('n 3').estado).toBe('ERROR_VALOR_NO_ENTERO');
		});		
		
		var dimensionMenor = - Math.floor((Math.random() *  100 ) + 1 );
		var stringDimensionMenor = dimensionMenor + '';
		it("Debe indicar que la dimension de la matriz es invalida si el valor ["+ dimensionMenor +"] es menor es 1", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias(stringDimensionMenor + ' 3').estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		var dimensionMayor = 100 + Math.floor((Math.random() *  100 ) + 1 );
		var stringDimensionMayor = dimensionMayor + '';
		it("Debe indicar que la dimension de la matriz es invalida si el valor ["+ dimensionMayor +"] es mayor es 100", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias(stringDimensionMayor + ' 3').estado).toBe('ERROR_RANGO_INVALIDO');
		});		
	});
	
	describe("Cuando el texto con el numero de sentencias de la prueba no es valido", function() 
	{
		it("Debe indicar que la dimension de la matriz es invalido si envia texto en lugar de un numero", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias('3 a').estado).toBe('ERROR_VALOR_NO_ENTERO');
		});		
		
		var sentenciasMenor = - Math.floor((Math.random() *  1000 ) + 1 );
		var stringSentenciasMenor = sentenciasMenor + '';
		it("Debe indicar que el numero de setencias es invalido si el valor ["+ sentenciasMenor +"] es menor es 1", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias('3 ' + stringSentenciasMenor).estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		var sentenciasMayor = 1000 + Math.floor((Math.random() *  1000 ) + 1 );
		var stringSentenciasMayor = sentenciasMayor + '';
		it("Debe indicar que el numero de setencias es invalido si el valor ["+ sentenciasMayor +"] es mayor es 1000", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias('3 ' + stringSentenciasMayor).estado).toBe('ERROR_RANGO_INVALIDO');
		});		
	});
	
	describe("Cuando el texto con el la dimension de la matriz y el numero de sentencias es valido", function() 
	{
		var dimensionValida = Math.floor((Math.random() *  100 ) + 1 );
		var stringDimensionValida = dimensionValida + '';
		
		var sentenciaValida = Math.floor((Math.random() *  1000 ) + 1 );
		var stringSentenciaValida = sentenciaValida + '';
		it("Debe indicar que la dimension de la matriz y el numero de sentencias es valido para el valor ["+ stringDimensionValida + ' ' + sentenciaValida +"]", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.leerDimensionMatrizSentencias(stringDimensionValida + ' ' + stringSentenciaValida).estado).toBe('EXITO');
		});
	});	
});

describe("Ejecucion comando UPDATE", function() 
{
	describe("Cuando se intenta ejecutar un UPDATE pero el valor es indefinido, nulo, no es una cadena o se envia una cadena vacia", function() 
	{
		it("Debe indicar que se envio un valor indefinido", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate(undefined,100,matriz).estado).toBe('ERROR_VALOR_INDEFENIDO');
		});
		it("Debe indicar que se envio un valor nulo", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate(null,100,matriz).estado).toBe('ERROR_VALOR_NULO');
		});
		it("Debe indicar que se envio un valor no string", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate(1,100,matriz).estado).toBe('ERROR_VALOR_NO_STRING');
		});
		it("Debe indicar que se envio un valor vacio", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('',100,matriz).estado).toBe('ERROR_NO_SE_ENVIA_COMANDO');
		});	
	});
	
	describe("Cuando se intenta ejecutar un UPDATE con datos invalidos", function() 
	{
		it("Debe indicar que la coordenada x no corresponde con un valor entero", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE x 1 2 5',100,matriz).estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		it("Debe indicar que la coordenada x supera la dimension de la matriz", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE 3 1 1 5',1,matriz).estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		it("Debe indicar que la coordenada y no corresponde con un valor entero", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE 1 y 2 5',100,matriz).estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		it("Debe indicar que la coordenada y supera la dimension de la matriz", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE 1 3 1 5',1,matriz).estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		it("Debe indicar que la coordenada z no corresponde con un valor entero", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE 1 1 z 5',100,matriz).estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		it("Debe indicar que la coordenada z supera la dimension de la matriz", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE 1 1 3 5',1,matriz).estado).toBe('ERROR_RANGO_INVALIDO');
		});
	});
		
	describe("Cuando se intenta ejecutar un UPDATE con menos o mas parametros", function() 
	{
		it("Debe indicar que UPDATE es invalido al no enviar las coordenadas ni el valor en el comando", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE',100,matriz).estado).toBe('ERROR_COMANDO_UPDATE_INVALIDO');
		});
		
		it("Debe indicar que UPDATE es invalido cuando solo se envia una coordenada", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE 1',100,matriz).estado).toBe('ERROR_COMANDO_UPDATE_INVALIDO');
		});
		
		it("Debe indicar que UPDATE es invalido cuando solo se envia dos coordenadas", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE 1 2',100,matriz).estado).toBe('ERROR_COMANDO_UPDATE_INVALIDO');
		});
		
		it("Debe indicar que UPDATE es invalido cuando solo se envia tres coordenadas", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE 1 2 3',100,matriz).estado).toBe('ERROR_COMANDO_UPDATE_INVALIDO');
		});
		
		it("Debe indicar que UPDATE es invalido cuando solo se envia mas parametros", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE 1 2 3 5 2',100,matriz).estado).toBe('ERROR_COMANDO_UPDATE_INVALIDO');
		});
	});
	
	describe("Cuando se ejecuta un UPDATE con datos validos", function() 
	{
		it("Debe quedar almacenado en la matriz el valor enviado en el comando", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarUpdate('UPDATE 1 2 3 4',100,matriz).estado).toBe('EXITO');
		    expect(matriz.get('1|2|3')).toBe(4);
		});
	});
});


describe("Ejecucion comando QUERY", function() 
{
	describe("Cuando se ejecuta un QUERY con datos invalidos", function() 
	{
		it("Debe indicar error si no se envia un indefinido", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery(undefined,5,matriz).estado).toBe('ERROR_VALOR_INDEFENIDO');
		});
		
		it("Debe indicar error si se envia un valor nulo", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery(null,5,matriz).estado).toBe('ERROR_VALOR_NULO');
		});
		
		it("Debe indicar error si se envia un valor no string", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery(1,5,matriz).estado).toBe('ERROR_VALOR_NO_STRING');
		});
		
		it("Debe indicar error si se envia un valor vacio", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery(' ',5,matriz).estado).toBe('ERROR_NO_SE_ENVIA_COMANDO');
		});
		
		it("Debe indicar error si se envian menos datos de los que espera el comando QUERY", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 2 2 2 2',5,matriz).estado).toBe('ERROR_COMANDO_QUERY_INVALIDO');
		});
		
		it("Debe indicar error si la coordenada x1 no corresponde con un valor entero", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY a 2 2 2 2 2',5,matriz).estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		it("Debe indicar error si la coordenada x1 supera la dimension de la matriz", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 6 2 2 2 2 2',5,matriz).estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		it("Debe indicar error si la coordenada y1 no corresponde con un valor entero", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 2 a 2 2 2 2',5,matriz).estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		it("Debe indicar error si la coordenada y1 supera la dimension de la matriz", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 6 2 2 2 2',5,matriz).estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		it("Debe indicar error si la coordenada z1 no corresponde con un valor entero", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 2 2 q 2 2 2',5,matriz).estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		it("Debe indicar error si la coordenada z1 supera la dimension de la matriz", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 1 6 2 2 2',5,matriz).estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		it("Debe indicar error si la coordenada x2 no corresponde con un valor entero", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 2 2 2 a 2 2',5,matriz).estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		it("Debe indicar error si la coordenada x2 supera la dimension de la matriz", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 2 2 6 2 2',5,matriz).estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		it("Debe indicar error si la coordenada y2 no corresponde con un valor entero", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 2 2 2 2 a 2',5,matriz).estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		it("Debe indicar error si la coordenada y2 supera la dimension de la matriz", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 1 2 2 6 2',5,matriz).estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		it("Debe indicar error si la coordenada z2 no corresponde con un valor entero", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 2 2 1 2 2 a',5,matriz).estado).toBe('ERROR_VALOR_NO_ENTERO');
		});
		it("Debe indicar error si la coordenada z2 supera la dimension de la matriz", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 1 1 2 2 6',5,matriz).estado).toBe('ERROR_RANGO_INVALIDO');
		});
		
		
		it("Debe indicar error si la coordenada x1 es mayor x2", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 2 1 1 1 2 1',5,matriz).estado).toBe('ERROR_X1_MAYOR_X2');
		});
		it("Debe indicar error si la coordenada y1 es mayor y2", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 2 1 1 1 1',5,matriz).estado).toBe('ERROR_Y1_MAYOR_Y2');
		});
		it("Debe indicar error si la coordenada z1 es mayor z2", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 1 2 1 1 1',5,matriz).estado).toBe('ERROR_Z1_MAYOR_Z2');
		});
	});
		
	describe("Cuando se intenta ejecutar un QUERY con menos o mas parametros", function() 
	{
		it("Debe indicar error si se envian mas datos de los que espera el comando QUERY", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 2 2 2 2 2 1',5,matriz).estado).toBe('ERROR_COMANDO_QUERY_INVALIDO');
		});
		
		it("Debe indicar error si se envian solo una coordenada al comando QUERY", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1',5,matriz).estado).toBe('ERROR_COMANDO_QUERY_INVALIDO');
		});
		it("Debe indicar error si se envian dos coordenadas al comando QUERY", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 2',5,matriz).estado).toBe('ERROR_COMANDO_QUERY_INVALIDO');
		});
		it("Debe indicar error si se envian tres coordenadas al comando QUERY", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 2 3',5,matriz).estado).toBe('ERROR_COMANDO_QUERY_INVALIDO');
		});
		it("Debe indicar error si se envian cuatro coordenadas al comando QUERY", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 2 3 4',5,matriz).estado).toBe('ERROR_COMANDO_QUERY_INVALIDO');
		});
		it("Debe indicar error si se envian cinco coordenadas al comando QUERY", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 2 3 4 5',5,matriz).estado).toBe('ERROR_COMANDO_QUERY_INVALIDO');
		});
	});
		
	describe("Cuando se ejecutar un QUERY con coordenadas validas", function() 
	{
		it("Debe indicar exito si se envian datos validos", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 1 1 2 2 2',5,matriz).estado).toBe('EXITO');
		});
		
		it("Debe regresar cero si la matriz es vacia", function() 
		{
			var matriz = new Map();
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 1 1 2 2 2',5,matriz).datos).toBe(0);
		});		
		
		it("Debe indicar exito si el resultado de los valores al sumar es el esperado", function() 
		{
			var matriz = new Map();
			matriz.set('1|1|1',23);
			matriz.set('1|1|2',11);
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.ejecutarQuery('QUERY 1 1 1 2 2 2',5,matriz).datos).toBe(34);
		});		
	});
});

describe("Procesamiento de pruebas", function() 
{
	describe("Cuando no se envia datos a procesar", function() 
	{
		it("Debe indicar que no se ingreso un valor cuando no se envio valor en el constructor", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas();
		    expect(lectorPruebas.procesarPruebas().estado).toBe('ERROR_VALOR_INDEFENIDO');
		});
		
		it("Debe indicar que no se ingreso un valor cuando no se envio un valor nulo", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas(null);
		    expect(lectorPruebas.procesarPruebas().estado).toBe('ERROR_VALOR_NULO');
		});
		
		it("Debe indicar que no se ingreso un valor cuando no se envia un cadena vacia", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas('');
		    expect(lectorPruebas.procesarPruebas().estado).toBe('ERROR_NO_SE_ENVIA_COMANDOS');
		});		
	});
	
	describe("Cuando se envia datos que no son string", function() 
	{
		it("Debe indicar que no se ingreso un valor string cuando se envia un numero", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas(1);
		    expect(lectorPruebas.procesarPruebas().estado).toBe('ERROR_COMANDOS_NO_STRING');
		});
		
		it("Debe indicar que no se ingreso un valor string cuando se envia un objeto que no es de la clase string", function() 
		{
		    var lectorPruebas = new sumatoriacubo.LectorPruebas(new Object());
		    expect(lectorPruebas.procesarPruebas().estado).toBe('ERROR_COMANDOS_NO_STRING');
		});
	});
	
	describe("Cuando los datos a procesar son invalidos", function() 
	{
		it("Debe indicar error si el numero de pruebas indicado es inferior al enviado en los datos", function() 
		{
     		var datos = '2\n4 1\nUPDATE 2 2 2 4';
		    var lectorPruebas = new sumatoriacubo.LectorPruebas(datos);		   
		    expect(lectorPruebas.procesarPruebas().estado).toBe('NUMERO_PRUEBAS_INFERIOR_ESPERADO');
		});
		it("Debe indicar error si el numero de sentencias indicado es inferior al enviado en los datos", function() 
		{
     		var datos = '1\n4 2\nUPDATE 2 2 2 4';
		    var lectorPruebas = new sumatoriacubo.LectorPruebas(datos);		   
		    expect(lectorPruebas.procesarPruebas().estado).toBe('NUMERO_SENTENCIA_INFERIOR_ESPERADO');
		});		
	});
	
	describe("Cuando los datos a procesar son validos", function() 
	{
		it("Debe indicar exito si se envian datos validos con una prueba", function() 
		{
     		var datos = '1\n4 2\nUPDATE 2 2 2 4\nQUERY 1 1 1 2 2 2';
		    var lectorPruebas = new sumatoriacubo.LectorPruebas(datos);		   
		    expect(lectorPruebas.procesarPruebas().estado).toBe('EXITO');
		    expect(lectorPruebas.procesarPruebas().datos).toBe('4\n');
		});
		
		it("Debe indicar exito si se envian datos validos con dos pruebas", function() 
		{
     		var datos = '2\n'+
     		            '4 5\n' +
     		            'UPDATE 2 2 2 4\n'+
     		            'QUERY 1 1 1 3 3 3\n'+
     		            'UPDATE 1 1 1 23\n'+
     		            'QUERY 2 2 2 4 4 4\n'+
     		            'QUERY 1 1 1 3 3 3\n' +
     					'2 4\n'+
     					'UPDATE 2 2 2 1\n'+
     					'QUERY 1 1 1 1 1 1\n'+
     					'QUERY 1 1 1 2 2 2\n'+
     					'QUERY 2 2 2 2 2 2';
     		var valorEsperado = '4\n4\n27\n0\n1\n1\n';
		    var lectorPruebas = new sumatoriacubo.LectorPruebas(datos);		   
		    expect(lectorPruebas.procesarPruebas().estado).toBe('EXITO');
		    expect(lectorPruebas.procesarPruebas().datos).toBe(valorEsperado);
		});
		
	});
});

})(window.sumatoriacubo || (window.sumatoriacubo = {}));