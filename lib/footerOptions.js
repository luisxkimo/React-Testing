$(function(){

    FastClick.attach(document.body);
    var serverUrlGenerator = "http://www.json-generator.com/api/json/get/clnATHgegi?indent=2";
    var items = [],
        screenData;

    $('#main').ready(function(){

        $.getJSON( serverUrlGenerator , function( data ) {

            $.each(data, function (key, val) {
                var itemfinal = getTemplateFromJSON(key,val);
                items.push(itemfinal);

            });

            $.each(items, function(i, item){
                $('#orders').append(item);
            });
            screenData = getScreenStyleData();
        });


    });

    $('#addOrder').click(function(){
        var index = Math.floor((Math.random() * items.length) + 1);

        $('#orders').append(items[index]);
    });

    $('#deleteOrder').click(function(){
        var main = document.querySelector('#main > .container');
        var divs = main.getElementsByTagName('div');
        var lastDiv = divs[divs.length-1];

        main.removeChild(lastDiv);
    });

    $('#leftScroll').click(function(){
        if (screenData.currentCol < screenData.positions.length - 1) {
            screenData.container.scrollLeft =
                screenData.positions[screenData.currentCol - 1] - (screenData.columnsGap + screenData.padding);
        }
    });

    $('#rightScroll').click(function(){
        if (screenData.currentCol < screenData.positions.length - 1) {
            screenData.container.scrollLeft =
                screenData.positions[screenData.currentCol + 1] - (screenData.columnsGap + screenData.padding);
        }
    });

    $('#prevPage').click(function(){

        if((screenData.currentCol - screenData.columnsperpage) <= 0){
            screenData.container.scrollLeft = 0;
            return;
        }

        screenData.currentCol = screenData.currentCol - screenData.columnsperpage;
        screenData.container.scrollLeft =
                screenData.positions[screenData.currentCol] - (screenData.columnsGap + screenData.padding);

    });

    $('#nextPage').click(function(){

        if((screenData.currentCol + screenData.columnsperpage) >= screenData.positions.length)
            return;

        screenData.currentCol = screenData.currentCol + screenData.columnsperpage;
        screenData.container.scrollLeft =
                screenData.positions[screenData.currentCol] - (screenData.columnsGap + screenData.padding);

    });

    function getTemplateFromJSON(key, val){

        var subItems = [];
        var headItem =
            "<div class='order' id='"+val._id+"'>" +
            "<dl>"+
            "<dt>Mesa "+ val.tableId +"</dt>";

        $.each(val.items,function(key,value){
            subItems.push("<dd>"+value.quantity+" x "+value.product+"</dd>");
        });

        var footerItem = "</dl></div>";

        var final = headItem + subItems.join("") + footerItem;
        return final;
    };

    function getColumnsLeft(colDivs) {
        return Array.prototype.reduce.call(colDivs, function(acc, order) {
            if (acc.length === 0 || (acc[acc.length-1] !== order.offsetLeft)) {
                acc.push(order.offsetLeft);
                return acc;
            }
            return acc;
        }, []);
    }

    function getFirstVisibleColumnIndex(columnsLeft, scrollLeft) {
        var i;
        for (i = 0; i < columnsLeft.length; i++) {
            if (columnsLeft[i] > scrollLeft) {
                return i;
            }
        }
        return -1;
    }

    function getNumberColumnsPerPage(container){
        var clientWidth = $('#main').width(),
            columnsGap = parseInt($(container).css('-webkit-column-gap'), 10),
            columnsWidth = parseInt($(container).css('-webkit-column-width'), 10);

        var numColumns = clientWidth / (columnsGap+columnsWidth);
        return Math.floor(numColumns);
    }

    function getScreenStyleData(){

        var container = document.querySelector('.container'),
            orders =  document.querySelectorAll('.order'),
            positions = getColumnsLeft(orders),
            currentCol = getFirstVisibleColumnIndex(positions, container.scrollLeft);

        return {
            container : container,
            columnsperpage: getNumberColumnsPerPage(container),
            orders : orders,
            positions: positions,
            currentCol: currentCol,
            columnsGap: parseInt($(container).css('-webkit-column-gap'), 10),
            padding: parseInt($(container).css('padding-left'), 10)
        }
    }

    $('.horizontal-columns').scroll(function(){
        screenData = getScreenStyleData();
    });
});