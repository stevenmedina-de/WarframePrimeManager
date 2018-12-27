module.exports = function parseTransactionItems(concatenatedString) {
    var startSlice = 0;
    var parsedItems = [];

    for (var i = 0; i != concatenatedString.length; i++) {
        if (concatenatedString.charAt(i) === '_' || i === concatenatedString.length - 1) {
            if (i === concatenatedString - 1) {
                parsedItems.push(concatenatedString.substring(startSlice));
            }
            else {
                parsedItems.push(concatenatedString.substring(startSlice, i));
                startSlice = i + 1;
            }

        }
    }

    return parsedItems;
}