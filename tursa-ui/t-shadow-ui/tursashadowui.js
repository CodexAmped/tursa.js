function tursashadow(options){

    var images = document.querySelectorAll('shadowizard');

    if(options.shadow_type == 'soft') {
        options.shadow_type = '0px';
    }
    else if(options.shadow_type == 'medium') {
        options.shadow_type = '8px';
    }
    else if(options.shadow_type == 'hard') {
        options.shadow_type = '16px';
    }

    images.forEach(image => {
        image.style.boxShadow = `10px 10px ${options.shadow_type} 1px rgba(0,0,0,0.3)`;
    })
}
module.exports.tursashadow = tursashadow;