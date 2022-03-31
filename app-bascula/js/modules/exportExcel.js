const { leerJSON} = require('./json')
const path = require('path')
const {Renderer} = require('xlsx-renderer')
const electron = require('@electron/remote');

EXTENSIONS = ["xlsx"];

const renderer = new Renderer();

async function exportarJsontoExcel(){
    let viewModel={
        "data":null,
        "headers":null
    }

    viewModel.data = leerJSON('BD');
    viewModel.headers = leerJSON('cabecera')
    const pathLog = path.resolve(__dirname)+'./../../plantillaExcel/'

    const result = await renderer.renderFromFile(pathLog+"plantilla.xlsx" , viewModel);

    const o = await electron.dialog.showSaveDialog({
		title: 'Guardar como',
        defaultPath: 'Export',
		filters: [{
			name: "Spreadsheets",
			extensions: EXTENSIONS
		}]
	});

    await result.xlsx.writeFile(o.filePath);
}

module.exports={exportarJsontoExcel}