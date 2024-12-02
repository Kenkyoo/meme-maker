import axios from 'axios';
import { showTemplates } from './templates';

// Obtener plantillas de memes
axios.get('https://server-maker.onrender.com/get')
  .then(response => {
    const datas = response.data;
    const data = datas.data;
    const memes = data.memes;
    showTemplates(memes);

$('.ui.search')
  .search({
    source: memes,
    searchFields   : [
      'name'
    ],
    onSelect: function(result) {
      // Aquí puedes definir lo que sucede cuando un usuario selecciona un resultado.
      // Por ejemplo, podrías mostrar la plantilla seleccionada.
      showTemplates([result]); // Muestra solo la plantilla seleccionada
      return false;
    },
    onResults: function(response) {
      // Mostrar los resultados en el contenedor en lugar del menú desplegable
      const filteredMemes = response.results;
      showTemplates(filteredMemes); // Mostrar solo las plantillas filtradas
      return false; // Evitar el menú desplegable
    },
    onSearchQuery: function(query) {
      // Restaurar todos los resultados si el input está vacío
      if (query === '') {
        showTemplates(memes); // Mostrar todas las plantillas
      }
    }  
  })
;
  })
  .catch(error => {
    console.error('Error al obtener las plantillas:', error);
  });

async function getCaption(id, topText, bottomText, fontSize, font) {
  
// Crear un meme con la plantilla seleccionada
axios.post('https://server-maker.onrender.com/caption', {
    id: id,  // ID de la plantilla seleccionada
    text0: topText, // Texto superior del meme
    text1: bottomText, // Texto inferior del meme
    max_font_size: fontSize,
    font,
    username: 'francoDev',  // Tu nombre de usuario en la API
    password: 'F7BrU^!!_:X#Gn:'   // Tu contraseña en la API
  })
  .then(response => {
    console.log('Meme creado:', response.data);
    const datas = response.data;
    showMeme(datas.data)
  })
  .catch(error => {
    console.error('Error al crear el meme:', error);
  });
}  

window.handleClick = function(id, urlImg) {
    $('#templates-container').hide()
    showSelectedTemplate(id, urlImg)
  }

function showSelectedTemplate(id, urlImg) {
    const selectedTemplate = `
    <div class="ui middle aligned stackable grid container" data-id="${id}">
      <div class="row">
        <div class="eight wide column">
          <h3 class="ui header">Meme Constructor</h3>
          <p>Añade texto a la imagen. Tip: si la imagen tiene una orientacion vertical el texto se añadira a la izquierda y a la derecha.</p>
            <div class="ui form">
              <div class="field">
  
                <label>Top text (required)</label>
                <input id="text0" type="text" required>
  
                <label>Bottom text (required)</label>
                <input id="text1" type="text" required>

                <label>Font size (px)</label>
                <input id="fontSize" type="number">
                <label>Font family</label>
                <select class="ui fluid dropdown" id="fontSelect">

                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Helvetica, sans-serif">Helvetica</option>
                  <option value="Times New Roman, serif">Times New Roman</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Courier New, monospace">Courier New</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                  <option value="Tahoma, sans-serif">Tahoma</option>
                  <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
                  <option value="Lucida Sans, sans-serif">Lucida Sans</option>
                  <option value="Comic Sans MS, cursive">Comic Sans MS</option>
                  <option value="Impact, sans-serif">Impact</option>
                  <option value="Palatino Linotype, serif">Palatino Linotype</option>
                  <option value="Garamond, serif">Garamond</option>
                  <option value="Brush Script MT, cursive">Brush Script MT</option>
                </select>
              </div>
            </div>
        </div>
        <div class="six wide right floated column">
          <img src="${urlImg}" class="ui large bordered rounded image hvr-float-shadow">
        </div>
      </div>
      <div class="row">
        <div class="center aligned column">
          <button id="submitBtn" class="ui button hvr-fade" type="submit">Crear!</button>
        </div>
      </div>
    </div>                 
        `;
    $('#constructor-container').html(selectedTemplate);
    $('#submitBtn').on('click', doneAlert);
    $('#submitBtn').on('click', getData);
  }


function getData() {
    const text0 = $('#text0').val();
    const text1 = $('#text1').val();
    const id = $('.stackable').data('id');
    const fontSize = $('#font').val();
    const font = $('#fontSelect').val();

    getCaption(id, text0, text1, fontSize, font);
}

function showMeme(data) {
  $('#constructor').hide()
  const meme = 
  `
  <h3 class="ui center aligned header">
    Hecho! Aqui esta tu meme:
  </h3>
  <img class="ui centered medium image meme" src="${data.url}"></img>
  `;
  $('#meme').html(meme)
}

function doneAlert() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "El meme ha sido creado correctamente",
    showConfirmButton: false,
    timer: 1500
  });
}