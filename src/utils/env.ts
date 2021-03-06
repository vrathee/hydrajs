// Since we aren't transpiling to babel can't use ES6 imports here
const Uri = require('jsuri');
const btoa = require('btoa-lite');

export function createBasicAuth(user: string, pass: string) {
    return `Basic ${btoa(user + ':' + pass)}`;
}

let hydraHostName = new Uri('');
let pathPrefix = '/hydra/rest';
let auth = null;

if (process && process.env && process.env.RHN_USER) {
    auth = createBasicAuth(process.env.RHN_USER, process.env.RHN_PASS);
}

if (process && process.env && process.env.HYDRA_HOSTNAME) {
    hydraHostName = new Uri(process.env.HYDRA_HOSTNAME);
} else if (typeof window !== 'undefined' && window) {
    if (window.location.hostname === 'access.redhat.com' || window.location.hostname === 'prod.foo.redhat.com' || window.location.hostname === 'fooprod.redhat.com') {
        hydraHostName = new Uri('http://cee-integration-admin.dist.prod.ext.phx2.redhat.com/hydra/rest/');
    } else if (window.location.hostname === 'access.qa.redhat.com' || window.location.hostname === 'qa.foo.redhat.com' || window.location.hostname === 'fooqa.redhat.com') {
        hydraHostName = new Uri('http://qa-cee-integration-admin.dist.qa.ext.phx1.redhat.com/hydra/rest/');
    } else if (window.location.hostname === 'access.devgssfte.devlab.phx1.redhat.com' || window.location.hostname === 'fte.foo.redhat.com' || window.location.hostname === 'foofte.redhat.com') {
        hydraHostName = new Uri('http://fuseadmin-corp-dev-redhat-com.vserver.devlab.ext.phx1.redhat.com/hydra/rest/');
    } else if (window.location.hostname === 'access.devgssci.devlab.phx1.redhat.com' || window.location.hostname === 'ci.foo.redhat.com' || window.location.hostname === 'fooci.redhat.com') {
        hydraHostName = new Uri('http://fuseadmin-corp-dev-redhat-com.vserver.devlab.ext.phx1.redhat.com/hydra/rest/');
    } else if (window.location.hostname === 'access.stage.redhat.com' || window.location.hostname === 'stage.foo.redhat.com' || window.location.hostname === 'foostage.redhat.com') {
        hydraHostName = new Uri('http://cee-integration-admin.dist.stage.ext.phx2.redhat.com/hydra/rest/');
    }
} else {
    throw new Error('Could not determine hostname, if you are running in Node make sure to set the HYDRA_HOSTNAME, RHN_USER, and RHN_PASS env variables.');
}

export default class Env {
    public static hydraHostName: Uri = hydraHostName;
    public static pathPrefix: string = pathPrefix;
    public static auth: string = auth;
}
