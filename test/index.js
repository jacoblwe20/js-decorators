var Decorate = require( '../src/index.js' ),
	assert = require( 'assert' );


describe ( 'Decorate', function ( ) {

	function x ( ) { }
	function y ( o, p ) { return o + p; }

	it ( 'should be a function', function ( ) {
		assert.equal( 'function' , typeof Decorate );
	})


	describe ( '::parseFunction', function ( ) {

		var parseFunction = Decorate.prototype.parseFunction;

		it ( 'should be a function', function ( ) {
			assert.equal( 'function', typeof parseFunction );
		});

		it ( 'should return an array', function ( ) {
			assert.equal( true, Array.isArray( parseFunction( y ) ) );
		});

		it ( 'should return an array with three items', function ( ) {
			assert.equal( 3, parseFunction( y ).length );
		});

		it ( 'should return the constructor name if ' + 
			'given in the first item in the array', function ( ) {
				var result = parseFunction( y )[ 0 ].trim( );
				assert.equal( 'y',  result );
				assert.equal( 'string',  typeof result );
			}
		);

		it ( 'should return the arguments, given to ' + 
			'the function, in a string, ' + 
			'in the second item in the array', function ( ) {
				var result = parseFunction( y )[ 1 ].trim( );
				assert.equal( 'o, p', result );
				assert.equal( 'string',  typeof result );
			}
		);

		it ( 'should return the content of the function, in a string, ' + 
			'in the third item in the array', function ( ) {
				var result = parseFunction( y )[ 2 ].trim( );
				assert.equal( 'return o + p;', result );
				assert.equal( 'string',  typeof result );
			}
		);

	})
})