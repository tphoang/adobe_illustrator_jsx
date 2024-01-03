
// =================================
// JS utility functions
// =================================

// =================================
// AI Color Function Library
// =================================

/**
 * decimalToHex takes a number and returns it converted base 16, aka hex
 * @param {number} decimal number to convert to hex
 * @returns {String} a hex string
 */
function decimalToHex(decimal) {
    var hex = decimal.toString(16);
    return hex;
};

/**
 * hexToDecimal takes a base 16 number and returns it converted to decimal
 * @param {String} hex a hex string
 * @returns {number} hex as decimal
 */
function hexToDecimal(hex) {
    var decimal = parseInt(hex, 16);
    return decimal;
};

/**
 * padPrefix takes a string `s`, a desired width `width`, and a padding
 * character `padChar`, and returns a string. If the length of `s` is
 * less than `width`, `padChar` will be used to fill in the space.
 * @param {String} s string to be padded
 * @param {number} width desired width for the string
 * @param {String} padChar character to pad string
 * @returns {String} the padded string
 */
function padPrefix(s, width, padChar) {
    var paddedS = s;

    if (s.length < width) {
        var padding = new Array(width - paddedS.length + 1).join(padChar);
        var paddedS = padding + s;
    }

    return paddedS;
};

/**
 * RGBToHex takes numeric values for red, green, and blue, and returns
 * a hex string.
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 * @returns {String} a hex string
 */
function RGBToHex(r, g, b) {
    if (r < 0 || r > 255) alert("Red value should be between 0-255: " + r);
    if (g < 0 || g > 255) alert("Green value should be between 0-255: " + g);
    if (b < 0 || b > 255) alert("Blue value should be between 0-255: " + b);

    // Convert to hex
    r_hex = decimalToHex(r);
    g_hex = decimalToHex(g);
    b_hex = decimalToHex(b);

    // Pad any values that are a single character
    r_hex = padPrefix(r_hex, 2, "0");
    g_hex = padPrefix(g_hex, 2, "0");
    b_hex = padPrefix(b_hex, 2, "0");

    // Create hex string
    hex = "#" + r_hex + g_hex + b_hex;

    return hex;
};

/**
 * hexToRGB takes a hex string and returns a structure with r, g, and b
 * fields.
 * @param {String} hex hex string representing an html color value
 * @returns {Object} Object with values for r, g, and b
 */
function hexToRGB(hex) {
    // Remove leading "#" from "#000" or "#000000"
    if ((hex.length == 4 || hex.length == 7) && hex[0] == "#") {
        hex = hex.slice(1);
    }

    // Convert "RGB" to "RRGGBB"
    if (hex.length == 3) {
        var new_hex = "";
        for (var i = 0; i < hex.length; i++) {
            new_hex += hex[i] + hex[i];
        }
        hex = new_hex;
    }

    // Extract color values
    var r = hex.slice(0, 2);
    var g = hex.slice(2, 4);
    var b = hex.slice(4, 6);

    // Convert to decimal
    var r_decimal = hexToDecimal(r);
    var g_decimal = hexToDecimal(g);
    var b_decimal = hexToDecimal(b);

    return { r: r_decimal, g: g_decimal, b: b_decimal };
};

/**
 * convertColor Translates color values from one format, like CMYK, to
 * another, like RGB. If the destFormat is RGB, the return value is an
 * array with 3 items: R, G, and B.
 * @param {String} srcFormat Color format of the source data
 * @param {String} destFormat Color format we are converting to
 * @param {Object} colorArray Source data
 * @returns {Object} An array of colors
 */
function convertColor(srcFormat, destFormat, colorArray) {
    var srcColorSpace = ImageColorSpace[srcFormat];
    var destColorSpace = ImageColorSpace[destFormat];

    return app.convertSampleColor(srcColorSpace, colorArray, destColorSpace, ColorConvertPurpose.defaultpurpose);
}


/**
 * RGBtoCMYK converts r, g, and b values into CMYK and returns an
 * object with c, m, y, and k fields.
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 * @returns {Object} Object with c, m, y, and k fields
 */
function RGBToCMYK(r, g, b) {
    var colors = [Math.round(r), Math.round(g), Math.round(b)];
    var cmyk = convertColor("RGB", "CMYK", colors);

    return { c: cmyk[0], m: cmyk[1], y: cmyk[2], k: cmyk[3] }
}

