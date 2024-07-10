
var products = [{}];
var sliders = [{}];
var events = [{}];

function DrawDocument() {

    //LoadSliders(function (data) {
    //    sliders = data.Data;
    //    FillSliders();
    //});
    //LoadEvents(function (data) {
    //    events = data.Data;
    //    FillEvents();
    //});
    LoadProducts(function (data) {
        products = data.Data;
        FillProducts();
    });
}
function LoadSliders(CallBack) {

    $("#carouselExampleIndicators").hide();
    AjaxCall('Site/Home/Slides', 'POST', null,
        function (data) {
            if (data.Sucessed)
                CallBack(data)
        },
        null);
}
function FillSliders() {

    var html = "";
    var htmlSliderButtons = "";
    var htmlSliders = "";
    var index = 0;
    $.each(sliders,
        function (id, obj) {
            if (index === 0)
                htmlSliderButtons += "<li data-target='#carouselExampleIndicators' data-slide-to='" + index + "' class='active'></li>";
            else
                htmlSliderButtons += "<li data-target='#carouselExampleIndicators' data-slide-to='" + index + "'></li>";
            index++;

            html = "";
            html += "<div class='carousel-item'>";
            html += "    <img class='d-block w-100' src = '" + imageUrl + obj.ImagePath + "' alt = '" + obj.Name + "' >";
            html += "    <div class='carousel-caption d-none d-md-block slider-container carousel-caption-text-side carousel-caption-text'>";
            if (obj.Name !== "")
                html += "            <h4 style='text-align: start;'>" + obj.Name + "</h4>";
            if (obj.Description !== "")
                html += "            <h3 style='text-align: start;color: #ffffff;'>" + obj.Description +"</h3>";
            html += "    </div>";
            html += "</div>";

            htmlSliders += html;
        });

    if (htmlSliders !== "") {
        $(".carousel-indicators").empty();
        $(".carousel-indicators").append(htmlSliderButtons);

        $(".carousel-inner").empty();
        $(".carousel-inner").append(htmlSliders);

        $("#carouselExampleIndicators").show();
    } 

    updateOwl();

}
function LoadEvents(CallBack) {

    $(".containerz").hide();
    AjaxCall('Site/Home/Events', 'POST', null,
        function (data) {
            if (data.Sucessed)
                CallBack(data)
        },
        null);
}
function FillEvents() {

    var html = "";
    var htmlEvents = "";
    $.each(events,
        function (id, obj) {

            html = "";
            html += "<article class='card__article swiper-slide'>";
            html += "    <div class='card__image'>";
            html += "        <img src='" + imageUrl + obj.ImagePath + "' alt='" + obj.Name + "' class='card__img'>";
            html += "            <div class='card__shadow'></div>";
            html += "    </div>";

            html += "     <div class='card__data'>";
            html += "        <div class='d-flex justify-content-between card__data-content mb-2'>";
            html += "            <span>'" + obj.Name + "</span>";
            html += "            <span>'" + obj.Date + "</span>";
            html += "        </div>";
            html += "        <p class='card__description lang' key='eventtext'>";
            html += obj.Description;
            html += "        </p>";
            html += "    </div>";
            html += "</article>";

            htmlEvents += html;
        });

    if (htmlEvents !== "") {
        $(".swiper-wrapper").empty();
        $(".swiper-wrapper").append(htmlEvents);

        $(".containerz").show();
    } 

    //updateSwipper();
}

