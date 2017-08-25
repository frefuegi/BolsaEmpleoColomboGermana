Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

var myData;
var selectionModel;
var selectedRecords;
var nombreRef;
var telefonoRef;
var cargoRef;
var idRef;
var idEstudiantePrincipal;

Ext.onReady(function() {
    Ext.QuickTips.init();


		var records = [];

	//create extjs store with empty data
	myData  = Ext.create('Ext.data.Store',{
		fields : ['idRef', 'idEstudiante','nombreRef','telefonoRef','cargoRef'],
		data: records,
		paging : false
	});

	Ext.Ajax.request({
		url : 'https://bolsaempleocolombo.000webhostapp.com/Services/Referencia/seleccionReferencia.php',
		params : {
			max: 10
		},
		success : function(r){
			//create a json object from the response string
			var res = Ext.decode(r.responseText, true);
			
                        // if we have a valid json object, then process it
			if(res !== null &&  typeof (res) !==  'undefined'){
				// loop through the data
                                
                                for (var e=0;e<res.length;e++){
                                      idEstudiantePrincipal=res[e].idEstudiante;
                                      idRef=res[e].idRef;
                                       records.push({
											idRef: res[e].idRef,
											idEstudiante: res[e].idEstudiante,
											nombreRef:res[e].nombreRef,
											telefonoRef:res[e].telefonoRef,
											cargoRef:res[e].cargoRef
					})
                                }
				
				myData.loadData(records);
				
			}
		},
		failure : function(r){
			alert('Error');
		}
	});
	
    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });

    // create the Grid
    var grid = Ext.create('Ext.grid.Panel', {
        store: myData,
        columnLines: true,
        columns: [{
            text     : 'ID<br>Estudiante',
            width    : 97,
            sortable : true,
            dataIndex: 'idEstudiante'
        },{
            text     : 'Nombre<br>Referencia',
            width    : 180,
            sortable : true,
            dataIndex: 'nombreRef'
        },{
            text     : 'telefono<br>Referencia',
            width    : 120,
            sortable : true,
            dataIndex: 'telefonoRef'
        },{
            text     : 'cargo<br>Referencia',
            width    : 120,
            sortable : true,
            dataIndex: 'cargoRef'
        }],
		fbar  : [{
            text: 'Nuevo',
            handler: function() {
                nuevoEstudioBasico.show();
				} 
			},{
            text: 'Editar',
            handler: function() {
                
				selectionModel = grid.getSelectionModel();
				selectedRecords = selectionModel.getSelection();
				
				if(selectedRecords.length>0){
					var idRef1=selectedRecords[0].get('idRef');
					var idEstudiante1=selectedRecords[0].get('idEstudiante');
					var nombreRef1=selectedRecords[0].get('nombreRef');
					var telefonoRef1=selectedRecords[0].get('telefonoRef');
					var cargoRef1=selectedRecords[0].get('cargoRef');
					//console.log(nombreRef,telefonoRef,cargoRef);
					var editarEstudioBasico= Ext.create('Ext.window.Window', {
											closeAction: 'hide',
											title: 'Editar Referencia',

											// Make the Window out of a <form> el so that the <button type="submit"> will invoke its handler upon CR
											autoEl: 'form',
											width: 400,
											bodyPadding: 5,
											layout: 'anchor',
											defaults: {
												anchor: '100%'
											},
											defaultFocus: '[name=name]',
											items: [{
												xtype: 'textfield',
												fieldLabel: 'ID Estudiante',
												name: 'idEstudiante',
												value:idEstudiante1
											}, {
												xtype: 'textfield',
												fieldLabel: 'Nombre Referencia',
												name: 'nombreRef',
												value:nombreRef1
											}, {
												xtype: 'textfield',
												fieldLabel: 'telefono Referencia',
												name: 'telefonoRef',
												value:telefonoRef1
											},{
												xtype: 'textfield',
												fieldLabel: 'cargo Referencia',
												name: 'cargoRef',
												value:cargoRef1
											}
											],
											buttons: [{
												text: 'Editar',
												type: 'submit',
												handler: function() {
													var idRef2=selectedRecords[0].get('idRef');
													var ie=editarEstudioBasico.down('[name=idEstudiante]').getValue();
													var nr=editarEstudioBasico.down('[name=nombreRef]').getValue();
													var tr=editarEstudioBasico.down('[name=telefonoRef]').getValue();
													var cr=editarEstudioBasico.down('[name=cargoRef]').getValue();
													
													
													
													selectedRecords[0].set('idEstudiante',ie);
													selectedRecords[0].set('nombreRef',nr);
													selectedRecords[0].set('telefonoRef',tr);
													selectedRecords[0].set('cargoRef',cr);
													
													var conn = new Ext.data.Connection();
														conn.request({
															method: 'POST',
															url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Referencia/actualizarReferencia.php',
															params: {
																
																idRef:idRef2,
																idEstudiante:ie,
																nombreRef:nr,
																telefonoRef:tr,
																cargoRef:cr
															},
															success: function(responseObject) { alert(responseObject.responseText); },
															failure: function() { alert("failure"); }
														});
													editarEstudioBasico.hide();
													editarEstudioBasico.el.dom.reset();
													selectionModel = null;
													selectedRecords = null;
												}
											}, {
												text: 'Cancelar',
												handler: function() {
													editarEstudioBasico.hide();
													selectionModel = null;
													selectedRecords = null;
												}
											}]
										});
					editarEstudioBasico.show();
				} else {
					alert('No ha seleccionado un registro para modificar');
				}

				} 
			},{
            text: 'Eliminar',
            handler: function() {
				     selectionModel = grid.getSelectionModel();
					 selectedRecords = selectionModel.getSelection();
					 if(selectedRecords.length>0){
						 var idRef1=selectedRecords[0].get('idRef');
						 
						 var conn = new Ext.data.Connection();
								conn.request({
									method: 'POST',
									url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Referencia/eliminacionUnoReferencia.php',
									params: {
										idRef: idRef1
									},
									success: function(responseObject) { alert(responseObject.responseText); },
									failure: function() { alert("Failed!"); }
								});
								myData.remove(selectedRecords);
					 }else {
						alert('No ha seleccionado un registro para Eliminar');
					}
				} 
			},{
            text: 'Eliminar Todo',
            handler: function() {
				    
						 
						 var conn = new Ext.data.Connection();
								conn.request({
									method: 'POST',
									url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Referencia/eliminacionReferencia.php',
									params: {
										idEstudiante: idEstudiantePrincipal
									},
									
									success: function(responseObject) { alert(responseObject.responseText); },
									failure: function() { alert("Failed!"); }
								});
								myData.removeAll();
					 
					
				} 
			}
			],
        selModel: {
            selType: 'cellmodel'
        },
        height: 450,
        width: 650,
        title: 'Referencia Estudiante',
        renderTo: 'grid-example',
        viewConfig: {
            stripeRows: true
        },
        plugins: [cellEditing]
    });
});

 var nuevoEstudioBasico= Ext.create('Ext.window.Window', {
        closeAction: 'hide',
        title: 'Agregar Nueva Referencia',

        // Make the Window out of a <form> el so that the <button type="submit"> will invoke its handler upon CR
        autoEl: 'form',
        width: 400,
        bodyPadding: 5,
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        defaultFocus: '[name=name]',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'ID Estudiante',
            name: 'idEstudiante'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nombre Referencia',
            name: 'nombreRef'
        }, {
            xtype: 'textfield',
            fieldLabel: 'telefono Referencia',
            name: 'telefonoRef'
        },{
            xtype: 'textfield',
            fieldLabel: 'cargo Referencia',
            name: 'cargoRef'
        }
		],
        buttons: [{
            text: 'Agregar',
            type: 'submit',
            handler: function() {
                
				var ie=nuevoEstudioBasico.down('[name=idEstudiante]').getValue();
				var nr=nuevoEstudioBasico.down('[name=nombreRef]').getValue();
				var tr=nuevoEstudioBasico.down('[name=telefonoRef]').getValue();
				var cr=nuevoEstudioBasico.down('[name=cargoRef]').getValue();
				
										
				var conn = new Ext.data.Connection();
					conn.request({
						method: 'POST',
						url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Referencia/insertarReferencia.php',
						params: {
							
							idEstudiante:ie,
							nombreRef:nr,
							telefonoRef:tr,
							cargoRef:cr
							},
						success: function(responseObject) { alert(responseObject.responseText); },
						failure: function() { alert("Failed!"); }
						});
                myData.add({idEstudiante: nuevoEstudioBasico.down('[name=idEstudiante]').getValue(),nombreRef: nuevoEstudioBasico.down('[name=nombreRef]').getValue(), telefonoRef: nuevoEstudioBasico.down('[name=telefonoRef]').getValue(), cargoRef: nuevoEstudioBasico.down('[name=cargoRef]').getValue()});
                nuevoEstudioBasico.hide();
                nuevoEstudioBasico.el.dom.reset();
            }
        }, {
            text: 'Cancelar',
            handler: function() {
                nuevoEstudioBasico.hide();
            }
        }]
    });