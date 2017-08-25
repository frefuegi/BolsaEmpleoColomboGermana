Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

var myData;
var selectionModel;
var selectedRecords;
var nombre;
var direccion;
var telefono;
var celularContacto;
var nombreContacto;
var apellidoContacto;
var cargoContacto;
var descripcion;
var empresa;

Ext.onReady(function() {
    Ext.QuickTips.init();
	var records = [];

	//create extjs store with empty data
	myData  = Ext.create('Ext.data.Store',{
		fields : ['idEmpresa', 'nombre','direccion','telefono','celularContacto','nombreContacto','apellidoContacto','cargoContacto','descripcion'],
		data: records,
		paging : false
	});

	Ext.Ajax.request({
		url : 'https://bolsaempleocolombo.000webhostapp.com/Services/Empresa/seleccionEmpresa.php',
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
                                      empresa=res[e].idEmpresa;
                                       records.push({
											idEmpresa: res[e].idEmpresa,
											nombre: res[e].nombre,
											direccion:res[e].direccion,
											telefono:res[e].telefono,
											celularContacto:res[e].celularContacto,
											nombreContacto:res[e].nombreContacto,
											apellidoContacto:res[e].apellidoContacto,
											cargoContacto:res[e].cargoContacto,
											descripcion:res[e].descripcion,
											
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
            text     : 'Nombre<br>Empresa', // Two line header! Test header height synchronization!
            width    : 100,
			sortable : true,
            dataIndex: 'nombre'
        },{
            text     : 'Direccion',
            width    : 100,
            sortable : true,
            dataIndex: 'direccion'
        },{
            text     : 'Telefono',
            width    : 100,
            sortable : true,
            dataIndex: 'telefono'
        },{
            text     : 'Celular<br>Contacto', // Two line header! Test header height synchronization!
            width    : 100,
			sortable : true,
            dataIndex: 'celularContacto'
        },{
            text     : 'Nombre<br>Contacto',
            width    : 100,
            sortable : true,
            dataIndex: 'nombreContacto'
        },{
            text     : 'Apellido<br>Contacto',
            width    : 100,
            sortable : true,
            dataIndex: 'apellidoContacto'
        },{
            text     : 'Cargo<br>Contacto', // Two line header! Test header height synchronization!
	    width    : 100,
            sortable : true,
            dataIndex: 'celularContacto'
        },{
            text     : 'Descripcion',
            width    : 200,
            sortable : true,
            dataIndex: 'descripcion'
        }],
		fbar  : [{
            text: 'Nuevo',
            handler: function() {
                nuevaEmpresa.show();
				} 
			},{
            text: 'Editar',
            handler: function() {
                
				selectionModel = grid.getSelectionModel();
				selectedRecords = selectionModel.getSelection();
				
				if(selectedRecords.length>0){
					nombre=selectedRecords[0].get('nombre');
					direccion=selectedRecords[0].get('direccion');
					telefono=selectedRecords[0].get('telefono');
					celularContacto=selectedRecords[0].get('celularContacto');
					nombreContacto=selectedRecords[0].get('nombreContacto');
					apellidoContacto=selectedRecords[0].get('apellidoContacto');
					cargoContacto=selectedRecords[0].get('cargoContacto');
					descripcion=selectedRecords[0].get('descripcion');
					//console.log(fechaGrado,titulo,institucion);
					var editarEmpresa= Ext.create('Ext.window.Window', {
											closeAction: 'hide',
											title: 'Editar Empresa',

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
												fieldLabel: 'Nombre',
												name: 'nombre',
												value: nombre
											}, {
												xtype: 'textfield',
												fieldLabel: 'Direccion',
												name: 'direccion',
												value: direccion
											},{
												xtype: 'textfield',
												fieldLabel: 'Telefono',
												name: 'telefono',
												value: telefono
											},{
												xtype: 'textfield',
												fieldLabel: 'Celular de Contacto',
												name: 'celularContacto',
												value: celularContacto
											}, {
												xtype: 'textfield',
												fieldLabel: 'Nombre de Contacto',
												name: 'nombreContacto',
												value: nombreContacto
											},{
												xtype: 'textfield',
												fieldLabel: 'Apellido de Contacto',
												name: 'apellidoContacto',
												value: apellidoContacto
											}, {
												xtype: 'textfield',
												fieldLabel: 'Cargo de Contacto',
												name: 'cargoContacto',
												value: cargoContacto
											},{
												xtype: 'textfield',
												fieldLabel: 'Descripcion',
												name: 'descripcion',
												value: descripcion
											}
											],
											buttons: [{
												text: 'Editar',
												type: 'submit',
												handler: function() {
													var idEmpresa2=selectedRecords[0].get('idEmpresa');
													var n=editarEmpresa.down('[name=nombre]').getValue();
													var d=editarEmpresa.down('[name=direccion]').getValue();
													var t=editarEmpresa.down('[name=telefono]').getValue();
													var cc=editarEmpresa.down('[name=celularContacto]').getValue();
													var nc=editarEmpresa.down('[name=nombreContacto]').getValue();
													var ac=editarEmpresa.down('[name=apellidoContacto]').getValue();
													var cac=editarEmpresa.down('[name=cargoContacto]').getValue();
													var des=editarEmpresa.down('[name=descripcion]').getValue();
													
													console.log(idEmpresa2,n,d,t,cc,nc,ac,cac,des);
													selectedRecords[0].set('nombre',n);
													selectedRecords[0].set('direccion',d);
													selectedRecords[0].set('telefono',t);
													selectedRecords[0].set('celularContacto',cc);
													selectedRecords[0].set('nombreContacto',nc);
													selectedRecords[0].set('apellidoContacto',ac);
													selectedRecords[0].set('cargoContacto',cac);
													selectedRecords[0].set('descripcion',des);
													
													
													var conn = new Ext.data.Connection();
														conn.request({
															method: 'POST',
															url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Empresa/actualizarEmpresa.php',
															params: {
																idEmpresa: idEmpresa2,
																nombre: n,
																direccion:d,
																telefono:t,
																celularContacto:cc,
																nombreContacto: nc,
																apellidoContacto: ac,
																cargoContacto:cac,
																descripcion:des
															},
															success: function(responseObject) { alert(responseObject.responseText);console.log(responseObject.responseText);  },
															failure: function() { alert("Failed!"); }
														});
													editarEmpresa.hide();
													editarEmpresa.el.dom.reset();
													selectionModel = null;
													selectedRecords = null;
												}
											}, {
												text: 'Cancelar',
												handler: function() {
													editarEmpresa.hide();
													selectionModel = null;
													selectedRecords = null;
												}
											}]
										});
					editarEmpresa.show();
				} else {
					alert('No ha seleccionado un registro para modificar');
				}
				//console.log(selectedRecords[0].get('FechaGrado'));
				
				//editarEstudioBasico.show();
				} 
			},{
            text: 'Eliminar',
            handler: function() {
				     selectionModel = grid.getSelectionModel();
					 selectedRecords = selectionModel.getSelection();
					 if(selectedRecords.length>0){
						 var idEmpresa1=selectedRecords[0].get('idEmpresa');
						 
						 var conn = new Ext.data.Connection();
								conn.request({
									method: 'POST',
									url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Empresa/eliminacionUnaEmpresa.php',
									params: {
										idEmpresa: idEmpresa1
									},
									success: function(responseObject) { alert(responseObject.responseText);
},
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
                myData.removeAll();
				//restaurants.add(newRec);
				selectionModel = grid.getSelectionModel();
				selectedRecords = selectionModel.getSelection();
				var conn = new Ext.data.Connection();
						conn.request({
							method: 'POST',
							url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Empresa/eliminarEmpresas.php',
							params: {},
							success: function(responseObject) { alert(responseObject.responseText); },
							failure: function() { alert("Failed!"); }
						});
					
				} 
			}
			],
        selModel: {
            selType: 'cellmodel'
        },
        height: 550,
        width: 1000,
        title: 'Carga de Datos Empresas',
        renderTo: 'grid-example',
        viewConfig: {
            stripeRows: false
        },
        plugins: [cellEditing]
    });
});

 var nuevaEmpresa= Ext.create('Ext.window.Window', {
        closeAction: 'hide',
        title: 'Agregar Nueva Empresa',

        // Make the Window out of a <form> el so that the <button type="submit"> will invoke its handler upon CR
        autoEl: 'form',
        width: 400,
        bodyPadding: 5,
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        defaultFocus: '[name=name]',
        items: [{xtype: 'textfield',
				fieldLabel: 'Nombre',
				name: 'nombre',
				value: nombre
				}, 
				{
				xtype: 'textfield',
				fieldLabel: 'Direccion',
				name: 'direccion',
				value: direccion
				},{
				xtype: 'textfield',
				fieldLabel: 'Telefono',
				name: 'telefono',
				value: telefono
				},{
				xtype: 'textfield',
				fieldLabel: 'Celular de Contacto',
				name: 'celularContacto',
				value: celularContacto
				}, {
				xtype: 'textfield',
				fieldLabel: 'Nombre de Contacto',
				name: 'nombreContacto',
				value: nombreContacto
				},{
				xtype: 'textfield',
				fieldLabel: 'Apellido de Contacto',
				name: 'apellidoContacto',
				value: apellidoContacto
				}, {
				xtype: 'textfield',
				fieldLabel: 'Cargo de Contacto',
				name: 'cargoContacto',
				value: cargoContacto
				},{
				xtype: 'textfield',
				fieldLabel: 'Descripcion',
				name: 'descripcion',
				value: descripcion
				}
		],
        buttons: [{
            text: 'Agregar',
            type: 'submit',
            handler: function() {
                
				var n=nuevaEmpresa.down('[name=nombre]').getValue();
				var d=nuevaEmpresa.down('[name=direccion]').getValue();
				var t=nuevaEmpresa.down('[name=telefono]').getValue();
				var cc=nuevaEmpresa.down('[name=celularContacto]').getValue();
				var nc=nuevaEmpresa.down('[name=nombreContacto]').getValue();
				var ac=nuevaEmpresa.down('[name=apellidoContacto]').getValue();
				var cac=nuevaEmpresa.down('[name=cargoContacto]').getValue();
				var des=nuevaEmpresa.down('[name=descripcion]').getValue();
				console.log(n,d,t,cc,nc,ac,cac,des);
										
				var conn = new Ext.data.Connection();
					conn.request({
						method: 'POST',
						url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Empresa/insertarEmpresa.php',
						params: {
							nombre: n,
							direccion:d,
							telefono:t,
							celularContacto:cc,
							nombreContacto: nc,
							apellidoContacto: ac,
							cargoContacto:cac,
							descripcion:des
							},
						success: function(responseObject) { alert(responseObject.responseText); },
						failure: function() { alert("Failed!"); }
						});
                myData.add({nombre: nuevaEmpresa.down('[name=nombre]').getValue(), direccion: nuevaEmpresa.down('[name=direccion]').getValue(), telefono: nuevaEmpresa.down('[name=telefono]').getValue(),telefono: nuevaEmpresa.down('[name=telefono]').getValue(), celularContacto: nuevaEmpresa.down('[name=celularContacto]').getValue(), nombreContacto: nuevaEmpresa.down('[name=nombreContacto]').getValue(),apellidoContacto: nuevaEmpresa.down('[name=apellidoContacto]').getValue(), cargoContacto: nuevaEmpresa.down('[name=cargoContacto]').getValue(), descripcion: nuevaEmpresa.down('[name=descripcion]').getValue()});
                nuevaEmpresa.hide();
                nuevaEmpresa.el.dom.reset();
            }
        }, {
            text: 'Cancelar',
            handler: function() {
                nuevaEmpresa.hide();
            }
        }]
    });