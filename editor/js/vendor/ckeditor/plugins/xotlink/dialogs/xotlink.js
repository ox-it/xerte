/**
 * Copyright (c) 2014, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * The xertelink plugin dialog window definition.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

// Our dialog definition.
CKEDITOR.dialog.add( 'xotlinkDialog', function( editor ) {
	return {

		// Basic properties of the dialog window: title, minimum size.
		title: 'XOT Internal Page Link',
		minWidth: 300,
		minHeight: 100,

		// Dialog window content definition.
		contents: [
			{
				// Definition of the Basic Settings dialog tab (page).
				id: 'selectlink',

				// The tab content.
				elements: [
					{
						type: 'select',
						id: 'pagelink',
                        items: EDITOR.toolbox.getPageList(),

						// Called by the main setupContent method call on dialog initialization.
						setup: function( element ) {
                            var href=element.getAttribute("href");
                            var link=href.split(",");
							this.setValue( link[1] );
						},

						// Called by the main commitContent method call on dialog confirmation.
						commit: function( element ) {
							element.setAttribute( "href", "asfunction:_level0.engine.rootIcon.pageLink," + this.getValue() );
						}
					},
				]
			},
		],

		// Invoked when the dialog is loaded.
		onShow: function() {

			// Get the selection from the editor.
			var selection = editor.getSelection();

			// Get the element at the start of the selection.
			var element = selection.getStartElement();

			// Get the <a> element closest to the selection, if it exists.
			if ( element )
				element = element.getAscendant( 'a', true );

			// Create a new <abbr> element if it does not exist.
			if ( !element || element.getName() != 'a' ) {
				element = editor.document.createElement( 'a' );
                element.setHtml(selection.getSelectedText());
				// Flag the insertion mode for later use.
				this.insertMode = true;
			}
			else
				this.insertMode = false;

			// Store the reference to the <a> element in an internal property, for later use.
			this.element = element;

			// Invoke the setup methods of all dialog window elements, so they can load the element attributes.
			if ( !this.insertMode )
				this.setupContent( this.element );
		},

		// This method is invoked once a user clicks the OK button, confirming the dialog.
		onOk: function() {

			// The context of this function is the dialog object itself.
			// http://docs.ckeditor.com/#!/api/CKEDITOR.dialog
			var dialog = this;

			// Create a new <abbr> element.
			var a = this.element;

			// Invoke the commit methods of all dialog window elements, so the <a> element gets modified.
			this.commitContent( a );

			// Finally, if in insert mode, insert the element into the editor at the caret position.
			if ( this.insertMode )
				editor.insertElement( a );
		}
	};
});
