const electron = require('@electron/remote');
const XLSX = require('xlsx');

async function exportXlsx (htmlTabla) {
    

	const HTMLOUT = htmlTabla;
	const wb = XLSX.utils.table_to_book(HTMLOUT);
	const o = await electron.dialog.showSaveDialog({
		title: 'Guardar como',
        defaultPath: 'Export',
		filters: [{
			name: "Spreadsheets",
			extensions: EXTENSIONS
		}]
	});
	
	XLSX.writeFile(wb, o.filePath);
	// electron.dialog.showMessageBox({ message: "Exported data to " + o.filePath, buttons: ["OK"] });// muestra una ventana de confirmaciòn luego de exportar el archivo
};


module.exports={exportXlsx}