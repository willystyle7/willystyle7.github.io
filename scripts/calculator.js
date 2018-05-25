$(function () {

    $(".clean").click(function () {
        var target = $(this).data("target");
        $(target).val("");
    });

    $(".backspace").click(function () {
        var target = $(this).data("target");
        var temp = $(target).val();
        temp = temp.substring(0, temp.length - 1);
        $(target).val(temp);
    });

    $(".sign").click(function () {
        var target = $(this).data("target");
        var temp = $(target).val();
        if (temp[0] === "-") {
            temp = temp.substring(1, temp.length);
        } else {
            temp = '-' + temp;
        }
        $(target).val(temp);
    });

    $(".digit").click(function () {
        var target = $(this).data("target");
        var Res = $(target).val() + $(this).text();
        $(target).val(Res);
    });
    
    $('.operators').click(function (e) {
        var target = $(this).data("target");
        var interRes = $(target).data("result");
        var operator = $(target).data("operator");
        var value1 = $(target).val();
        if (interRes != undefined) {
            var result = ApplyOperation(interRes, value1, operator);
            interRes = result;
        } else {
            interRes = value1;
        }
        operator = $(this).text();
        $(target).val("");
        $(target).data("result", interRes);
        $(target).data("operator", operator);
    });

    $('.calculate').click(function () {
        var target = $(this).data("target");
        var interRes = $(target).data("result");
        var operator = $(target).data("operator");
        var value1 = $(target).val();
        if (interRes != undefined) {
          var result = ApplyOperation(interRes, value1, operator);
          interRes = result;
        } else {
          interRes = value1;
        }
        $(target).val(interRes);
        $(target).data("result", undefined);
        $(target).data("operator", undefined);
    });

    function ApplyOperation(value1, value2, operator) {
        let result;
        let number1 = parseFloat(value1);
        let number2 = parseFloat(value2);
        switch (operator) {
            case "+":
                result = number1 + number2;
                break;
            case "-":
                result = number1 - number2;
                break;
            case "*":
                result = number1 * number2;
                break;
            case "/":
                result = number1 / number2;
                break;
        }
        return result;
    }

});