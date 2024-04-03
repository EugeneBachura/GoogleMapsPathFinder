// JavaScript Document

var lang = document.documentElement.lang;

function reset() {
	switch (lang) {
		case 'ru': document.getElementById("inlineFormSelect").value = "Выбрать..."; break;
		case 'be': document.getElementById("inlineFormSelect").value = "Выбраць..."; break;
		default: document.getElementById("inlineFormSelect").value = "Choose...";
	};

	document.getElementById('add-input').value = "";
	document.getElementById('origin-input').value = "";
	for (var i = 0; i <= 5; i++) {
		   document.getElementById('destination-input' + i).value = "";  
	};
	for (var i = 1; i <= 5; i++) {
		document.getElementById('ch' + i).checked = false;
	}
}