/**
 * CMYKtoRGB converts c, m, y, and k values into RGB and returns a
 * structure with r, g, and b fields.
 * @param {number} c cyan
 * @param {number} m magenta
 * @param {number} y yellow
 * @param {number} k black
 * @returns {Object} Object with r, g, and b fields
 */
function CMYKToRGB(c, m, y, k) {
    var colors = [Math.round(c), Math.round(m), Math.round(y), Math.round(k)]
    var rgb = convertColor("CMYK", "RGB", colors);

    return { r: rgb[0], g: rgb[1], b: rgb[2] };
}

/**
 * fromRGB is a conversion function to go from RGB to every format
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 * @returns {Object} Object with values for rgb, hex, and cmyk
 */
function fromRGB(r, g, b) {
    var hex = RGBToHex(r, g, b);
    var cmyk = RGBToCMYK(r, g, b);

    var c = Math.round(cmyk.c);
    var m = Math.round(cmyk.m);
    var y = Math.round(cmyk.y);
    var k = Math.round(cmyk.k);

    return {
        r: r,
        g: g,
        b: b,
        hex: hex,
        c: c,
        m: m,
        y: y,
        k: k,
    };
};

/**
 * fromHex is a conversion function to go from Hex to every format
 * @param {String} hex hex string representing an html color value
 * @returns {Object} Object with values for rgb, hex, and cmyk
 */
function fromHex(hex) {
    var rgb = HexToRGB(hex);

    var r = Math.round(rgb.r);
    var g = Math.round(rgb.g);
    var b = Math.round(rgb.b);

    var cmyk = RGBToCMYK(r, g, b);

    var c = Math.round(cmyk.c);
    var m = Math.round(cmyk.m);
    var y = Math.round(cmyk.y);
    var k = Math.round(cmyk.k);

    return {
        r: r,
        g: g,
        b: b,
        hex: hex,
        c: c,
        m: m,
        y: y,
        k: k,
    };
};

/**
 * fromCMYK is a conversion function to go from CMYK to every format
 * @param {number} c cyan
 * @param {number} m magenta
 * @param {number} y yellow
 * @param {number} k black
 * @returns {Object} Object with values for rgb, hex, and cmyk
 */
function fromCMYK(c, m, y, k) {
    var rgb = CMYKToRGB(c, m, y, k);

    var r = Math.round(rgb.r);
    var g = Math.round(rgb.g);
    var b = Math.round(rgb.b);

    var hex = RGBToHex(r, g, b);

    return {
        r: r,
        g: g,
        b: b,
        hex: hex,
        c: c,
        m: m,
        y: y,
        k: k,
    };
};

function fromCMYKColor(color) {
    var c = Math.round(color.cyan);
    var m = Math.round(color.magenta);
    var y = Math.round(color.yellow);
    var k = Math.round(color.black);

    return fromCMYK(c, m, y, k);
};

function fromRGBColor(color) {
    var r = Math.round(color.red);
    var g = Math.round(color.green);
    var b = Math.round(color.blue);

    return fromRGB(r, g, b);
};


function fromSpotColor(spotColor) {
    var color = spotColor.spot.color;
    if(color.typename == 'CMYKColor'){
        return fromCMYKColor(color);
    }else if(color.typename == 'RGBColor'){
        return fromRGBColor(color);
    }else{
        return null;
    }
};

function convertSpotToCMYKColor(spotColor) {
    // Create a new CMYK color with the spot color's tint
    const cmykColor = new CMYKColor();
    cmykColor.tint = spotColor.tint;
    cmykColor.color = spotColor.color;
    return cmykColor;
}

function convertAiColorToHex(color) {
    try {
        // Check the type of the color object
        switch (color.typename) {
            case "RGBColor":
                var c = fromRGBColor(color);
                return c.hex;
            case "CMYKColor":
                var c = fromCMYKColor(color);
                return c.hex;
            case "GrayColor":
                // Convert the gray value to RGB value
                var g = Math.round(color.gray);
                var c = fromRGB(g, g, g)
                return c.hex;
            case "SpotColor":
                var c = fromSpotColor(color);
                return c.hex;
            default:
                // Return an error message if the color type is not supported
                return null;
        }
    } catch (err) {
        //return color.typename + err.stack;
        return null;
    }
}

// =================================
// AI Color Function Library
// =================================
