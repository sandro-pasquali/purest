
function mailchimp () {

    this.url = function (api, options) {

        // options or apikey
        if (options.dc || /.*-\w{2}\d+/.test(options.qs.apikey)) {
            var dc = options.dc
                ? options.dc
                : options.qs.apikey.replace(/.*-(\w{2}\d+)/,'$1');
            return [
                this.domain.replace('dc', dc),
                this.createPath(api, options)
            ].join('/');
        }
        // token
        else throw new Error('purest: specify data centre to use through the dc option!');
    }
}

exports = module.exports = mailchimp;