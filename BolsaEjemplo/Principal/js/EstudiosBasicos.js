Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

var myData;
var selectionModel;
var selectedRecords;
var fechaGrado;
var titulo;
var institucion;
var idEstudiantePrincipal;

Ext.onReady(function() {
    Ext.QuickTips.init();

  	var records = [];

	//create extjs store with empty data
	myData  = Ext.create('Ext.data.Store',{
		fields : ['idEstudio', 'idEstudiante','FechaGrado','Titulo','Institucion'],
		data: records,
		paging : false
	});

	Ext.Ajax.request({
		url : 'https://bolsaempleocolombo.000webhostapp.com/Services/EstudiosBasicos/seleccionEstudiosBasicos.php',
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
                                       records.push({
											idEstudio: res[e].idEstudio,
											idEstudiante: res[e].idEstudiante,
											FechaGrado:res[e].FechaGrado,
											Titulo:res[e].titulo,
											Institucion:res[e].institucion
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
            text     : 'Fecha<br>Grado', // Two line header! Test header height synchronization!
            sortable : true,
            renderer : Ext.util.Format.dateRenderer('d/m/Y'),
            dataIndex: 'FechaGrado'
        },{
            text     : 'Titulo',
            width    : 97,
            sortable : true,
            dataIndex: 'Titulo'
        },{
            text     : 'Institucion',
            width    : 200,
            sortable : true,/*
            renderer : change,*/
            dataIndex: 'Institucion'
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
					fechaGrado=selectedRecords[0].get('FechaGrado');
					titulo=selectedRecords[0].get('Titulo');
					institucion=selectedRecords[0].get('Institucion');
					//console.log(fechaGrado,titulo,institucion);
					var editarEstudioBasico= Ext.create('Ext.window.Window', {
											closeAction: 'hide',
											title: 'Editar Estudio Basico',

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
												fieldLabel: 'Fecha de Grado',
												name: 'FechaGrado',
												value: fechaGrado
											}, {
												xtype: 'textfield',
												fieldLabel: 'Titulo',
												name: 'Titulo',
												value: titulo
											},{
												xtype: 'textfield',
												fieldLabel: 'Institucion',
												name: 'Institucion',
												value: institucion
											}
											],
											buttons: [{
												text: 'Editar',
												type: 'submit',
												handler: function() {
													var idEstudio2=selectedRecords[0].get('idEstudio');
													var fg=editarEstudioBasico.down('[name=FechaGrado]').getValue();
													var fgf=Ext.Date.format(fg,'Y-m-d')
													var t=editarEstudioBasico.down('[name=Titulo]').getValue();
													var i=editarEstudioBasico.down('[name=Institucion]').getValue();
													console.log(idEstudiantePrincipal,idEstudio2,fg,t,i);
													selectedRecords[0].set('FechaGrado',fg);
													selectedRecords[0].set('Titulo',t);
													selectedRecords[0].set('Institucion',i);
													
													var conn = new Ext.data.Connection();
														conn.request({
															method: 'POST',
															url: 'https://bolsaempleocolombo.000webhostapp.com/Services/EstudiosBasicos/actualizarEstudiosBasicos.php',
															params: {
																idEstudiante: idEstudiantePrincipal,
																idEstudio: idEstudio2,
																FechaGrado:fgf,
																Titulo:t,
																Institucion:i
															},
															success: function(responseObject) { alert(responseObject.responseText); },
															failure: function() { alert("Failed!"); }
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
				//console.log(selectedRecords[0].get('FechaGrado'));
				
				//editarEstudioBasico.show();
				} 
			},{
            text: 'Eliminar',
            handler: function() {
				     selectionModel = grid.getSelectionModel();
					 selectedRecords = selectionModel.getSelection();
					 if(selectedRecords.length>0){
						 var idEstudio1=selectedRecords[0].get('idEstudio');
						 
						 var conn = new Ext.data.Connection();
								conn.request({
									method: 'POST',
									url: 'https://bolsaempleocolombo.000webhostapp.com/Services/EstudiosBasicos/eliminacionUnoEstudiosBasicos.php',
									params: {
										idEstudiante: idEstudiantePrincipal,
										idEstudio: idEstudio1
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
							url: 'https://bolsaempleocolombo.000webhostapp.com/Services/EstudiosBasicos/eliminacionEstudiosBasicos.php',
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
        title: 'Ejemplo Carga de Datos Estudios Basicos',
        renderTo: 'grid-example',
        viewConfig: {
            stripeRows: true
        },
        plugins: [cellEditing]
    });
});

 var nuevoEstudioBasico= Ext.create('Ext.window.Window', {
        closeAction: 'hide',
        title: 'Agregar Nuevo Estudio Basico',

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
            fieldLabel: 'Fecha de Grado',
            name: 'FechaGrado'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Titulo',
            name: 'Titulo'
        },{
            xtype: 'textfield',
            fieldLabel: 'Institucion',
            name: 'Institucion'
        }
		],
        buttons: [{
            text: 'Agregar',
            type: 'submit',
            handler: function() {
                
				var fg=nuevoEstudioBasico.down('[name=FechaGrado]').getValue();
				var fgf=Ext.Date.format(fg,'Y-m-d')
				var t=nuevoEstudioBasico.down('[name=Titulo]').getValue();
				var i=nuevoEstudioBasico.down('[name=Institucion]').getValue();
				console.log(idEstudiantePrincipal,fg,t,i);
										
				var conn = new Ext.data.Connection();
					conn.request({
						method: 'POST',
						url: 'https://bolsaempleocolombo.000webhostapp.com/Services/EstudiosBasicos/insertarEstudiosBasicos.php',
						params: {
							idEstudiante: idEstudiantePrincipal,
							FechaGrado:fgf,
							Titulo:t,
							Institucion:i
							},
						success: function(responseObject) { alert(responseObject.responseText); },
						failure: function() { alert("Failed!"); }
						});
                myData.add({FechaGrado: nuevoEstudioBasico.down('[name=FechaGrado]').getValue(), Titulo: nuevoEstudioBasico.down('[name=Titulo]').getValue(), Institucion: nuevoEstudioBasico.down('[name=Institucion]').getValue()});
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