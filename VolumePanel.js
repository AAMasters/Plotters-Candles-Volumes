﻿
function newAAMastersPlottersCandlesVolumesVolumesVolumePanel() {

    var thisObject = {
        onEventRaised: onEventRaised,
        container: undefined,
        draw: draw,
        getContainer: getContainer,
        initialize: initialize
    };

    var container = newContainer();
    container.initialize();
    thisObject.container = container;

    container.displacement.containerName = "Current Volume Panel";
    container.frame.containerName = "Current Volume Panel";

    let currentVolume;

    return thisObject;

    function initialize() {

        thisObject.container.frame.width = UI_PANEL.WIDTH.NORMAL;
        thisObject.container.frame.height = UI_PANEL.HEIGHT.NORMAL;

        thisObject.container.frame.position.x = viewPort.visibleArea.topRight.x - thisObject.container.frame.width;
        thisObject.container.frame.position.y = viewPort.visibleArea.bottomLeft.y - thisObject.container.frame.height;

    }

    function getContainer(point) {

        var container;

        /* First we check if this point is inside this space. */

        if (this.container.frame.isThisPointHere(point, true) === true) {

            return this.container;

        } else {

            /* This point does not belong to this space. */

            return undefined;
        }

    }


    function onEventRaised(lastCurrentVolume) {

        currentVolume = lastCurrentVolume;

    }


    function draw() {

        this.container.frame.draw(false, false, true);

        plotCurrentVolumeInfo();

    }


    function plotCurrentVolumeInfo() {

        if (currentVolume === undefined) { return; }
        if (currentVolume.innerVolumeBar === undefined) { return; }

        const frameBodyHeight = thisObject.container.frame.getBodyHeight();
        const frameTitleHeight = thisObject.container.frame.height - frameBodyHeight;

        const X_AXIS = thisObject.container.frame.width / 2;
        const Y_AXIS_BUY = frameTitleHeight + frameBodyHeight * 0.85;
        const Y_AXIS_SELL = frameTitleHeight + frameBodyHeight * 0.15;

        var buyVolumePoint1 = {
            x: X_AXIS - currentVolume.buyInfo.baseWidth / 2,
            y: Y_AXIS_BUY
        };

        var buyVolumePoint2 = {
            x: X_AXIS - currentVolume.buyInfo.topWidth / 2,
            y: Y_AXIS_BUY + currentVolume.buyInfo.height
        };

        var buyVolumePoint3 = {
            x: X_AXIS + currentVolume.buyInfo.topWidth / 2,
            y: Y_AXIS_BUY + currentVolume.buyInfo.height
        };

        var buyVolumePoint4 = {
            x: X_AXIS + currentVolume.buyInfo.baseWidth / 2,
            y: Y_AXIS_BUY
        };

        buyVolumePoint1 = thisObject.container.frame.fitIntoFrame(buyVolumePoint1);
        buyVolumePoint2 = thisObject.container.frame.fitIntoFrame(buyVolumePoint2);
        buyVolumePoint3 = thisObject.container.frame.fitIntoFrame(buyVolumePoint3);
        buyVolumePoint4 = thisObject.container.frame.fitIntoFrame(buyVolumePoint4);

        buyVolumePoint1 = thisObject.container.frame.frameThisPoint(buyVolumePoint1);
        buyVolumePoint2 = thisObject.container.frame.frameThisPoint(buyVolumePoint2);
        buyVolumePoint3 = thisObject.container.frame.frameThisPoint(buyVolumePoint3);
        buyVolumePoint4 = thisObject.container.frame.frameThisPoint(buyVolumePoint4);

        var sellVolumePoint1 = {
            x: X_AXIS - currentVolume.buyInfo.baseWidth / 2,
            y: Y_AXIS_SELL
        };

        var sellVolumePoint2 = {
            x: X_AXIS - currentVolume.buyInfo.topWidth / 2,
            y: Y_AXIS_SELL + currentVolume.sellInfo.height
        };

        var sellVolumePoint3 = {
            x: X_AXIS + currentVolume.buyInfo.topWidth / 2,
            y: Y_AXIS_SELL + currentVolume.sellInfo.height
        };

        var sellVolumePoint4 = {
            x: X_AXIS + currentVolume.buyInfo.baseWidth / 2,
            y: Y_AXIS_SELL
        };

        sellVolumePoint1 = thisObject.container.frame.fitIntoFrame(sellVolumePoint1);
        sellVolumePoint2 = thisObject.container.frame.fitIntoFrame(sellVolumePoint2);
        sellVolumePoint3 = thisObject.container.frame.fitIntoFrame(sellVolumePoint3);
        sellVolumePoint4 = thisObject.container.frame.fitIntoFrame(sellVolumePoint4);

        sellVolumePoint1 = thisObject.container.frame.frameThisPoint(sellVolumePoint1);
        sellVolumePoint2 = thisObject.container.frame.frameThisPoint(sellVolumePoint2);
        sellVolumePoint3 = thisObject.container.frame.frameThisPoint(sellVolumePoint3);
        sellVolumePoint4 = thisObject.container.frame.frameThisPoint(sellVolumePoint4);

        const OPACITY = '0.40';

        browserCanvasContext.beginPath();

        browserCanvasContext.moveTo(buyVolumePoint1.x, buyVolumePoint1.y);
        browserCanvasContext.lineTo(buyVolumePoint2.x, buyVolumePoint2.y);
        browserCanvasContext.lineTo(buyVolumePoint3.x, buyVolumePoint3.y);
        browserCanvasContext.lineTo(buyVolumePoint4.x, buyVolumePoint4.y);

        browserCanvasContext.closePath(); 

        browserCanvasContext.strokeStyle = 'rgba(' + UI_COLOR.PATINATED_TURQUOISE + ', ' + OPACITY + ')';
        browserCanvasContext.fillStyle = 'rgba(' + UI_COLOR.GREEN + ', ' + OPACITY + ')';

        browserCanvasContext.fill();

        browserCanvasContext.lineWidth = 1;
        browserCanvasContext.stroke();


        browserCanvasContext.beginPath();

        browserCanvasContext.moveTo(sellVolumePoint1.x, sellVolumePoint1.y);
        browserCanvasContext.lineTo(sellVolumePoint2.x, sellVolumePoint2.y);
        browserCanvasContext.lineTo(sellVolumePoint3.x, sellVolumePoint3.y);
        browserCanvasContext.lineTo(sellVolumePoint4.x, sellVolumePoint4.y);

        browserCanvasContext.closePath();

        browserCanvasContext.strokeStyle = 'rgba(' + UI_COLOR.RED + ', ' + OPACITY + ')';
        browserCanvasContext.fillStyle = 'rgba(' + UI_COLOR.RUSTED_RED + ', ' + OPACITY + ')';

        browserCanvasContext.fill();

        browserCanvasContext.lineWidth = 1;
        browserCanvasContext.stroke();


        /* put the labels with the volumes values */

        browserCanvasContext.beginPath();

        printLabel('Buy Volume', X_AXIS, frameTitleHeight + frameBodyHeight * 0.95, '1');
        printLabel(currentVolume.innerVolumeBar.amountBuy, X_AXIS, frameTitleHeight + frameBodyHeight * 0.90, '0.50');

        printLabel('Sell Volume', X_AXIS, frameTitleHeight + frameBodyHeight * 0.05, '1');
        printLabel(currentVolume.innerVolumeBar.amountSell, X_AXIS, frameTitleHeight + frameBodyHeight * 0.10, '0.50');


        function printLabel(labelToPrint, x, y, opacity) {

            let labelPoint;
            let fontSize = 10;

            browserCanvasContext.font = fontSize + 'px ' + UI_FONT.SECONDARY;

            let label = '' + labelToPrint;
            if (isNaN(label) === false) {
                label = Number(label).toLocaleString();
            }

            let xOffset = label.length / 2 * fontSize * FONT_ASPECT_RATIO;

            labelPoint = {
                x: x - xOffset,
                y: y
            };

            labelPoint = thisObject.container.frame.frameThisPoint(labelPoint);

            browserCanvasContext.fillStyle = 'rgba(' + UI_COLOR.DARK + ', ' + opacity + ')';
            browserCanvasContext.fillText(label, labelPoint.x, labelPoint.y);

        }

        browserCanvasContext.closePath();
        browserCanvasContext.fill();

    }


}

