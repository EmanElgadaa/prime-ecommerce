
var products = [{}];
var categories = [{}];
var brands = [{}];
function DrawDocument() {
    LoadProducts(function (data) {
        brands = data.Helpers.Brands;
        categories = data.Helpers.Categories;
        products = data.Data;
        DrawFilter();
    });
}
function LoadProducts(CallBack) {

    $(".filter-display").empty();
    $(".filter-list-display").empty();

    AjaxCall('Site/Products', 'POST', null,
        function (data) {
            if (data.Sucessed)
                CallBack(data)
        },
        null);
}

function DrawFilter() {

    var html = "<div class='row'>";

    if (categories.length > 0) {
        html += "<div class='col-md-6 col-sm-12 px-2 filter-category'>";
        html += "<label>";
        html += "Select Categories";
        html += "<input mbsc-input id='demo-multiple-select-input-categories' placeholder='Select Category...' data-dropdown='true' data-input-style='outline' data-label-style='stacked' data-tags='true' />";
        html += "</label>";
        html += "<select id='demo-multiple-select-categories' class='capitalize' multiple>";
        $.each(categories,
            function (id, obj) {
                html += "<option value='" + obj.Id + "'>" + obj.Name + "</option>";
            });
        html += "</select>";
        html += "</div>";
    }

    if (brands.length > 0) {
        html += "<div class='col-md-6 col-sm-12 px-2 filter-brand'>";
        html += "<label>";
        html += "Select Brands";
        html += "<input mbsc-input id='demo-multiple-select-input-brands' placeholder='Select Brand...' data-dropdown='true' data-input-style='outline' data-label-style='stacked' data-tags='true' />";
        html += "</label>";
        html += "<select id='demo-multiple-select-brands' class='capitalize' multiple>";
        $.each(brands,
            function (id, obj) {
                html += "<option value='" + obj.Id + "'>" + obj.Name + "</option>";
            });
        html += "</select>";
        html += "</div>";
    }

    html += "</div>";

    $(".filter-display").empty();
    $(".filter-display").append(html);

    mobiscroll.setOptions({
        locale: mobiscroll.localeAr,
        theme: 'ios',
        themeVariant: 'light'
    });
    mobiscroll.select('#demo-multiple-select-categories', {
        inputElement: document.getElementById('demo-multiple-select-input-categories'),
    });

    mobiscroll.setOptions({
        locale: mobiscroll.localeAr,
        theme: 'ios',
        themeVariant: 'light'
    });
    mobiscroll.select('#demo-multiple-select-brands', {
        inputElement: document.getElementById('demo-multiple-select-input-brands'),
    });

    var html = "<div class='filter-items'>";

    if (categories.length > 0) {
        html += "<div class=''>";
        html += "<h6 class='categories-list mb-3 lang' key='categories'>Categories</h6>";
        html += "<div class='px-3 capitalize'> ";
        $.each(categories,
            function (id, obj) {
                html += "<label class='containerlist'>" + obj.Name;
                html += "<input type='checkbox' value='" + obj.Id + "'>";
                html += "<span class='checkmarklist'></span>";
                html += "</label>";
            });
        html += "</div>";
        html += "</div>";
    }

    if (brands.length > 0) {
        html += "<div class=''>";
        html += "<h6 class='brands-list mb-3 lang' key='brands'>Brands</h6>";
        html += "<div class='px-3 capitalize'> ";
        $.each(brands,
            function (id, obj) {
                html += "<label class='containerlist'>" + obj.Name;
                html += "<input type='checkbox' value='" + obj.Id + "'>";
                html += "<span class='checkmarklist'></span>";
                html += "</label>";
            });
        html += "</div>";
        html += "</div>";
    }

    html += "</div>";

    $(".filter-list-display").empty();
    $(".filter-list-display").append(html);

    FillProducts('', '');
}

