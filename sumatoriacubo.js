
(function(sumatoriacubo) {
var sumatoriacubo = sumatoriacubo || {};

/**
 * Funcion que es llamada por el boton que realiza el calculo.
 */
sumatoriacubo.procesar = function()
{
	document.getElementById('MensajeResultado').innerHTML = '';	
	var comandos = document.getElementById('Comandos').value.trim();
	var lectorPruebas = new sumatoriacubo.LectorPruebas(comandos);
	var resultado = lectorPruebas.procesarPruebas();
	if( resultado.estado === 'EXITO' )
	{
		document.getElementById('Resultado').value = resultado.datos;
	}
	else
	{
		var mensaje;
		if(resultado.mensajeAdicional)
		{
			mensaje = resultado.mensajeAdicional + ' ' + resultado.mensaje;
		}
		else
		{
			mensaje =  resultado.mensaje;
		}
		document.getElementById('MensajeResultado').innerHTML = mensaje;
		document.getElementById('Resultado').value = '';
	}
};

/**
 * Clase que procesa las pruebas.
 * @param comandos Texto con los comandos a procesar.
 */
sumatoriacubo.LectorPruebas = function(comandos)
{
	this.comandos = comandos;
};

/**
 * Metodo que lee los datos y los procesa.
 * @return Regresa un objeto con la estructura {estado,mensaje,datos} se regresa:
 * - Regresa {estado:'ERROR_VALOR_INDEFENIDO',mensaje:'No se envia comandos'} Si el valor de los comandos es indefinido
 * - Regresa {estado:'ERROR_VALOR_NULO',mensaje:'El valor enviado es null'} Si el valor con los comandos es nulo
 * - Regresa {estado:'ERROR_COMANDOS_NO_STRING',mensaje:'El valor de los camandos no es un string [..]'} Si el valor no es un string
 * - Regresa {estado:'ERROR_NO_SE_ENVIA_COMANDOS',mensaje:'El valor enviado no tiene comandos'} Si no se envian comandos
 * - Regresa {estado:'NUMERO_PRUEBAS_INFERIOR_ESPERADO',mensaje:'Numero de pruebas inferior al esperado'} Si el numero de pruebas es inferior al indicado
 * - Regresa {estado:'NUMERO_SENTENCIA_INFERIOR_ESPERADO',mensaje:'Numero de sentencias inferior al esperado'} Numero de sentencia es inferior al esperado
 * - Regresa {estado:'COMANDO_INVALIDO',mensaje:'Comando [...] invalido. Se espera UPDATE o QUERY'} Si uno de los es invalido 
 * - Regresa {estado:'EXITO',mensaje:'Operacion exitosa', datos:cadenaResultado} Si la operacion es exitosa
 */
sumatoriacubo.LectorPruebas.prototype.procesarPruebas = function()
{
	if(this.comandos === undefined)
	{
		return {estado:'ERROR_VALOR_INDEFENIDO',mensaje:'No se envia comandos'};		
	}
	
	if(this.comandos === null)
	{
		return {estado:'ERROR_VALOR_NULO',mensaje:'El valor enviado es null'};		
	}
	
	if (typeof this.comandos !== 'string') 
	{
		return {estado:'ERROR_COMANDOS_NO_STRING',mensaje:'El valor de los camandos no es un string [' + this.comandos + ']'};
	}
	
	if (this.comandos.trim().length === 0) 
	{
		return {estado:'ERROR_NO_SE_ENVIA_COMANDOS',mensaje:'El valor enviado no tiene comandos'};
	}
	
	var cadenaResultado = ''; 
	var lineaActual = 0;
	var comandosComoLineas = this.comandos.split('\n');
	
	var resultadosNumeroPruebas = this.leerNumeroPruebas( comandosComoLineas[lineaActual++] );
	if(resultadosNumeroPruebas.estado !== 'EXITO')
	{
		return resultadosNumeroPruebas;
	}
	
	var numeroPruebas = resultadosNumeroPruebas.datos;
	for(var i = 0; i < numeroPruebas ; i++)
	{
		if( lineaActual >= comandosComoLineas.length )
		{
			return {estado:'NUMERO_PRUEBAS_INFERIOR_ESPERADO',mensaje:'Numero de pruebas inferior al esperado'};
		}
		
		var resultadosLecturaDimensionMatrizSentencias = this.leerDimensionMatrizSentencias(comandosComoLineas[lineaActual++]);
		if(resultadosLecturaDimensionMatrizSentencias.estado !== 'EXITO')
		{
			return resultadosLecturaDimensionMatrizSentencias;
		}
		
		var dimensionMatriz = resultadosLecturaDimensionMatrizSentencias.datos.dimensionMatriz;
		var numeroSentencias = resultadosLecturaDimensionMatrizSentencias.datos.numeroSentencias;		
		var matriz = new Map();
		for(var j = 0; j < numeroSentencias ; j++)
		{
			if(lineaActual >= comandosComoLineas.length)
			{
				return {estado:'NUMERO_SENTENCIA_INFERIOR_ESPERADO',mensaje:'Numero de sentencias inferior al esperado'};
			}
			
			var comando = comandosComoLineas[lineaActual++].trim();
			if( comando.substring(0,6) === 'UPDATE' )
			{
				var resultadoUpdate = this.ejecutarUpdate(comando,dimensionMatriz,matriz);
				if(resultadoUpdate.estado !== 'EXITO')
				{
					return resultadoUpdate;
				}
			}
			else if( comando.substring(0,5) === 'QUERY' )
			{
				var resultadoQuery =  this.ejecutarQuery(comando,dimensionMatriz,matriz);
				if(resultadoQuery.estado !== 'EXITO')
				{
					return resultadoQuery;
				}
				cadenaResultado += resultadoQuery.datos + '\n';
			}
			else
			{
				return {estado:'COMANDO_INVALIDO',mensaje:'Comando ['+ comando +'] invalido. Se espera UPDATE o QUERY'};
			}
		}
	}
	
	return {estado:'EXITO',mensaje:'Operacion exitosa', datos:cadenaResultado};
};

/**
 * Metodo que lee el numero de pruebas de una cadena de texto.
 * @param comando Cadena con el numero de pruebas
 * @return Regresa un objeto con el resultado de la prueba. El objeto tiene la estructura {estado,mensaje,datos}.
 * Si el valor no es numerico regresa un objeto con la estructura regresada por la funcion sumatoriacubo.stringToEntero,
 * Si el valor no esta en el rango entre 1 y 50 regresa en el estado el valor 'ERROR_RANGO_INVALIDO'
 */
sumatoriacubo.LectorPruebas.prototype.leerNumeroPruebas = function(comando)
{
	var resultado = sumatoriacubo.stringToEntero(comando);
	if( resultado.estado === 'EXITO' )
	{
		if ( resultado.datos < 1 || resultado.datos > 50 )
		{
			return {estado:'ERROR_RANGO_INVALIDO',mensaje:'El numero de pruebas no esta entre 1 y 50.'};
		}		
		return resultado;
	}
	else
	{
		resultado.mensajeAdicional = 'El numero de pruebas no es un numero entero valido.';
		return resultado;
	}	
};

/**
 * Lee la dimension de la matriz y el numero de sentencias de la prueba.
 * @param comando Cadena con el texto
 * @return Regresa un objeto con la estructura {estado,mensaje, datos:{dimensionMatriz,numeroSentencias}}.
 * - Si alguno de los valores no es numerico regresa un objeto con la estructura que se indica del metodo sumatoriacubo.stringToEntero
 * - Si la cadena enviada a la funcion no contiene dos valores, entonces se regresa estado = 'ERROR_DIMENSION_MATRIZ_SENTENCIA'
 * - Si la dimension de la matriz no esta en el rango entre 1 y 100 regresa estado = 'ERROR_RANGO_INVALIDO'
 * - Si el numero de sentencias no esta en el rango entre 1 y 1000 regresa estado =  'ERROR_RANGO_INVALIDO'
 * - Si no se define valor se regresa estado = 'ERROR_VALOR_INDEFENIDO'
 * - Si el valor es nulo regresa estado = 'ERROR_VALOR_NULO'
 * - Si el valor no es string regresa estado = 'ERROR_VALOR_NO_STRING'
 */
sumatoriacubo.LectorPruebas.prototype.leerDimensionMatrizSentencias = function(comando)
{
	if(comando === undefined)
	{
		return {estado:'ERROR_VALOR_INDEFENIDO',mensaje:'Valor indefinido'};
	}
	if(comando === null)
	{
		return {estado:'ERROR_VALOR_NULO',mensaje:'Valor indefinido'};
	}
	if (typeof comando !== 'string') 
	{
		return { estado:'ERROR_VALOR_NO_STRING',mensaje:'El valor ingresado no es un string'};
	}	
	
	var dimesionMatrizSentencias = comando.trim().split(' ');
	if( dimesionMatrizSentencias.length != 2 )
	{
		return {estado:'ERROR_DIMENSION_MATRIZ_SENTENCIA',mensaje:'El valor [' + comando +'] no contiene un valor valido con la dimension de la matriz y el numero de sentencias.'};
	}
	
	// Procesar el valor con la dimension de la matriz
	var resultadoDimensionMatriz = sumatoriacubo.stringToEntero( dimesionMatrizSentencias[0] );
	if( resultadoDimensionMatriz.estado === 'EXITO' )
	{
		if ( resultadoDimensionMatriz.datos < 1 || resultadoDimensionMatriz.datos > 100 )
		{
			return {estado:'ERROR_RANGO_INVALIDO',mensaje:'La dimension de la matriz no esta entre 1 y 100.'};
		}
	}
	else
	{
		resultadoDimensionMatriz.mensajeAdicional = 'La dimension de la matriz no es un numero entero valido.';
		return resultadoDimensionMatriz;
	}
	
	// Procesar el valor con el numero de sentencias
	var resultadoNumeroSentencias =  sumatoriacubo.stringToEntero( dimesionMatrizSentencias[1] );
	if( resultadoNumeroSentencias.estado === 'EXITO' )
	{
		if ( resultadoNumeroSentencias.datos < 1 || resultadoNumeroSentencias.datos > 1000 )
		{
			return {estado:'ERROR_RANGO_INVALIDO',mensaje:'El numero de sentencias no esta entre 1 y 1000.'};
		}
	}
	else
	{
		resultadoNumeroSentencias.mensajeAdicional = 'El numero de sentencias no es un numero entero valido.';
		return resultadoNumeroSentencias;
	}	
	
	// Regresar los datos si estos son validos
	return {estado:'EXITO',mensaje:'Operacion exitosa', datos:{dimensionMatriz:resultadoDimensionMatriz.datos,numeroSentencias:resultadoNumeroSentencias.datos}}
};

/**
 * Ejecuta una setencia UPDATE como es especificada en https://www.hackerrank.com/challenges/cube-summation
 * @param comando Comando UPDATE a ejecutar
 * @param dimensionMatriz Dimension de la matriz
 * @param matriz Matriz en la que se almacenan los datos.
 * @return Regresa un objeto de la forma {estado,mensaje} donde
 * - Regresa {estado:'ERROR_VALOR_INDEFENIDO',mensaje:'Valor indefinido'} si el valor del comando es undefined
 * - Regresa {estado:'ERROR_VALOR_NULO',mensaje:'Valor indefinido'} Si el valor del comando es null
 * - Regresa {estado:'ERROR_VALOR_NO_STRING',mensaje:'El valor ingresado no es un string'} Si el valor no es string
 * - Regresa {estado:'ERROR_NO_SE_ENVIA_COMANDO',mensaje:'El valor enviado no tiene comando'} Si el comando tiene una cadena vacia
 * - Regresa {estado:'ERROR_COMANDO_UPDATE_INVALIDO',mensaje:'El comando UPDATE debe ser de la forma UPDATE x y z W pero se envia:[ ...]'} Si el comando tiene una sintaxis invalida
 * - Si un de los valores de las coordenadas o el valor no es numerico entonces regresa el valor de la funcion sumatoriacubo.stringToEntero
 */
sumatoriacubo.LectorPruebas.prototype.ejecutarUpdate = function(comando,dimensionMatriz,matriz)
{
	if(comando === undefined)
	{
		return {estado:'ERROR_VALOR_INDEFENIDO',mensaje:'Valor indefinido'};
	}
	
	if(comando === null)
	{
		return {estado:'ERROR_VALOR_NULO',mensaje:'Valor indefinido'};
	}
	
	if (typeof comando !== 'string') 
	{
		return {estado:'ERROR_VALOR_NO_STRING',mensaje:'El valor ingresado no es un string'};
	}
	
	if (comando.trim().length === 0) 
	{
		return {estado:'ERROR_NO_SE_ENVIA_COMANDO',mensaje:'El valor enviado no tiene comando'};
	}
		
	var tokens = comando.split(' ');
	if(tokens.length != 5)
	{
		return {estado:'ERROR_COMANDO_UPDATE_INVALIDO',mensaje:'El comando UPDATE debe ser de la forma UPDATE x y z W pero se envia:[' + comando + ']'};
	}
	
	var x = sumatoriacubo.stringToEntero(tokens[1]);
	var resultadoValidacionX = this.validarEntero(x,'x',1,dimensionMatriz,comando)
	if(resultadoValidacionX)
	{
		return resultadoValidacionX;
	}
	
	var y = sumatoriacubo.stringToEntero(tokens[2]);
	var resultadoValidacionY = this.validarEntero(y,'y',1,dimensionMatriz,comando)
	if(resultadoValidacionY)
	{
		return resultadoValidacionY;
	}
	
	var z = sumatoriacubo.stringToEntero(tokens[3]);
	var resultadoValidacionZ = this.validarEntero(z,'z',1,dimensionMatriz,comando)
	if(resultadoValidacionZ)
	{
		return resultadoValidacionZ;
	}
	
	var valor = sumatoriacubo.stringToEntero( tokens[4] );
	var resultadoValidacionValor = this.validarEntero(valor,'W',-1000000000,1000000000,comando)
	if(resultadoValidacionValor)
	{
		return resultadoValidacionValor;
	}	
	
	matriz.set(x.datos + '|' + y.datos + '|' + z.datos, valor.datos );
	
	return {estado:'EXITO',mensaje:'Operacion exitosa'};
};

/**
 * Ejecuta una sentencia QUERY como es especificada en https://www.hackerrank.com/challenges/cube-summation
 * @param comando Cadena con la sentencia QUERY
 * @param dimensionMatriz Dimension de la matriz con los datos.
 * @param matriz Corresponde a un Map donde la llave es una cadena de la forma x|y|z.
 * @return Regresa un objeto de la forma {estado,mensaje,datos} donde 
 * - Regresa {estado:'ERROR_VALOR_INDEFENIDO',mensaje:'Valor indefinido'} si se envia indefinido como comando
 * - Regresa {estado:'ERROR_VALOR_NULO',mensaje:'Valor indefinido'} Si envia un valor nulo
 * - Regresa {estado:'ERROR_VALOR_NO_STRING',mensaje:'El valor ingresado no es un string'} Si el valor no es string
 * - Regresa {estado:'ERROR_NO_SE_ENVIA_COMANDO',mensaje:'El valor enviado no tiene comando'} Si no se envia comando
 * - Regresa {estado:'ERROR_COMANDO_QUERY_INVALIDO',mensaje:'El comando QUERY debe ser de la forma UPDATE x1 y1 z1 x2 y2 z2 pero se envia:[' + comando + ']'} si el comando no tiene sintaxis valida
 * - Regresa {estado:'ERROR_X1_MAYOR_X2',mensaje:'El valor del x1 es mayor a x2 en la sentencia ' + comando} si x1 > x2
 * - Regresa {estado:'ERROR_Y1_MAYOR_Y2',mensaje:'El valor del y1 es mayor a y2 en la sentencia ' + comando} Si y1 > y2
 * - Regresa {estado:'ERROR_Z1_MAYOR_Z2',mensaje:'El valor del z1 es mayor a z2 en la sentencia ' + comando} Si z1 > z2
 * - Regresa {estado:'EXITO',datos:suma} Si se ejecuta correctamente el comando
 */
sumatoriacubo.LectorPruebas.prototype.ejecutarQuery = function(comando,dimensionMatriz,matriz)
{
	if(comando === undefined)
	{
		return {estado:'ERROR_VALOR_INDEFENIDO',mensaje:'Valor indefinido'};
	}
	
	if(comando === null)
	{
		return {estado:'ERROR_VALOR_NULO',mensaje:'Valor indefinido'};
	}
	
	if (typeof comando !== 'string') 
	{
		return {estado:'ERROR_VALOR_NO_STRING',mensaje:'El valor ingresado no es un string'};
	}
	
	if (comando.trim().length === 0) 
	{
		return {estado:'ERROR_NO_SE_ENVIA_COMANDO',mensaje:'El valor enviado no tiene comando'};
	}
	
	var tokens = comando.split(' ');
	if(tokens.length != 7 )
	{
		return {estado:'ERROR_COMANDO_QUERY_INVALIDO',mensaje:'El comando QUERY debe ser de la forma UPDATE x1 y1 z1 x2 y2 z2 pero se envia:[' + comando + ']'};
	}
	
	var resultadox1 = sumatoriacubo.stringToEntero(tokens[1]);
	var resultadoValidacionX1 = this.validarEntero(resultadox1,'x1',1,dimensionMatriz,comando);
	if(resultadoValidacionX1)
	{
		return resultadoValidacionX1;
	}
	
	var resultadoy1 = sumatoriacubo.stringToEntero(tokens[2]);
	var resultadoValidacionY1 = this.validarEntero(resultadoy1,'y1',1,dimensionMatriz,comando);
	if(resultadoValidacionY1)
	{
		return resultadoValidacionY1;
	}
	
	var resultadoz1 = sumatoriacubo.stringToEntero(tokens[3]);
	var resultadoValidacionZ1 = this.validarEntero(resultadoz1,'z1',1,dimensionMatriz,comando);
	if(resultadoValidacionZ1)
	{
		return resultadoValidacionZ1;
	}
	
	var resultadox2 = sumatoriacubo.stringToEntero(tokens[4]);
	var resultadoValidacionX2 = this.validarEntero(resultadox2,'x2',1,dimensionMatriz,comando);
	if(resultadoValidacionX2)
	{
		return resultadoValidacionX2;
	}	
	
	var resultadoy2 = sumatoriacubo.stringToEntero(tokens[5]);
	var resultadoValidacionY2 = this.validarEntero(resultadoy2,'y2',1,dimensionMatriz,comando);
	if(resultadoValidacionY2)
	{
		return resultadoValidacionY2;
	}
	
	var resultadoz2 = sumatoriacubo.stringToEntero(tokens[6]);
	var resultadoValidacionZ2 = this.validarEntero(resultadoz2,'z2',1,dimensionMatriz,comando);
	if(resultadoValidacionZ2)
	{
		return resultadoValidacionZ2;
	}
	
	var x1 = resultadox1.datos;
	var y1 = resultadoy1.datos;
	var z1 = resultadoz1.datos;
	var x2 = resultadoz2.datos;
	var y2 = resultadoy2.datos;
	var z2 = resultadoz2.datos;
	
	if( x1 > x2 )
	{
		return {estado:'ERROR_X1_MAYOR_X2',mensaje:'El valor del x1 es mayor a x2 en la sentencia ' + comando};
	}
	
	if( y1 > y2 )
	{
		return {estado:'ERROR_Y1_MAYOR_Y2',mensaje:'El valor del y1 es mayor a y2 en la sentencia ' + comando};
	}
	
	if( z1 > z2 )
	{
		return {estado:'ERROR_Z1_MAYOR_Z2',mensaje:'El valor del z1 es mayor a z2 en la sentencia ' + comando};
	}
	
	var suma = 0;
	for (var [key, value] of matriz) 
	{
		var keyTokens = key.split('|');
		var x = parseInt(keyTokens[0]);
		var y = parseInt(keyTokens[1]);
		var z = parseInt(keyTokens[2]);
		
		if ( (x >= x1 && x <= x2) && (y >= y1 && y <= y2) && (z >= z1 && z <= z2) )
		{
			suma += value;
		}
	}
	
	return {estado:'EXITO',datos:suma};
}

/**
 * Valida si el resultado de convertir una cadena a un entero es exitosa y de ser asi valida
 * que el valor este en el rango indicado.
 * @param valor Resultado de llamar a la funcion sumatoriacubo.stringToEntero
 * @param nombre Nombre de la variable. Usado para enviar descipcion del error
 * @param minimo Valor minimo que puede tomar el valor
 * @param maximo Valor maximo que puede tomar el valor
 * @param comando Comando que contiene el valor. Se usa para la drescripcion del error
 */
sumatoriacubo.LectorPruebas.prototype.validarEntero = function(valor,nombre,minimo,maximo,comando)
{
	if( valor.estado === 'EXITO' )
	{
		if ( valor.datos < minimo || valor.datos > maximo )
		{
			return {estado:'ERROR_RANGO_INVALIDO',mensaje:'El valor ' + nombre +' no esta entre ' + minimo + ' y ' + maximo + ' en la sentencia [' + comando + '].'};
		}
	}
	else
	{
		valor.mensajeAdicional = 'El valor ' + nombre +' no es un numero entero valido en la sentencia [' + comando + '].';
		return valor;
	}
};

/**
 * Convierte un string en un entero. Regresa un objeto con la estructura {estado,mensaje,datos}. Si la operacion es
 * exitosa regresa: {estado:'EXITO',mensaje:'Operacion exitosa',datos:valor} donde valor corresponde al valor convertido.
 * En caso de fallar regresa lo siguiente:
 * - Si no se ingresa un valor : {estado:'ERROR_VALOR_INDEFENIDO',mensaje:'Valor indefinido'};
 * - Si se envia null: {estado:'ERROR_VALOR_NULO',mensaje:'Valor indefinido'};
 * - Si se envia un valor que no es un string: { estado:'ERROR_VALOR_NO_STRING',mensaje:'El valor ingresado no es un string'};
 * - Si se envia una cadena con valor que no corresponde a un string se regresa:
 *   {estado:'ERROR_VALOR_NO_ENTERO',mensaje:'Valor [' + numeroComoCadena + '] no es entero'} donde numeroComoCadena
 *   corresponde al valor enviado a la funcion.
 */
sumatoriacubo.stringToEntero = function(numeroComoCadena)
{
	if(numeroComoCadena === undefined)
	{
		return {estado:'ERROR_VALOR_INDEFENIDO',mensaje:'Valor indefinido'};
	}
	if(numeroComoCadena === null)
	{
		return {estado:'ERROR_VALOR_NULO',mensaje:'Valor indefinido'};
	}
	if (typeof numeroComoCadena !== 'string') 
	{
		return { estado:'ERROR_VALOR_NO_STRING',mensaje:'El valor ingresado no es un string'};
	}
		
	var valor = parseInt(numeroComoCadena);
	if( isNaN(valor) )
	{
		return {estado:'ERROR_VALOR_NO_ENTERO',mensaje:'Valor [' + numeroComoCadena + '] no es entero'};
	}
	else if(new String(valor) != numeroComoCadena.trim() )
	{
		return {estado:'ERROR_VALOR_NO_ENTERO',mensaje:'Valor [' + numeroComoCadena + '] no es entero'};
	}
	else
	{
		return {estado:'EXITO',mensaje:'Operacion exitosa',datos:valor};
	}	
};

})(window.sumatoriacubo || (window.sumatoriacubo = {}));