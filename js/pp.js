// http://127.0.0.1:8000
var products;
$(document).ready(function () {
    getProducts();

   $(document).on('click','#button',function () {
       let formData = new FormData();
       formData.append('name', $('#name').val());
       formData.append('desc', $('#description').val());
       formData.append('price', $('#price').val());
       var imgFile = $('#image').prop('files')[0];
       formData.append('image', imgFile);

       $.ajax({
           url: 'http://127.0.0.1:8000/api/products/create',
           method: 'POST',
           data: formData,
           processData: false,
           contentType: false,
           success: function () {
               getProducts();
               $('#name').val('');
               $('#description').val('');
               $('#price').val('');
               $('#img_span')
                   .css('background', '#fff')
                   .html('Choose Image');
           }
       })
   })
    function getProduct(id) {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/products/get/' + id,
            method: 'GET',
            success: function (responce) {
                console.log(responce);
            }
        })
    }

    function deleteProduct(id) {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/products/delete/' + id,
            method: 'DELETE',
            success: function () {
                getProducts();
            }
        })
    }

    $(document).on('click','.del_button',function () {
        console.log(this);
        let elemId = this.getAttribute('data-id');
        deleteProduct(elemId);
    })

    $('#image').on('change', function () {
        $('#img_span')
            .css('background', 'url(' + window.URL.createObjectURL(this.files[0]) + ')')
            .css('background-size', 'cover')
            .css('background-repeat', 'no-repeat')
            .css('background-position', 'center')
            .html('');
    })

});
 function getProducts() {
     $.ajax({
         url: 'http://127.0.0.1:8000/api/products/get',
         method: 'GET',
         success: function (response) {
             $('#output_form').html('');
             products = response.data;
             showElements(products);
         },
         error: function () {

         }
     });
 }
function showElements(products) {
    $.each(products,  function (key,value) {
        $('#output_form').append(
            '<div class="item">  ' +
                '<div class="image" style=" background: url( ' + value.image + '); background-size: cover; background-repeat: no-repeat; background-position: center"> '  +
                    '<div class="descr">' +
                    '<div class="descr_text"><i class="fas fa-search"></i>' + value.description + ' </div> </div>' +
                '</div>' +
                '<div class="name">' + value.name + ' </div>' +
                '<div class="price">' + value.price + ' $ </div>' +
                '<button data-id="'+ value.id +'" class="del_button"> Delete Item</button>' +
            '</div>');
    })

}

//'http://127.0.0.1:8000/api/products/delete/id'

// $('#coverImage').attr('src', window.URL.createObjectURL(uploader.files[0]));
