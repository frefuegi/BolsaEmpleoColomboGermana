Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

var myData;
var selectionModel;
var selectedRecords;
var fechaIngreso;
var fechaSalida;
var cargo;
var nombreEmpresa;
var logros;
var idEstudiantePrincipal;

Ext.onReady(function() {
    Ext.QuickTips.init();

    // sample static data for the store
    /*var myData = [
        ['02/02/2012','02/02/2013','Asistente','ICFES','Experiencia Administrativa'],
        ['11/11/2007','11/11/2009','Diseñador','PrismaCrea','Experiencia en diseño'],
		['04/03/2013','04/12/2013','Tecnico','Tecnicentro','Experiencia Tecnica']
    ];*/
	/*var myData = new Ext.data.Store({
			model: 'experiencia',
			proxy: {
				type: 'ajax',
				url: 'https://localhost/conexion.php',
				reader: {
					type: 'json'
				}
			}
		}); */
		var records = [];

	//create extjs store with empty data
	myData  = Ext.create('Ext.data.Store',{
		fields : ['idExperiencia', 'idEstudiante','FechaIngreso','FechaSalida','Cargo','NombreEmpresa','Logros'],
		data: records,
		paging : false
	});

	Ext.Ajax.request({
		url : 'https://bolsaempleocolombo.000webhostapp.com/Services/Experiencia/seleccionExperiencia.php',
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
console.log(idEstudiantePrincipal)
console.log(res[e].fechaIngreso+';'+res[e].fechaSalida);
                                       records.push({
											idExperiencia: res[e].idExperiencia,
											idEstudiante: res[e].idEstudiante,
											FechaIngreso:res[e].fechaIngreso,
											FechaSalida:res[e].fechaSalida,
											Cargo:res[e].cargo,
											NombreEmpresa:res[e].nombreEmpresa,
									        Logros:res[e].logros
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
            text     : 'Fecha Ingreso', // Two line header! Test header height synchronization!
            sortable : true,
            renderer : Ext.util.Format.dateRenderer('d/m/Y'),
            dataIndex: 'FechaIngreso'
        },{
            text     : 'Fecha Salida', // Two line header! Test header height synchronization!
            sortable : true,
            renderer : Ext.util.Format.dateRenderer('d/m/Y'),
            dataIndex: 'FechaSalida'
        },{
            text     : 'Cargo',
            width    : 97,
            sortable : true,
            dataIndex: 'Cargo'
        },{
            text     : 'Nombre Empresa',
            width    : 200,
            sortable : true,/*
            renderer : change,*/
            dataIndex: 'NombreEmpresa'
        },{
            text     : 'Logros',
            width    : 200,
            sortable : true,/*
            renderer : change,*/
            dataIndex: 'Logros'
        }],
		fbar  : [{
            text: 'Nuevo',
            handler: function() {
                nuevoExperiencia.show();
				} 
			},{
            text: 'Editar',
            handler: function() {
                
				selectionModel = grid.getSelectionModel();
				selectedRecords = selectionModel.getSelection();
				
				if(selectedRecords.length>0){
					fechaIngreso=selectedRecords[0].get('FechaIngreso');
					fechaSalida=selectedRecords[0].get('FechaSalida');
					cargo=selectedRecords[0].get('Cargo');
					nombreEmpresa=selectedRecords[0].get('NombreEmpresa');
					logros=selectedRecords[0].get('Logros');
					console.log('Edicion:'+fechaIngreso,fechaSalida,cargo,nombreEmpresa,logros);
					var editarExperiencia= Ext.create('Ext.window.Window', {
											closeAction: 'hide',
											title: 'Editar Experiencia',

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
												xtype: 'datefield',
												fieldLabel: 'Fecha de Ingreso',
												name: 'FechaIngreso',
												value: fechaIngreso
											},{
												xtype: 'datefield',
												fieldLabel: 'Fecha de Salida',
												name: 'FechaSalida',
												value: fechaSalida	
											}, {
												xtype: 'textfield',
												fieldLabel: 'Cargo',
												name: 'Cargo',
												value: cargo
											},{
												xtype: 'textfield',
												fieldLabel: 'Nombre de Empresa',
												name: 'NombreEmpresa',
												value: nombreEmpresa
											},{
												xtype: 'textfield',
												fieldLabel: 'Logros',
												name: 'Logros',
												value: logros
											}
											],
											buttons: [{
												text: 'Editar',
												type: 'submit',
												handler: function() {
													var idExperiencia2=selectedRecords[0].get('idExperiencia');
													var fi=editarExperiencia.down('[name=FechaIngreso]').getValue();
													var fif=Ext.Date.format(fi,'Y-m-d')
													var fs=editarExperiencia.down('[name=FechaSalida]').getValue();
													var fsf=Ext.Date.format(fs,'Y-m-d')
													var c=editarExperiencia.down('[name=Cargo]').getValue();
													var ne=editarExperiencia.down('[name=NombreEmpresa]').getValue();
													var l=editarExperiencia.down('[name=Logros]').getValue();
													console.log(idEstudiantePrincipal,idExperiencia2,fi,fs,c,ne,l);
													selectedRecords[0].set('FechaIngreso',fi);
													selectedRecords[0].set('FechaSalida',fs);
													selectedRecords[0].set('Cargo',c);
													selectedRecords[0].set('NombreEmpresa',ne);
													selectedRecords[0].set('Logros',l);
													
													var conn = new Ext.data.Connection();
														conn.request({
															method: 'POST',
															url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Experiencia/actualizarExperiencia.php',
															params: {
																idEstudiante: idEstudiantePrincipal,
																idExperiencia: idExperiencia2,
																FechaIngreso:fif,
																FechaSalida:fsf,
																Cargo:c,
																NombreEmpresa:ne,
																Logros:l
															},
															success: function(responseObject) { alert(responseObject.responseText); },
															failure: function() { alert("Failed!"); }
														});
													editarExperiencia.hide();
													editarExperiencia.el.dom.reset();
													selectionModel = null;
													selectedRecords = null;
												}
											}, {
												text: 'Cancelar',
												handler: function() {
													editarExperiencia.hide();
													selectionModel = null;
													selectedRecords = null;
												}
											}]
										});
					editarExperiencia.show();
				} else {
					alert('No ha seleccionado un registro para modificar');
				}
				//console.log(selectedRecords[0].get('FechaIngreso'));
				
				//editarExperiencia.show();
				} 
			},{
            text: 'Eliminar',
            handler: function() {
				     selectionModel = grid.getSelectionModel();
					 selectedRecords = selectionModel.getSelection();
					 if(selectedRecords.length>0){
						 var idExperiencia1=selectedRecords[0].get('idExperiencia');
						 
						 var conn = new Ext.data.Connection();
								conn.request({
									method: 'POST',
									url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Experiencia/eliminacionUnoExperiencia.php',
									params: {
										idEstudiante: idEstudiantePrincipal,
										idExperiencia: idExperiencia1
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
                myData.removeAll();
				//restaurants.add(newRec);
				selectionModel = grid.getSelectionModel();
				selectedRecords = selectionModel.getSelection();
				var conn = new Ext.data.Connection();
						conn.request({
							method: 'POST',
							url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Experiencia/eliminacionExperiencia.php',
							params: {
								idEstudiante: idEstudiantePrincipal
							},
							success: function(responseObject) { alert(responseObject.responseText); },
							failure: function() { alert("Failed!"); }
						});
					
				} 
			}
			],
        selModel: {
            selType: 'cellmodel'
        },
        height: 350,
        width: 600,
        title: 'Ejemplo Carga de Datos Experiencia',
        renderTo: 'grid-example',
        viewConfig: {
            stripeRows: true
        },
        plugins: [cellEditing]
    });
});

 var nuevoExperiencia= Ext.create('Ext.window.Window', {
        closeAction: 'hide',
        title: 'Agregar Nueva Experiencia',

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
            xtype: 'datefield',
            fieldLabel: 'Fecha de Ingreso',
            name: 'FechaIngreso'
        },{
            xtype: 'datefield',
            fieldLabel: 'Fecha de Salida',
            name: 'FechaSalida'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Cargo',
            name: 'Cargo'
        },{
            xtype: 'textfield',
            fieldLabel: 'Nombre de Empresa',
            name: 'NombreEmpresa'
        },{
            xtype: 'textfield',
            fieldLabel: 'Logros',
            name: 'Logros'
        }
		],
        buttons: [{
            text: 'Agregar',
            type: 'submit',
            handler: function() {
                
				var fi=nuevoExperiencia.down('[name=FechaIngreso]').getValue();
				var fif=Ext.Date.format(fi,'Y-m-d')
				var fs=nuevoExperiencia.down('[name=FechaSalida]').getValue();
				var fsf=Ext.Date.format(fs,'Y-m-d')
				var c=nuevoExperiencia.down('[name=Cargo]').getValue();
				var ne=nuevoExperiencia.down('[name=NombreEmpresa]').getValue();
				var l=nuevoExperiencia.down('[name=Logros]').getValue();
				console.log(idEstudiantePrincipal,fi,fs,c,ne,l);
				
													
				var conn = new Ext.data.Connection();
					conn.request({
						method: 'POST',
						url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Experiencia/insertarExperiencia.php',
						params: {
							idEstudiante: idEstudiantePrincipal,
							FechaIngreso:fif,
							FechaSalida:fsf,
							Cargo:c,
							NombreEmpresa:ne,
							Logros:l
							},
						success: function(responseObject) { alert(responseObject.responseText); },
						failure: function() { alert("Failed!"); }
						});
                myData.add({FechaIngreso: nuevoExperiencia.down('[name=FechaIngreso]').getValue(),FechaSalida: nuevoExperiencia.down('[name=FechaSalida]').getValue(), Cargo: nuevoExperiencia.down('[name=Cargo]').getValue(), NombreEmpresa: nuevoExperiencia.down('[name=NombreEmpresa]').getValue(), Logros: nuevoExperiencia.down('[name=Logros]').getValue()});
                nuevoExperiencia.hide();
                nuevoExperiencia.el.dom.reset();
            }
        }, {
            text: 'Cancelar',
            handler: function() {
                nuevoExperiencia.hide();
            }
        }]
    });