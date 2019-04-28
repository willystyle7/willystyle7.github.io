// ----- DRAW PIE CHART -----

// This is how you structure JSON data
// var data = '{"expenditures":[{"type":"Healthcare", "percent":"8"},{"type":"Insurance", "percent":"12"},{"type":"Food", "percent":"13"},{"type":"Housing", "percent":"33"},{"type":"Transportation", "percent":"16"},{"type":"Apparel", "percent":"3"},{"type":"Entertainment", "percent":"5"},{"type":"Healthcare", "percent":"8"},{"type":"Other", "percent":"2"}]}';
document.getElementById('json-data').value = '{"expenditures":[{"type":"Healthcare", "percent":"8"},{"type":"Insurance", "percent":"12"},{"type":"Food", "percent":"13"},{"type":"Housing", "percent":"33"},{"type":"Transportation", "percent":"16"},{"type":"Apparel", "percent":"3"},{"type":"Entertainment", "percent":"5"},{"type":"Healthcare", "percent":"8"},{"type":"Other", "percent":"2"}]}';

// This data is structured as an array of expenditure objects
// like this
// class Expenditures {
//     constructor(type, percent) {
//         this.type = type,
//         this.percent = percent;
//     }
// }

// Will hold JSON data pulled from the textarea
let data;

// Will hold array of expenditures
let expenditureArray = [];

// Will hold array of percentages converted so they can
// be used to draw the pie chart
let percentArray = [];

// Will hold randomly generated color hex codes
let colorArray = [];

function drawChart() {
    // Get data pasted into textarea
    data = document.getElementById('json-data').value;

    // Will hold the calculated percentages of the pie
    // each category will take up
    percentArray = createPercentArray();

    // Will store an array of random color hex codes
    colorArray = createRandomColorArray();

    // Will convert JSON data into an array of objects
    populateArray(data);

    // Draws pie chart and lables
    drawPie();
}

// Pulls data from JSON and saves it into array
// expenditureArray
function populateArray(jsonData) {
    // Create an array populated with expense data
    let expenseArray = JSON.parse(jsonData);

    // Cycle through data and put it in our array
    for (i = 0; i < expenseArray.expenditures.length; i++) {
        // Get each object in the array
        let expense = expenseArray.expenditures[i];
        expenditureArray[i] = expense;
    }
}

// Create an array where we convert our percentages so
// that they total up to 2 [100 * .02 = 2]
function createPercentArray() {
    let perArr = [];
    for (i = 0; i < expenditureArray.length; i++) {
        perArr[i] = expenditureArray[i].percent * 0.02;
    }
    return perArr;
}

function createRandomColorArray() {
    let randColorArr = [];
    for (i = 0; i < expenditureArray.length; i++) {
        // Generate random base 16 hex code
        // 16777215 = FFFFFF
        // toString(16) returns base 16 of provided number
        randColorArr[i] =
            '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    return randColorArr;
}

function drawPie() {
    // Get reference to canvas
    var canvas = document.getElementById('canvas');

    // Gives you the ability to draw 2D shapes, text,
    // images, etc.
    var context = canvas.getContext('2d');

    // Start drawing arc at 0
    let startAngle = 0;
    let endAngle = 0;

    for (i = 0; i < percentArray.length; i++) {
        // Start the next arc where the last arc left off
        startAngle = endAngle;
        endAngle = endAngle + percentArray[i] * Math.PI;

        drawSlice(context, 300, 200, 150, startAngle, endAngle, colorArray[i]);

        // Have to multiply by 50 because original data
        // was multiplied times .02
        drawSliceText(
            context,
            300,
            200,
            150,
            startAngle,
            endAngle,
            percentArray[i] * 50
        );
    }
}

function drawSlice(
    ctx,
    sliceCenterX,
    sliceCenterY,
    radius,
    startAngle,
    endAngle,
    color
) {
    // fillStyle : Color, Gradient or Pattern used to fill shapes
    ctx.fillStyle = color;

    // Signal that you want to start drawing a path
    ctx.beginPath();

    // ----- Code used to separate slices -----
    // Get median angle
    let medianAngle = (startAngle + endAngle) / 2;

    // Get offset amount from center
    // Increace multiple to increase offset
    xOffset = Math.cos(medianAngle) * 30;
    yOffset = Math.sin(medianAngle) * 30;

    // Define start of drawing area
    // Delete offsets to have a normal pie chart
    ctx.moveTo(sliceCenterX + xOffset, sliceCenterY + yOffset);

    // Draw arc for pie slice
    ctx.arc(
        sliceCenterX + xOffset,
        sliceCenterY + yOffset,
        radius,
        startAngle,
        endAngle
    );

    // Close the pie slice
    ctx.closePath();

    // Fill the pie slice
    ctx.fill();
}

function drawSliceText(
    ctx,
    sliceCenterX,
    sliceCenterY,
    radius,
    startAngle,
    endAngle,
    percentText
) {
    // Draw Text
    // Get Median Angle : (startAngle + endAngle)/2
    // I define where to place text using polar coordinates
    // They are defined in Cartesian coordinates using
    // x = radius * cos(angular coordinate)
    // y = radius * sin(angular coordinate)
    let textX = sliceCenterX + Math.cos((startAngle + endAngle) / 2) * radius;
    let textY = sliceCenterY + Math.sin((startAngle + endAngle) / 2) * radius;
    ctx.fillStyle = 'black';
    ctx.font = '24px Calibri';
    ctx.fillText(percentText, textX, textY);
}
