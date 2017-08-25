Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

var myData;
var selectionModel;
var selectedRecords;
var nombrePrincipal;
var descripcion;
var fechaInicio;
var fechaFin;
var prioridad;
var idCarrera;
var salario;
var condiciones;
var idOferta;
var idEmpresa;

Ext.onReady(function() {
    Ext.QuickTips.init();

 
	var records = [];

	//create extjs store with empty data
	myData  = Ext.create('Ext.data.Store',{
		fields : ['idOferta', 'idEmpresa','nombrePrincipal','descripcion','fechaInicio','fechaFin', 'prioridad','idCarrera','salario','condiciones'],
		data: records,
		paging : false
	});

	Ext.Ajax.request({
		url : 'https://bolsaempleocolombo.000webhostapp.com/Services/Oferta/seleccionOferta.php',
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
                                      idOferta=res[e].idOferta;
                                      idEmpresa=res[e].idEmpresa;
                                       records.push({
											idOferta: res[e].idOferta,
											idEmpresa: res[e].idEmpresa,
											nombrePrincipal:res[e].nombrePrincipal,
											descripcion:res[e].descripcion,
											fechaInicio:res[e].FechaInicio,
											fechaFin: res[e].FechaFin,
											prioridad: res[e].prioridad,
											idCarrera:res[e].idCarrera,
											salario:res[e].salario,
											condiciones:res[e].condiciones
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
            text     : 'Empresa', 
            width    : 100,
            dataIndex: 'idEmpresa'
        },{
            text     : 'Nombre Principal',
            width    : 150,
            sortable : true,
            dataIndex: 'nombrePrincipal'
        },{
            text     : 'Descripcion',
            width    : 200,
            sortable : true,
            dataIndex: 'descripcion'
        },{
            text     : 'Fecha <br> Inicio', 
            renderer : Ext.util.Format.dateRenderer('d/m/Y'),
            dataIndex: 'fechaInicio'
        },{
            text     : 'Fecha <br> Fin', 
            renderer : Ext.util.Format.dateRenderer('d/m/Y'),
            dataIndex: 'fechaFin'
        },{
            text     : 'Prioridad',
            width    : 100,
            sortable : true,
            dataIndex: 'prioridad'
        },{
            text     : 'Carrera',
            width    : 100,
            sortable : true,
            dataIndex: 'idCarrera'
        },{
            text     : 'Salario',
            width    : 100,
            sortable : true,
            dataIndex: 'salario'
        },{
            text     : 'Condiciones',
            width    : 100,
            sortable : true,
            dataIndex: 'condiciones'
        }],
		fbar  : [{
            text: 'Nuevo',
            handler: function() {
                nuevaOferta.show();
				} 
			},{
            text: 'Editar',
            handler: function() {
                
				selectionModel = grid.getSelectionModel();
				selectedRecords = selectionModel.getSelection();
				
				if(selectedRecords.length>0){
					idEmpresa=selectedRecords[0].get('idEmpresa');
					nombrePrincipal=selectedRecords[0].get('nombrePrincipal');
					descripcion=selectedRecords[0].get('descripcion');
					fechaInicio=selectedRecords[0].get('fechaInicio');
					fechaFin=selectedRecords[0].get('fechaFin');
					prioridad=selectedRecords[0].get('prioridad');
					idCarrera=selectedRecords[0].get('idCarrera');
					salario=selectedRecords[0].get('salario');
					condiciones=selectedRecords[0].get('condiciones');
					//console.log(fechaGrado,titulo,institucion);
					var editarOferta= Ext.create('Ext.window.Window', {
											closeAction: 'hide',
											title: 'Editar Oferta',

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
												fieldLabel: 'Empresa',
												name: 'idEmpresa',
												value: idEmpresa
											},{
												xtype: 'textfield',
												fieldLabel: 'Nombre Principal',
												name: 'nombrePrincipal',
												value: nombrePrincipal
											},{
												xtype: 'textfield',
												fieldLabel: 'Descripcion',
												name: 'descripcion',
												value: descripcion
											}, {
												xtype: 'datefield',
												fieldLabel: 'Fecha Inicio',
												name: 'fechaInicio',
												value: fechaInicio
											}, {
												xtype: 'datefield',
												fieldLabel: 'Fecha Fin',
												name: 'fechaFin',
												value: fechaFin
											},{
												xtype: 'textfield',
												fieldLabel: 'Prioridad',
												name: 'prioridad',
												value: prioridad
											}, {
												xtype: 'textfield',
												fieldLabel: 'Carrera',
												name: 'idCarrera',
												value: idCarrera
											}, {
												xtype: 'textfield',
												fieldLabel: 'Salario',
												name: 'salario',
												value: salario
											},{
												xtype: 'textfield',
												fieldLabel: 'Condiciones',
												name: 'condiciones',
												value: condiciones
											}
											],
											buttons: [{
												text: 'Editar',
												type: 'submit',
												handler: function() {
													var idOferta2=selectedRecords[0].get('idOferta');
													var im=editarOferta.down('[name=idEmpresa]').getValue();
													var np=editarOferta.down('[name=nombrePrincipal]').getValue();
													var d=editarOferta.down('[name=descripcion]').getValue();
													var fi=editarOferta.down('[name=fechaInicio]').getValue();
													var fif=Ext.Date.format(fi,'Y-m-d');
													var ff=editarOferta.down('[name=fechaFin]').getValue();
													var fff=Ext.Date.format(ff,'Y-m-d');
													var p=editarOferta.down('[name=prioridad]').getValue();
													var ic=editarOferta.down('[name=idCarrera]').getValue();
													var s=editarOferta.down('[name=salario]').getValue();
													var c=editarOferta.down('[name=condiciones]').getValue();
													
													selectedRecords[0].set('idOferta',idOferta2);
													selectedRecords[0].set('idEmpresa',im);
													selectedRecords[0].set('nombrePrincipal',np);
													selectedRecords[0].set('descripcion',d);
													selectedRecords[0].set('fechaInicio',fif);
													selectedRecords[0].set('fechaFin',fff);
													selectedRecords[0].set('prioridad',p);
													selectedRecords[0].set('idCarrera',ic);
													selectedRecords[0].set('salario',s);
													selectedRecords[0].set('condiciones',c);
													
													
													var conn = new Ext.data.Connection();
														conn.request({
															method: 'POST',
															url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Oferta/actualizarOferta.php',
															params: {
																idOferta: idOferta2,
																idEmpresa: im,
																nombrePrincipal:np,
																descripcion:d,
																fechaInicio:fif,
																fechaFin: fff,
																prioridad: p,
																idCarrera:ic,
																salario:s,
																condiciones:c
															},
															success: function(responseObject) { alert(responseObject.responseText); },
															failure: function() { alert("Failed!"); }
														});
													editarOferta.hide();
													editarOferta.el.dom.reset();
													selectionModel = null;
													selectedRecords = null;
												}
											}, {
												text: 'Cancelar',
												handler: function() {
													editarOferta.hide();
													selectionModel = null;
													selectedRecords = null;
												}
											}]
										});
					editarOferta.show();
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
						 var idOferta1=selectedRecords[0].get('idOferta');
						 var idEmpresa1=selectedRecords[0].get('idEmpresa');
						 var conn = new Ext.data.Connection();
								conn.request({
									method: 'POST',
									url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Oferta/eliminacionUnaOferta.php',
									params: {
										idOferta: idOferta1,
										idEmpresa: idEmpresa1
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
							url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Oferta/eliminacionOfertas.php',
							params: {
								idEmpresa: idEmpresa
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
        height: 400,
        width: 1200,
        title: 'Carga de datos Ofeta',
        renderTo: 'grid-example',
        viewConfig: {
            stripeRows: true
        },
        plugins: [cellEditing]
    });
});

 var nuevaOferta= Ext.create('Ext.window.Window', {
        closeAction: 'hide',
        title: 'Agregar Nueva oferta',

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
				fieldLabel: 'Empresa',
				name: 'idEmpresa',
				value: idEmpresa
				},{
				xtype: 'textfield',
				fieldLabel: 'Nombre Principal',
				name: 'nombrePrincipal',
				value: nombrePrincipal
				},{
				xtype: 'textfield',
				fieldLabel: 'Descripcion',
				name: 'descripcion',
				value: descripcion
				}, {
				xtype: 'datefield',
				fieldLabel: 'Fecha Inicio',
				name: 'fechaInicio',
				value: fechaInicio
				}, {
				xtype: 'datefield',
				fieldLabel: 'Fecha Fin',
				name: 'fechaFin',
				value: fechaFin
				},{
				xtype: 'textfield',
				fieldLabel: 'Prioridad',
				name: 'prioridad',
				value: prioridad
				}, {
				xtype: 'textfield',
				fieldLabel: 'Carrera',
				name: 'idCarrera',
				value: idCarrera
				}, {
				xtype: 'textfield',
				fieldLabel: 'Salario',
				name: 'salario',
				value: salario
				},{
				xtype: 'textfield',
				fieldLabel: 'Condiciones',
				name: 'condiciones',
				value: condiciones
			}
		],
        buttons: [{
            text: 'Agregar',
            type: 'submit',
            handler: function() {
                
					var im=nuevaOferta.down('[name=idEmpresa]').getValue();
					var np=nuevaOferta.down('[name=nombrePrincipal]').getValue();
					var d=nuevaOferta.down('[name=descripcion]').getValue();
					var fi=nuevaOferta.down('[name=fechaInicio]').getValue();
					var fif=Ext.Date.format(fi,'Y-m-d');
					var ff=nuevaOferta.down('[name=fechaFin]').getValue();
					var fff=Ext.Date.format(ff,'Y-m-d');
					var p=nuevaOferta.down('[name=prioridad]').getValue();
					var ic=nuevaOferta.down('[name=idCarrera]').getValue();
					var s=nuevaOferta.down('[name=salario]').getValue();
					var c=nuevaOferta.down('[name=condiciones]').getValue();
				//console.log(idEstudiantePrincipal,fg,t,i);
										
				var conn = new Ext.data.Connection();
					conn.request({
						method: 'POST',
						url: 'https://bolsaempleocolombo.000webhostapp.com/Services/Oferta/insertarOferta.php',
						params: {
							idEmpresa: im,
							nombrePrincipal:np,
							descripcion:d,
							fechaInicio:fif,
							fechaFin: fff,
							prioridad: p,
							idCarrera:ic,
							salario:s,
							condiciones:c
							},
						success: function(responseObject) { alert(responseObject.responseText); },
						failure: function() { alert("Failed!"); }
						});
                myData.add({idEmpresa: nuevaOferta.down('[name=idEmpresa]').getValue(), nombrePrincipal: nuevaOferta.down('[name=nombrePrincipal]').getValue(), descripcion: nuevaOferta.down('[name=descripcion]').getValue(),fechaInicio: nuevaOferta.down('[name=fechaInicio]').getValue(),fechaFin: nuevaOferta.down('[name=fechaFin]').getValue(),prioridad: nuevaOferta.down('[name=prioridad]').getValue(),idCarrera: nuevaOferta.down('[name=idCarrera]').getValue(),salario: nuevaOferta.down('[name=salario]').getValue(),condiciones: nuevaOferta.down('[name=condiciones]').getValue()});
                nuevaOferta.hide();
                nuevaOferta.el.dom.reset();
            }
        }, {
            text: 'Cancelar',
            handler: function() {
                V.hide();
            }
        }]
    });