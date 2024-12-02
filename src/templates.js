export function showTemplates(memes) {
    let templates = '';
    memes.forEach(meme => {
        templates += `
        <div class="four wide column hver-grow">
            <div class="ui fluid yellow card" onclick="handleClick('${meme.id}', '${meme.url}')">
              <div class="image">
                <img class="ui medium bordered image" src="${meme.url}" width="200" height="300">
              </div>
              <div class="content">
                <a class="header">${meme.name}</a>
              </div>
            </div>  
        </div>
        `;
    });
    $('#templates-container').html(templates);
}