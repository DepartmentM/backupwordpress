jQuery( document ).ready( function( $ ) {

	if ( $( '.hmbkp_running' ).size() ) {
		hmbkpRedirectOnBackupComplete();
	}

	if ( $( '.hmbkp_estimated-size .calculate' ).size() ) {
		$.get( ajaxurl, { 'action' : 'hmbkp_calculate' },
		    function( data ) {
		    	$( '.hmbkp_estimated-size .calculate' ).fadeOut( function() {
		    		$( this ).empty().append( data );
		    	} ).fadeIn();
		    }
		);
	}
		
	$.get( ajaxurl, { 'action' : 'hmbkp_cron_test' },
	    function( data ) {
	    	if ( data != 1 ) {
		    	$( '.wrap > h2' ).after( data );
		    }
	    }
	);

	$( '.hmbkp-settings-toggle' ).click( function() {
		$( '#hmbkp-settings' ).toggle();
	} );

	$( '.hmbkp-show-help-tab' ).click( screenMeta.toggleEvent );
	
	if ( window.location.hash == '#hmbkp-settings' ){
		$( '#hmbkp-settings' ).show();		
	}
	

} );

function hmbkpRedirectOnBackupComplete() {

	img = jQuery( '<div>' ).append( jQuery( '.hmbkp_running a.add-new-h2[disabled]:first img' ).clone() ).remove().html();

	jQuery.get( ajaxurl, { 'action' : 'hmbkp_is_in_progress' },

		function( data ) {

			if ( data == 0 ) {

				location.reload( true );

			} else {

				setTimeout( 'hmbkpRedirectOnBackupComplete();', 5000 );

				jQuery( '.hmbkp_running a.add-new-h2[disabled]:first' ).html( img + data );

			}
		}
	);

}