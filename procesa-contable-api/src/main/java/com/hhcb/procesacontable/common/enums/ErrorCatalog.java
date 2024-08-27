package com.hhcb.procesacontable.common.enums;

import lombok.Getter;

@Getter
public enum ErrorCatalog {

    // Client Errors (4xx)
    // Client errors (4xx)
    BAD_REQUEST("E4000", "The request could not be understood or was missing required parameters.", 400),
    NOT_FOUND("E4001", "The requested resource could not be found.", 404),
    UNAUTHORIZED("E4002", "Unauthorized access. Please provide valid authentication credentials.", 401),
    FORBIDDEN("E4003", "Access is forbidden. Full authentication is required to access this resource.", 403),
    LEGAL_REPRESENTATIVE_INVALID("E4004", "The provided legal representative information is invalid.", 400),
    LEGAL_REPRESENTATIVE_NOT_FOUND("E4005", "No legal representative found with the provided ID.", 404),
    USER_INVALID("E4006", "The provided user information is invalid.", 400),
    USER_NOT_FOUND("E4007", "No user found with the provided ID.", 404),
    USER_LOCKED("E4008", "The user account is currently locked.", 423),
    TOKEN_EXPIRED("E4009", "The authentication token has expired.", 401),

    // Server Errors (5xx)
    INTERNAL_SERVER_ERROR("E5000", "An unexpected error occurred on the server.", 500),
    DATABASE_CONNECTION_ERROR("E5001", "An error occurred while trying to connect to the database.", 500);

    private final String code;
    private final String message;
    private final int status;

    ErrorCatalog(String code, String message, int status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }

}
