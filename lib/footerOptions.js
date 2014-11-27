$(function(){

    FastClick.attach(document.body);

    $('#main').ready(function(){

        var items = [];
        $.getJSON( "http://www.json-generator.com/api/json/get/clnATHgegi?indent=2", function( data ) {
            var subItems = [];
            $.each(data, function (key, val) {
                var headItem =
                    "<div class='order fadeIn' id='"+val._id+"'>" +
                    "<dl>"+
                    "<dt>Mesa "+ val.tableId +"</dt>";

                $.each(val.items,function(key,value){
                    subItems.push("<dd>"+value.quantity+" x "+value.product+"</dd>");
                });

                var footerItem = "</dl></div>";

                var itemfinal = headItem + subItems.join("") + footerItem;
                items.push(itemfinal);
                subItems = [];
            });
            $.each(items, function(i, item){
                $('#orders').append(item);
            });
        });
    });

    $('#addOrder').click(function(){

        var identity = getGUID();

        var newOrder = $('<div></div>');
        newOrder.attr('id', identity);
        newOrder.addClass('order');
        newOrder.addClass('bigEntrance');
        var count = Math.floor((Math.random() * 3) + 1);
        var order = '<p>' +
            '<dl>'+
            '<dt>Mesa '+count+'</dt>';
        for(i = 0; i < count; i++){

            order = order + '<dd> 1 x Patatas Fritas </dd>'+
            '<dd> 2 x Burguer sin queso</dd>'+
            '<dd> 1 x Fingers de pollo</dd>';
        }

        newOrder.append(order+
        '</dl>'+
        '</p>');
        $('.container.horizontal-columns').append(newOrder);
    });

    $('#deleteOrder').click(function(){
        var main = document.querySelector('#main > .container');
        var divs = main.getElementsByTagName('div');
        var lastDiv = divs[divs.length-1];

        main.removeChild(lastDiv);
    });

    $('#leftScroll').click(function(){

        var container = document.querySelector('.container'),
            orders = document.querySelectorAll('.order'),
            columnsGap = parseInt($(container).css('-webkit-column-gap'), 10),
            padding = parseInt($(container).css('padding-left'), 10),
            positions = getColumnsLeft(orders),
            currentCol = getFirstVisibleColumnIndex(positions, container.scrollLeft);

        if (currentCol < positions.length - 1) {
            container.scrollLeft = positions[currentCol - 1] - (columnsGap+padding);
        }
    });

    $('#rightScroll').click(function(){
        var container = document.querySelector('.container'),
            orders = document.querySelectorAll('.order'),
            columnsGap = parseInt($(container).css('-webkit-column-gap'), 10),
            padding = parseInt($(container).css('padding-left'), 10),
            positions = getColumnsLeft(orders),
            currentCol = getFirstVisibleColumnIndex(positions, container.scrollLeft);

        if (currentCol < positions.length - 1) {
            container.scrollLeft = positions[currentCol + 1] - (columnsGap + padding);
        }
    });

    $('#prevPage').click(function(){

        var container = document.querySelector('.container'),
            numcolumns= getNumberColumnsPerPage(container),
            orders = document.querySelectorAll('.order'),
            positions = getColumnsLeft(orders),
            currentCol = getFirstVisibleColumnIndex(positions, container.scrollLeft),
            columnsGap = parseInt($(container).css('-webkit-column-gap'), 10),
            padding = parseInt($(container).css('padding-left'), 10);

        currentCol = currentCol - numcolumns;
        if (currentCol > 0) {
            container.scrollLeft = positions[currentCol] - (columnsGap + padding);
        }
        else{
            container.scrollLeft = positions[0] - (columnsGap + padding);
        }
    });

    $('#nextPage').click(function(){

        var container = document.querySelector('.container'),
            numcolumns= getNumberColumnsPerPage(container),
            orders = document.querySelectorAll('.order'),
            positions = getColumnsLeft(orders),
            currentCol = getFirstVisibleColumnIndex(positions, container.scrollLeft),
            columnsGap = parseInt($(container).css('-webkit-column-gap'), 10),
            padding = parseInt($(container).css('padding-left'), 10);

        currentCol = currentCol + numcolumns;
        if (currentCol < positions.length) {
            container.scrollLeft = positions[currentCol] - (columnsGap + padding);
        }
        else{
            container.scrollLeft = positions[currentCol-1] - (columnsGap + padding);
        }
    });


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

    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    var getGUID = function(){
        guid = (S4() + S4() + "-" + S4() + "-4"
        + S4().substr(0,3) + "-" + S4() + "-"
        + S4() + S4() + S4()).toLowerCase();
        return guid;
    }


});