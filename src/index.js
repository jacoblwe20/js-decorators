/*
 * JS Decorator 
 * ==============================
 * Using function mutation.. warning this just is an experiment.
 *
 * Author : Jacob Lowe < jacoblowe.me >
 *
 */


// this will break apart a function
var pattern = /function(.*)\((.*)\)\s?\{(.|[\s\S]*)\}/,
	support = true;

if ( function(){}.toString() === '[function]' ) {
	console.warn('Your browser cannot support Decorators');
	support = false;
} 


function Decorate( primary ){
	var args = Array.prototype.slice.call( arguments, 0 );	
	if ( typeof primary === 'function' ) {
		this.primary = this.parseFunction( primary );
	}

	this.predecor = [];

	args.shift();
	args.forEach( function ( fn ) {
		if ( typeof fn === 'function' ){
			this.predecor.push( this.parseFunction( fn ) );
		}
	}, this )

	return new Function ( 
		this.compileFunction( 
			this.primary,
			this.predecor
		) 
	);	 
}

Decorate.prototype.parseFunction = function ( fn ) {
	fn = fn.toString(); 
	var results = fn.match( pattern );

	results.shift();
	return results;
};

Decorate.prototype.compileFunction = function ( primary, predecor ) {
	var fn = 'return ( function ' + 
			primary[ 0 ] +
			'(' +
			primary[ 1 ] +
			' ) { ';

	predecor.forEach( function ( _fn ) {
		fn += ' ' + _fn[ 2 ] + ' ';
	}, this );

	fn += primary[ 2 ] +
		' }).apply( this, arguments )';

	return fn;
};

if ( module ) module.exports = Decorate;

