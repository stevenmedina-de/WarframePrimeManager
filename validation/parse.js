module.exports = function parseTransactionItems(concatenatedString) {
    var startSlice = 0;
    var parsedItems = [];

    for (var i = 0; i < concatenatedString.length; i++) {
        if (concatenatedString.charAt(i) === '_') {

            parsedItems.push(concatenatedString.substring(startSlice, i));
            startSlice = i + 1;
        }
    }

    return parsedItems;
}