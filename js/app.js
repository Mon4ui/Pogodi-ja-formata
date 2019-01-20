"use strict"

var dragDropSampleApp = angular.module("dragDropSampleApp", []);

dragDropSampleApp.factory("draggableData", function () {
        var data = [
            {
                fruitname: "bafalo",
                fruitimg: "Bafalo.png"
        }, {
            fruitname: "buv",
            fruitimg: "Buv.png"
        }, {
                fruitname: "elen",
                fruitimg: "Elen.png"
        }, {
                fruitname: "kit",
                fruitimg: "Kit.png"
        }, {
                fruitname: "krokodil",
                fruitimg: "Krokodil.png"
        }, {
                fruitname: "kuche",
                fruitimg: "Kuche.png"
        }, {
                fruitname: "lastovica",
                fruitimg: "Lastovica.png"
        }, {
                fruitname: "lisica",
                fruitimg: "Lisica.png"
        }, {
                fruitname: "majmun",
                fruitimg: "Majmun.png"
        } ,  {
                fruitname: "meduza",
                fruitimg: "Meduza.png"
        }, {
                fruitname: "pchela",
                fruitimg: "Pchela.png"
        }, {
                fruitname: "pingvin",
                fruitimg: "Pingvin.png"
        }, {
                fruitname: "slon",
                fruitimg: "Slon.png"
        }, {
                fruitname: "zebra",
                fruitimg: "Zebra.png"
        }, {
                fruitname: "zhelka",
                fruitimg: "Zhelka.png"
        }, {
                fruitname: "zirafa",
                fruitimg: "Zirafa.png"
        }
    ];

        return data;
    }) //

dragDropSampleApp.factory("droppableData", function () {
    var data = [
        {
            fruitname: "bafalo",
            fruitimg: "Bafalo2.png"
    }, {
        fruitname: "buv",
        fruitimg: "Buv2.png"
    }, {
            fruitname: "elen",
            fruitimg: "Elen2.png"
    }, {
            fruitname: "kit",
            fruitimg: "Kit2.png"
    }, {
            fruitname: "krokodil",
            fruitimg: "Krokodil2.png"
    }, {
            fruitname: "kuche",
            fruitimg: "Kuche2.png"
    }, {
            fruitname: "lastovica",
            fruitimg: "Lastovica2.png"
    }, {
            fruitname: "lisica",
            fruitimg: "Lisica2.png"
    }, {
            fruitname: "majmun",
            fruitimg: "Majmun2.png"
    } ,  {
            fruitname: "meduza",
            fruitimg: "Meduza2.png"
    }, {
            fruitname: "pchela",
            fruitimg: "Pchela2.png"
    }, {
            fruitname: "pingvin",
            fruitimg: "Pingvin2.png"
    }, {
            fruitname: "slon",
            fruitimg: "Slon2.png"
    }, {
            fruitname: "zebra",
            fruitimg: "Zebra2.png"
    }, {
            fruitname: "zhelka",
            fruitimg: "Zhelka2.png"
    }, {
            fruitname: "zirafa",
            fruitimg: "Zirafa2.png"
    }
    ];

    return data;
}); ///

dragDropSampleApp.controller("MainController", ["$scope", "draggableData", "droppableData","$timeout" ,function ($scope, draggableData, droppableData,$timeout) {

    $scope.draggableArray = draggableData;
    $scope.droppableArray = droppableData;

    //shuffle the array for randomness
    $scope.draggableArray = _.shuffle($scope.draggableArray);
    $scope.droppableArray = _.shuffle($scope.droppableArray);

    $scope.draggableArrayLength = $scope.draggableArray.length;

    $scope.doraemonStatus = "sleeping";
    $scope.setDoraemonStatus = function (value) {
        $scope.$apply(function () {
            $scope.doraemonStatus = value;
        })
    }

    $scope.score = 0;
    $scope.setScore = function (value) {
        $scope.$apply(function () {
            $scope.score = $scope.score + value;
        });
    };

    $scope.$watch(function () {
        return $scope.score;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            console.log("array length", $scope.draggableArrayLength, "score", newVal)
            if (newVal == $scope.draggableArrayLength) {
                console.log("game over");
                $timeout(function(){
                    $scope.setDoraemonStatus("finish")
                },2000)
            }
        }
    });

    $scope.removeFromArray = function (value) {
        console.log(value);
        angular.forEach($scope.draggableArray, function (arrvalue, arrindex) {
            var fruitname = arrvalue.fruitname;
            if (fruitname == value) {
                $scope.matchedIndex = arrindex;
            }
        });
        $scope.$apply(function () {
            $scope.draggableArray.splice($scope.matchedIndex, 1);
        })
    }

}]); //

dragDropSampleApp.directive("dragme", ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        replace: true,
        scope: {
            myindex: "=",
            setDoraemon: "&"
        },
        link: function ($scope, $elem, $attr) {
            var backgroundImage = $attr.backgroundimage;
            var answerData = $attr.answerdata;
            var myBgcolor = $attr.bgcolor;
            var myLeft = parseInt($attr.left);

            $elem.addClass("draggable");
            $elem.attr("data-answerimage", backgroundImage);
            $elem.attr("data-answerdata", answerData);
            $elem.attr("data-myindex", $scope.myindex);

            $elem.css({
                left: myLeft,
                backgroundImage: "url(img/" + backgroundImage + ")"
            });

            $elem.draggable({
                helper: "clone",
                revert: true,
                appendTo: "body",
                zIndex: 100,
                drag: function (event, ui) {
                    $(ui.helper).css("border", "0px");
                    $scope.setDoraemon({
                        value: "dragging"
                    })
                }
            })

        }
    }
}]); ///

dragDropSampleApp.directive("dropme", ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        replace: true,
        scope: {
            setScore: "&",
            removeArray: "&",
            setDoraemon: "&"
        },
        link: function ($scope, $elem, $attr) {
            var backgroundImage = $attr.backgroundimage;
            var answerData = $attr.fruitname;

            $elem.addClass("droppable");
            $elem.attr("data-answerimage", backgroundImage);
            $elem.attr("data-answerdata", answerData);
            $elem.css({
                backgroundImage: "url(img/" + backgroundImage + ")"
            });
            $elem.droppable({
                accept: ".draggable",
                drop: function (event, ui) {
                    var droppedElem = ui.draggable;
                    var myAnswer = $(this).attr("data-answerdata");
                    if ($(droppedElem).attr("data-answerdata") == myAnswer) { //if both match
                        $(this).css("background-image", "url(img/" + droppedElem.attr("backgroundimage") + ")");
                        $(this).attr("data-isanswered", "yes");
                        $scope.setScore({
                            value: 1
                        });
                        $scope.removeArray({
                            value: $(droppedElem).attr("data-answerdata")
                        });
                        $scope.setDoraemon({
                            value: "happy"
                        })
                    } else {
                        $(this).effect("shake");
                        $scope.setDoraemon({
                            value: "tease"
                        })
                    }

                }
            })
        }
    }
}]); ///