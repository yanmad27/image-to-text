var fs = require('fs');
const {convert} = require('html-to-text');

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


async function img2text(path) {
    var base64str = base64_encode(path);

    await fetch("https://www.imagetotext.info/image-to-text", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en,en-US;q=0.9,vi;q=0.8,vi-VN;q=0.7",
            "content-type": "multipart/form-data; boundary=----WebKitFormBoundarySizzd4AmZWwapUum",
            "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "_ga=GA1.1.367213182.1701000272; _ga_KJ1ZFKYBEY=GS1.1.1701000271.1.1.1701000492.0.0.0; XSRF-TOKEN=eyJpdiI6IlhGWEErQWloa1FxU3hxTElDdTRFU0E9PSIsInZhbHVlIjoiSnZ1cy8wR05oQUtCNTVqZWczWUdBc1VRYlZiSngzNTFTUUhSQ0VVdm5uZmFMc0FXenlWS1Rlc1YxWkJnK3Z1TGtCeGFuUUVTTEVFeG9qRnpYZmt2VW94UU9lNnVVMTNNSlpiZzVndllCa0xxRFZ3VDlZdnVIbTdDYjRVRlB6cy8iLCJtYWMiOiI4ZTFmMmJlNGJmN2UzNzY0ZDhhZWZiODdkYzlmZmJjNzY4YTU1YmQ1MjNjYmUwYTU1MTRhODk4NWYwZTBlMGIwIiwidGFnIjoiIn0%3D; image_to_text_session=eyJpdiI6IkF2Z215RDZHalJnUk9WTEp3S2RyMkE9PSIsInZhbHVlIjoiOEpTSnR4QjBtUVF2U1k0NkhSYUZiY1B1akJGcFpUZHhPZDdHRThzNURzeXE3YUMzL3R4U0JpNzVCbFcybEFTTURpSXBVb3crbVNxRlM0cnJ4TXJUTC9BVC83ZDVKVjlTcXBVZmkwcHpzL2UvVDZLRDhBamlocjdBRHcvY3A4MDkiLCJtYWMiOiI5NDA1OGNlYmJmOTI1MTJhYTMxNzYyYzA3MWUxOWRhMjJjZWQ1ZjAwNjkyYzEzNzQyYjc5MjY3NDU2MmYwZTYxIiwidGFnIjoiIn0%3D",
            "Referer": "https://www.imagetotext.info/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "------WebKitFormBoundarySizzd4AmZWwapUum\r\nContent-Disposition: form-data; name=\"base64\"\r\n\r\ndata:image/jpeg;base64," + base64str + "\r\n------WebKitFormBoundarySizzd4AmZWwapUum\r\nContent-Disposition: form-data; name=\"imgname\"\r\n\r\n1.jpg\r\n------WebKitFormBoundarySizzd4AmZWwapUum\r\nContent-Disposition: form-data; name=\"tool\"\r\n\r\n\r\n------WebKitFormBoundarySizzd4AmZWwapUum\r\nContent-Disposition: form-data; name=\"count\"\r\n\r\n0\r\n------WebKitFormBoundarySizzd4AmZWwapUum\r\nContent-Disposition: form-data; name=\"_token\"\r\n\r\njxIBASl3qaPb23XjJBeDeQJpnQWe3zEEGPQwSjqU\r\n------WebKitFormBoundarySizzd4AmZWwapUum--\r\n",
        "method": "POST"
    }).then((res) => res.json()).then((res) => {
        var html = res['text'];
        const options = {
            wordwrap: 130,
            // ...
        };
        const text = convert(html, options);
        fs.writeFileSync(path + '.txt', text);
        console.log('Done: ' + path)
    });
}

async function main() {
    var names = Array.from(Array(31).keys()).map((x) => x + 1);
    var files = names.map((x) => './images/' + x + '.jpg');

    for (var i = 0; i < files.length; i++) {
        await img2text(files[i]);
    }

}

main()