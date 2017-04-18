/**
 * Created by kh.levon98 on 13-Sep-16.
 */
const AppConstants = {
    env: "local",
    jwtKey: 'token',
    appName: 'Rodin',

    local: {
        COOKIEDOMAIN: ['localhost', '.rodin.space'],
        // API: 'https://api.rodin.space/api',
        API: 'http://localhost:3000/api',
        SOCKET: 'https://ss.rodin.space/api',
        SITE: 'http://localhost:8585/#/',
        PREVIEW: 'https://rodin.space/projects/',
        PUBLIC: 'https://rodin.space/public/',
        PUBLISH: `https://rodin.space/`,
        EDITOR: 'http://localhost:8000/#/',
        GITHUB: '2350afe57c144672285b',
    },
    dev: {
        COOKIEDOMAIN: ['.rodin.space'],
        API: 'https://api.rodin.space/api',
        SOCKET: 'https://ss.rodin.space/api',
        SITE: 'https://rodin.space/',
        PREVIEW: 'https://rodin.space/projects/',
        PUBLIC: 'https://rodin.space/public/',
        PUBLISH: `https://rodin.space/`,
        EDITOR: 'https://editor.rodin.space/',
        GITHUB: 'fa69c03ad5758fce1f10',

    },
    prod: {
        COOKIEDOMAIN: ['.rodinapp.com', '.rodin.io', '.rodin.space'],
        API: `${window.location.protocol}//api.${window.extractDomain()}/api`,
        SOCKET: `${window.location.protocol}//ss.rodin.space/api`,
        SITE: `${window.location.protocol}//${window.extractDomain()}/`,
        PREVIEW: `${window.location.protocol}//${window.extractDomain()}/projects/`,
        PUBLIC: `${window.location.protocol}//${window.extractDomain()}/public/`,
        PUBLISH: `${window.location.protocol}//${window.extractDomain()}/`,
        EDITOR: `${window.location.protocol}//editor.${window.extractDomain()}/`,
        GITHUB: '5377f212205e0aa4b4cf',

    },
    stage: {
        COOKIEDOMAIN: ['.rodin.design'],
        API: `${window.location.protocol}//api.${window.extractDomain()}/api`,
        SOCKET: 'https://ss.rodin.space/api',
        //SOCKET: `${window.location.protocol}//ss.rodin.space/api`,
        SITE: `${window.location.protocol}//${window.extractDomain()}/`,
        PREVIEW: `${window.location.protocol}//${window.extractDomain()}/projects/`,
        PUBLIC: `${window.location.protocol}//${window.extractDomain()}/public/`,
        PUBLISH: `${window.location.protocol}//${window.extractDomain()}/`,
        EDITOR: `${window.location.protocol}//editor.${window.extractDomain()}/`,
        GITHUB: 'd2030c37902fa3d4d0c7',
    },

    get API() {
        return this[this.env].API;
    },

    get SITE() {
        return this[this.env].SITE;
    },

    get SOCKET() {
        return this[this.env].SOCKET;
    },

    get PREVIEW() {
        return this[this.env].PREVIEW;
    },

    get PUBLIC() {
        return this[this.env].PUBLIC;
    },

    get EDITOR() {
        return this[this.env].EDITOR;
    },

    get COOKIEDOMAIN() {
        return this[this.env].COOKIEDOMAIN;
    },

    get GITHUB() {
        return this[this.env].GITHUB;
    },


    ERRORCODES: {
        "100": {"message": "Continue", "field": ""},
        "101": {"message": "Switching Protocols", "field": ""},
        "200": {"message": "OK", "field": ""},
        "201": {"message": "Created", "field": ""},
        "202": {"message": "Accepted", "field": ""},
        "203": {"message": "Non-Authoritative Information", "field": ""},
        "204": {"message": "No Content", "field": ""},
        "205": {"message": "Reset Content", "field": ""},
        "206": {"message": "Partial Content", "field": ""},
        "300": {"message": "Multiple Choices", "field": ""},
        "301": {"message": "Moved Permanently", "field": ""},
        "302": {"message": "Found", "field": ""},
        "303": {"message": "See Other", "field": ""},
        "304": {"message": "Not Modified", "field": ""},
        "305": {"message": "Use Proxy", "field": ""},
        "307": {"message": "Temporary Redirect", "field": ""},
        "309": {"message": "PROJECT_EXIST", "field": ""},
        "310": {"message": "WRONG_USERNAME_OR_PASSWORD", "field": ["username", "email"]},
        "311": {"message": "EMAIL_EXISTS", "field": "email"},
        "312": {"message": "USER_WITH_ID_NOT_FOUND", "field": "id"},
        "313": {"message": "PROJECT_WITH_ID_NOT_FOUND", "field": "id"},
        "314": {"message": "ACCESS_TO_PROJECT_DENIED", "field": ""},
        "315": {"message": "TOKEN_DOES_NOT_PROVIDED", "field": "token"},
        "316": {"message": "UNKNOWN_TOKEN", "field": "token"},
        "317": {"message": "ORGANIZATION_NOT_FOUND", "field": "organization"},
        "318": {"message": "EMAIL_SEND_ERROR", "field": ""},
        "319": {"message": "USER_WITH_EMAIL_NOT_FOUND", "field": "email"},
        "320": {"message": "UNKNOWN_RESET_PASSWORD_CODE", "field": "reset_code"},
        "321": {"message": "USER_WITH_USERNAME_NOT_FOUND", "field": "username"},
        "322": {"message": "INVALID_PASSWORD", "field": ""},
        "323": {"message": "ORGANIZATION_PERMISSION_DENIED", "field": ""},
        "324": {"message": "ADMIN_PERMISSION_REQUIRED", "field": ""},
        "325": {"message": "USER_ALREADY_IN_ORGANIZATION", "field": ""},
        "326": {"message": "ADD_YOURSELF_TO_YOUR_ORGANIZATION", "field": ""},
        "327": {"message": "SOMETHING_WENT_WRONG", "field": ""},
        "328": {"message": "COULD_NOT_DELETE_OBJECT", "field": ""},
        "329": {"message": "COULD_NOT_LIST_FILES", "field": ""},
        "330": {"message": "COULD_NOT_READ_FILE", "field": ""},
        "331": {"message": "COULD_NOT_CREATE_COPY", "field": ""},
        "332": {"message": "PATH_DOES_NOT_EXIST", "field": ""},
        "333": {"message": "FILE_DOES_NOT_EXIST", "field": ""},
        "334": {"message": "FILE_OR_PATH_DOES_NOT_EXIST", "field": ""},
        "335": {"message": "COULD_NOT_WRITE_TO_FILE", "field": ""},
        "336": {"message": "NOT_A_FILE", "field": ""},
        "337": {"message": "COULD_NOT_CREATE_FILE", "field": ""},
        "338": {"message": "NOT_A_FILE", "field": ""},
        "350": {"message": "GITHUB_NOT_LINKED", "field": ""},
        "351": {"message": "NO_PROJECT_ROOT", "field": ""},
        "352": {"message": "REPO_NAME_EXIST", "field": ""},
        "360": {"message": "NO_DOMAIN_NAME", "field": ""},
        "361": {"message": "COULD_NOT_CREATE_TEMPLATE", "field": ""},
        "362": {"message": "ERROR_IN_CONFIG_FILE", "field": ""},
        "400": {"message": "BAD_REQUEST", "field": ""},
        "401": {"message": "Unauthorized", "field": ""},
        "402": {"message": "Payment Required", "field": ""},
        "403": {"message": "Forbidden", "field": ""},
        "404": {"message": "NOT_FOUND", "field": ""},
        "405": {"message": "Method Not Allowed", "field": ""},
        "406": {"message": "Not Acceptable", "field": ""},
        "407": {"message": "Proxy Authentication Required", "field": ""},
        "408": {"message": "Request Time-out", "field": ""},
        "409": {"message": "Conflict", "field": ""},
        "410": {"message": "Gone", "field": ""},
        "411": {"message": "Length Required", "field": ""},
        "412": {"message": "Precondition Failed", "field": ""},
        "413": {"message": "Request Entity Too Large", "field": ""},
        "414": {"message": "Request-URI Too Large", "field": ""},
        "415": {"message": "Unsupported Media Type", "field": ""},
        "416": {"message": "Requested Range not Satisfiable", "field": ""},
        "417": {"message": "Expectation Failed", "field": ""},
        "422": {"message": "Unprocessable Entity", "field": ""},
        "424": {"message": "Failed Dependency", "field": ""},
        "429": {"message": "Too Many Requests", "field": ""},
        "451": {"message": "Unavailable For Legal Reasons", "field": ""},
        "500": {"message": "INTERNAL_SERVER_ERROR", "field": ""},
        "501": {"message": "Not Implemented", "field": ""},
        "502": {"message": "Bad Gateway", "field": ""},
        "503": {"message": "Service Unavailable", "field": ""},
        "504": {"message": "Gateway Time-out", "field": ""},
        "505": {"message": "HTTP Version not Supported", "field": ""},
        "507": {"message": "Insufficient Storage", "field": ""},
        "600": {"message": "Bad socket Request", "field": ""},
        "601": {"message": "UNKNOWN_SOCKET_CHANNEL", "field": ""},
        "602": {"message": "UNKNOWN_SOCKET_ROOM", "field": ""},
        "603": {"message": "PERMISSION_SOCKET_DENIED", "field": ""},
        "604": {"message": "UNKNOWN_SOCKET_ACTION", "field": ""},
        "605": {"message": "SOCKET_ACTION_SUCCESS", "field": ""},
        "606": {"message": "SOCKET_ACTION_FAIL", "field": ""},
        "607": {"message": "SOCKET_ACTION_IN_PROGRESS", "field": ""},
        "666": {"message": "FATAL", "field": ""}
    }
};

export default AppConstants;
