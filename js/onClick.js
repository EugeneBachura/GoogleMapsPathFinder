// JavaScript Document

// Button Back functions //
document.getElementById('btnBackGenetation').addEventListener('click', function() {
	document.getElementById('directionsPanel').style.visibility='hidden';
	document.getElementById('genetation').style.visibility= 'visible';
	document.getElementById('btnBackDirectionsPanel').style.visibility='visible';
});

document.getElementById('btnBackDirectionsPanel').addEventListener('click', function() {
	document.getElementById('directionsPanel').style.visibility='visible';
	document.getElementById('genetation').style.visibility= 'hidden';
	document.getElementById('btnBackDirectionsPanel').style.visibility='hidden';
});

// *************** //

// Select adds markers //
document.getElementById('btnBackDirectionsPanel').addEventListener('click', function() {
	if (document.getElementById('inlineFormSelect').value != 'Select...' || document.getElementById('inlineFormSelect').value != 'Выбрать...' || document.getElementById('inlineFormSelect').value != 'Выбраць...') {
		document.getElementById('add-input').style.display='block';
	} else document.getElementById('add-input').style.display='none';
});
// *************** //
