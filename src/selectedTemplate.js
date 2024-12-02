export function showSelectedTemplate(id, urlImg) {
    const selectedTemplate = `
        <div class="item" data-id="${id}">
  
          <div class="ui tiny image">
            <img class="ui centered medium image" src="${urlImg}">
          </div>
  
          <div class="middle aligned content">
  
            <a class="header">12 Years a Slave</a>
  
            <div class="ui form">
              <div class="field">
  
                <label>Top text</label>
                <input id="text0" type="text">
  
                <label>Bottom text</label>
                <input id="text1" type="text">
              </div>
            </div>
  
          </div>
           <button id="submitBtn" class="ui button" type="submit">Submit</button>
        </div>                 
        `;
    $('#constructor-container').html(selectedTemplate);
  
    // Vincula el evento click al botón una vez que se ha renderizado el HTML
    $('#submitBtn').on('click', getData);
  }

function getData() {
    const text0 = $('#text0').val();
    const text1 = $('#text1').val();
    const id = $('.item').data('id');
    getCaption(id, text0, text1);
}  