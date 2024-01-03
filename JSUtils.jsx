// =================================
// JS utility functions
// =================================

function UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function isInlist(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (obj == list[i]) {
            return true;
        }
    }
    return false;
}

function isTrue(val) {
    return val == 'true' || val == 'yes' || val === true;
}

function forEach(arr, cb) {
    for (var i = 0, n = arr.length; i < n; i++) {
        cb(arr[i], i);
    }
}

function forEachReverse(arr, cb) {
    for (var i = arr.length - 1; i >= 0; i--) {
        cb(arr[i], i);
    }
}

function map(arr, cb) {
    var arr2 = [];
    for (var i = 0, n = arr.length; i < n; i++) {
        arr2.push(cb(arr[i], i));
    }
    return arr2;
}

function filter(arr, test) {
    var filtered = [];
    for (var i = 0, n = arr.length; i < n; i++) {
        if (test(arr[i], i)) {
            filtered.push(arr[i]);
        }
    }
    return filtered;
}


// obj: value or test function
function indexOf(arr, obj) {
    var test = typeof obj == 'function' ? obj : null;
    for (var i = 0, n = arr.length; i < n; i++) {
        if (test ? test(arr[i]) : arr[i] === obj) {
            return i;
        }
    }
    return -1;
}

function find(arr, obj) {
    var i = indexOf(arr, obj);
    return i == -1 ? null : arr[i];
}

function contains(arr, obj) {
    return indexOf(arr, obj) >= 0;
}

// alias for contains() with function arg
function some(arr, cb) {
    return indexOf(arr, cb) >= 0;
}

function extend(o) {
    for (var i = 1; i < arguments.length; i++) {
        forEachProperty(arguments[i], add);
    }

    function add(v, k) {
        o[k] = v;
    }
    return o;
}

function forEachProperty(o, cb) {
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            cb(o[k], k);
        }
    }
}

// Return new object containing properties of a that are missing or different in b
// Return null if output object would be empty
// a, b: JS objects
function objectDiff(a, b) {
    var diff = null;
    for (var k in a) {
        if (a[k] != b[k] && a.hasOwnProperty(k)) {
            diff = diff || {};
            diff[k] = a[k];
        }
    }
    return diff;
}

function hasOwnProperty(obj, property) {
    var b = false;
    try {
        var o = obj[property];
        b = true;
    } catch (err) {}
    return b;
}

function zeroPad(val, digits) {
    var str = String(val);
    while (str.length < digits) str = '0' + str;
    return str;
}

function getDateTimeStamp() {
    var d = new Date();
    var year = d.getFullYear();
    var date = zeroPad(d.getDate(), 2);
    var month = zeroPad(d.getMonth() + 1, 2);
    var hour = zeroPad(d.getHours(), 2);
    var min = zeroPad(d.getMinutes(), 2);
    return year + '-' + month + '-' + date + ' ' + hour + ':' + min;
}

function truncateString(str, maxlen, useEllipsis) {
    // TODO: add ellipsis, truncate at word boundary
    if (str.length > maxlen) {
        str = str.substr(0, maxlen);
        if (useEllipsis) str += '...';
    }
    return str;
}


function saveTextFile(dest, contents) {
    var fd = new File(dest);
    fd.open('w', 'TEXT', 'TEXT');
    fd.lineFeed = 'Unix';
    fd.encoding = 'UTF-8';
    fd.writeln(contents);
    fd.close();
}

// =================================
// JS utility functions
// =================================
