// create map
const map = L.map('mapid').setView([-3.0916586,-59.9829527], 12.5);

// create and add titleLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29,68]
})

let marker;

//create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    //pegando os valores de latitude e longitude dos input hidden do mapa
    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remove icon
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([lat,lng], {icon}).addTo(map)
})


// add photos field
function addPhotoField(){
    //pegar container de photos #images
    const container = document.querySelector('#images')

    //pegar container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')

    // verificar o tamanho do container, se > 6, não adicionar mais
    if(fieldsContainer.length > 5)
        return alert('Você só pode adicionar até 6 imagens!');

    // clone do ultimo container de imagem adicionado
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    // verificar se o campo está vazio. 
    const input = newFieldContainer.children[0]

    //se sim, não adicionar ao container de fotos de imagens
    if(input.value == '') return;

    //limpar o campo antes de add ao container de imagens
    newFieldContainer.children[0].value = ''

    //adicionar o clone ao container de #images-upload
    container.appendChild(newFieldContainer)

}  


// remove photos field
function deleteField(event){
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    // se tiver apenas 1 campo de novo upload
    if(fieldsContainer.length < 2){
        // limpar o campo
        span.parentNode.children[0].value = ''
        return
    }

    //senão, deletar o campo clicado
    span.parentNode.remove();
}


// select yes or no
function toggleSelect(event){
    // pegar os dois botões
    document.querySelectorAll('.button-select button')
    // retirar a classe active dos botões
    .forEach(button => button.classList.remove('active')) 

    // pegar o botão clicado
    const button = event.currentTarget
    //add a classe active a ele
    button.classList.add('active')

    const input = document.querySelector('[name="open_on_weekends"]')

    // atualizar o input hidden com o valor selecionado
    input.value = button.dataset.value
}


// função de validação dos campos do formulário
function checkLocation(event){
    // get  values
    const lat = document.querySelector('[name=lat]').value;
    const lng = document.querySelector('[name=lng]').value;

    // check if lat and lng is empty
    if(lat == '' || lng == ''){
        event.preventDefault()

        alert('Marque a localização do orfanato no mapa!')
    }
}