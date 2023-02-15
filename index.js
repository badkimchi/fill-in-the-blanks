document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            console.log(fr.result)
            // pdf(fr.result).then(function(data) {
            //     // number of pages
            //     console.log(data.numpages);
            //     // number of rendered pages
            //     console.log(data.numrender);
            //     // PDF info
            //     console.log(data.info);
            //     // PDF metadata
            //     console.log(data.metadata);
            //     // PDF.js version
            //     // check https://mozilla.github.io/pdf.js/getting_started/
            //     console.log(data.version);
            //     // PDF text
            //     console.log(data.text);
            //
            // });
        }

        fr.readAsText(this.files[0]);
    })