function FillProducts(categoryId, brandId) {

    var html = "";
    $.each(products,
        function (id, obj) {
            if ((categoryId === "" || categoryId === obj.Category.Id) &&
                (brandId === "" || brandId === obj.Brand.Id)) {

                html += "<div class='col-lg-4 col-md-4 col-sm-6 mb-3'>";
                html += "<div class='product-offer product-card pb-3'>";
                html += "	<div>";
                html += "		<div class='image-offer product-container'>";
                html += "			<img src='" + imageUrl + obj.ImagePath + "' class='py-3 product-img'>";
                html += "			<span class='favorite-icon'>";
                html += "				<!-- <img class='mx-1' src='./images/favourit.svg'> -->";
                html += "				<svg id='Object' height='512' viewBox='0 0 32 32' width='512' xmlns='http://www.w3.org/2000/svg'>";
                html += "					<path d='m28.33 4.85a8.92 8.92 0 0 0 -6.53-2.85 8.87 8.87 0 0 0 -5.8 2.16 8.89 8.89 0 0 0 -12.33.69 10 10 0 0 0 0 13.62l9.94 10.53a3.29 3.29 0 0 0 2.39 1 3.25 3.25 0 0 0 2.38-1l10-10.49a10 10 0 0 0 -.05-13.66zm-1.45 12.24-9.95 10.5a1.29 1.29 0 0 1 -1.86 0l-9.95-10.5a8 8 0 0 1 0-10.87 6.91 6.91 0 0 1 10.15 0 1 1 0 0 0 1.46 0 7 7 0 0 1 5.07-2.22 7 7 0 0 1 5.08 2.22 8 8 0 0 1 0 10.87z'/></svg>";
                html += "		</span>";
                html += "		</div>		";
                html += "		<div class='offer-product-info'>";
                html += "			<p class='brand-name mt-1 mb-1'>" + obj.Brand.Name + "</p>";
                html += "			<p class='product-name'><a href='./product-details.html'>" + obj.Name + "</a></p>";
                html += "			<div class='price-offer mt-4 mb-3'>";
                html += "				<span></span><span class='current-price'>" + obj.Price + " LE</span>";
                html += "			</div>";
                html += "		</div>";
                html += "		<div class='d-flex justify-content-center'>";
                html += "		<div class='d-flex justify-content-center' style='width:80%'>";
                html += "			<button class='btn-cart align-items-center add-to-cart-btn' >";
                html += "				<svg clip-rule='evenodd' fill-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' xmlns:serif='http://www.serif.com/'><g transform='translate(-111 -301)'><g id='Icons-Here'><path d='m121 310h-.824c-1.752 0-3.198 1.368-3.295 3.117l-.745 13.4c-.05.906.275 1.792.898 2.451s1.49 1.032 2.397 1.032h15.138c.907 0 1.774-.373 2.397-1.032s.948-1.545.898-2.451l-.745-13.4c-.097-1.749-1.543-3.117-3.295-3.117h-.824v-1c0-3.314-2.686-6-6-6-3.314 0-6 2.686-6 6zm0 2h-.824c-.69 0-1.26.539-1.298 1.228 0 0-.745 13.4-.745 13.4-.019.357.108.706.354.965.245.26.587.407.944.407h15.138c.357 0 .699-.147.944-.407.246-.259.373-.608.354-.965l-.745-13.4c-.038-.689-.608-1.228-1.298-1.228h-.824v4c0 .552-.448 1-1 1s-1-.448-1-1v-4h-8v4c0 .552-.448 1-1 1s-1-.448-1-1zm10-2v-1c0-2.209-1.791-4-4-4-2.209 0-4 1.791-4 4v1z'/></g></g></svg>";
                html += "				<span class='lang  pt-1 px-2 action-btn' key='addtocart'>Add to Cart</span>";
                html += "			</button>	";
                html += "			<div class='quantity-controls'>";
                html += "				<button class='minus-btn'>-</button>";
                html += "				<input type='text' class='qty-input' value='1'>";
                html += "				<button class='plus-btn'>+</button>";
                html += "			</div>	";
                html += "		</div>";
                html += "		</div>";
                html += "	</div>";
                html += "</div>";
                html += "</div>";
            }
        });

    $("#products-list").empty();
    $("#products-list").append(html);

    $("img").each(function (index, element) {
        var $element = $(element);
        var id = $element.attr("data-src");
        if (id !== undefined) {
            Download(id, function (content) {
                $element.attr("src", content);
            });
        }
    });
}