/**
 * Created by kh.levon98 on 13-Sep-16.
 */
const AppConstants = {
	env: "dev",
	prodAPI: 'http://dev.yvn.io/api',
	devAPI: 'http://127.0.0.1:3000/api',
	jwtKey: 'jwtToken',
	appName: 'Rodin',
	ERRORCODES: {
		"310": {
			"message": "WRONG_USERNAME_OR_PASSWORD",
			"field": ["username", "email"]
		},
		"311": {
			"message": "EMAIL_EXISTS",
			"field": "email"
		},
		"312": {
			"message": "USER_WITH_ID_NOT_FOUND",
			"field": "id"
		},
		"313": {
			"message": "PROJECT_WITH_ID_NOT_FOUND",
			"field": "id"
		},
		"314": {
			"message": "ACCESS_TO_PROJECT_DENIED",
			"field": ""
		},
		"315": {
			"message": "TOKEN_DOES_NOT_PROVIDED",
			"field": "token"
		},
		"316": {
			"message": "UNKNOWN_TOKEN",
			"field": "token"
		},
		"317": {
			"message": "ORGANIZATION_NOT_FOUND",
			"field": "organization"
		},
		"318": {
			"message": "EMAIL_SEND_ERROR",
			"field": ""
		},
		"319": {
			"message": "USER_WITH_EMAIL_NOT_FOUND",
			"field": "email"
		},
		"320": {
			"message": "UNKNOWN_RESET_PASSWORD_CODE",
			"field": "reset_code"
		},
		"321": {
			"message": "USER_WITH_USERNAME_NOT_FOUND",
			"field": "username"
		},
		"322": {
		 "message": "INVALID_PASSWORD",
		 "field": ""
		 },
		"323": {
			"message": "ORGANIZATION_PERMISSION_DENIED",
			"field": ""
		},
		"324": {
			"message": "ADMIN_PERMISSION_REQUIRED",
			"field": ""
		},
		"325": {
			"message": "USER_ALREADY_IN_ORGANIZATION",
			"field": ""
		},
		"326": {
			"message": "ADD_YOURSELF_TO_YOUR_ORGANIZATION",
			"field": ""
		},
		"327": {
			"message": "SOMETHING_WENT_WRONG",
			"field": ""
		},
		"601": {
			"message": "UNKNOWN_SOCKET_CHANNEL",
			"field": ""
		},
		"602": {
			"message": "UNKNOWN_SOCKET_ROOM",
			"field": ""
		},
		"603": {
			"message": "PERMISSION_SOCKET_DENIED",
			"field": ""
		},
		"604": {
			"message": "UNKNOWN_SOCKET_ACTION",
			"field": ""
		}
	}
};

export default AppConstants;