function LoadProducts(CallBack) {

    $("#offers-section").hide();
    $("#products-section").hide();

    AjaxCall('Site/Home/Products', 'POST', null,
        function (data) {
            if (data.Sucessed)
                CallBack(data)
        },
        null);
}
function FillProducts() {

    var html = "";
    var htmlOffers = "";
    var htmlProducts = "";
    var rtl = selectedLang === "ar";

    $.each(products,
        function (id, obj) {
            html = "";
            html += "<div class='item'>";
            html += "    <div class='product-offer product-card pb-3'>";
            html += "        <div>";
            html += "            <div class='image-offer product-container'>";
            html += "                <img src='" + imageUrl + obj.ImagePath + "' class='py-3 product-img'>";
            html += "                <span class='favorite-icon'>";
            html += "                    <!-- <img class='mx-1' src='./images/favourit.svg'> -->";
            html += "                    <svg id='Object' height='512' viewBox='0 0 32 32' width='512' xmlns='http://www.w3.org/2000/svg'>";
            html += "                        <path d='m28.33 4.85a8.92 8.92 0 0 0 -6.53-2.85 8.87 8.87 0 0 0 -5.8 2.16 8.89 8.89 0 0 0 -12.33.69 10 10 0 0 0 0 13.62l9.94 10.53a3.29 3.29 0 0 0 2.39 1 3.25 3.25 0 0 0 2.38-1l10-10.49a10 10 0 0 0 -.05-13.66zm-1.45 12.24-9.95 10.5a1.29 1.29 0 0 1 -1.86 0l-9.95-10.5a8 8 0 0 1 0-10.87 6.91 6.91 0 0 1 10.15 0 1 1 0 0 0 1.46 0 7 7 0 0 1 5.07-2.22 7 7 0 0 1 5.08 2.22 8 8 0 0 1 0 10.87z' />";
            html += "                    </svg>";
            html += "                </span>";
            if (obj.IsOffer) {
                html += "                <div class='product-container-offer'>";
                html += "                    <span class='offer-off lang' key='offer25'>";
                html += "                        Offer";
                html += "                    </span>";
                html += "                </div>";
            }
            html += "            </div>";
            html += "            <div class='offer-product-info'>";
            html += "                <p class='brand-name mt-1 mb-1'>" + obj.Brand.Name + "</p>";
            html += "                <p class='product-name'><a href='./product-details.html?Id=" + obj.Id + "'>" + obj.Name + "</a></p>";
            html += "                <div class='price-offer mt-4 mb-3'>";
            html += "                    <span></span><span class='current-price'>" + obj.Price + " LE</span>";
            html += "                </div>";
            html += "            </div>";
            html += "            <div class='d-flex justify-content-center'>";
            html += "                <div class='d-flex justify-content-center' style='width:80%'>";
            html += "                    <button class='btn-cart align-items-center add-to-cart-btn'>";
            html += "                        <svg clip-rule='evenodd' fill-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' xmlns:serif='http://www.serif.com/'><g transform='translate(-111 -301)'><g id='Icons-Here'><path d='m121 310h-.824c-1.752 0-3.198 1.368-3.295 3.117l-.745 13.4c-.05.906.275 1.792.898 2.451s1.49 1.032 2.397 1.032h15.138c.907 0 1.774-.373 2.397-1.032s.948-1.545.898-2.451l-.745-13.4c-.097-1.749-1.543-3.117-3.295-3.117h-.824v-1c0-3.314-2.686-6-6-6-3.314 0-6 2.686-6 6zm0 2h-.824c-.69 0-1.26.539-1.298 1.228 0 0-.745 13.4-.745 13.4-.019.357.108.706.354.965.245.26.587.407.944.407h15.138c.357 0 .699-.147.944-.407.246-.259.373-.608.354-.965l-.745-13.4c-.038-.689-.608-1.228-1.298-1.228h-.824v4c0 .552-.448 1-1 1s-1-.448-1-1v-4h-8v4c0 .552-.448 1-1 1s-1-.448-1-1zm10-2v-1c0-2.209-1.791-4-4-4-2.209 0-4 1.791-4 4v1z' /></g></g></svg>";
            html += "                        <span class='lang  pt-1 px-2 action-btn' key='addtocart'>Add to Cart</span>";
            html += "                    </button>";
            html += "                    <div class='quantity-controls'>";
            html += "                        <button class='minus-btn'>-</button>";
            html += "                        <input type='text' class='qty-input' value='1'>";
            html += "                        <button class='plus-btn'>+</button>";
            html += "                    </div>";
            html += "                </div>";
            html += "            </div>";
            html += "        </div>";
            html += "    </div>";
            html += "</div>";

            if (obj.IsOffer)
                htmlOffers += html;
            else
                htmlProducts += html;
        });

    if (htmlOffers !== "") {
        $("#offers-container").empty();
        $("#offers-container").append(htmlOffers);

        $("#offers-section").show();

        //$("#offers-container").trigger('destroy.owl.carousel')
        $('#offers-slider .owl-carousel').owlCarousel({
            loop: true,
            rtl: rtl,
            autoWidth: true,
            margin: 15,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
    } 

    if (htmlProducts !== "") {
        $("#products-container").empty();
        $("#products-container").append(htmlProducts);

        $("#products-section").show();

        //$("#offers-container").trigger('destroy.owl.carousel')
        $('#products-slider .owl-carousel').owlCarousel({
            loop: true,
            rtl: rtl,
            autoWidth: true,
            margin: 15,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
    }    

}