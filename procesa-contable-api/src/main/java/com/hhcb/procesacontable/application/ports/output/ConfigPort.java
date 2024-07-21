package com.hhcb.procesacontable.application.ports.output;

public interface ConfigPort {
    String getSecretKey();
    long getJwtExpiration();
    String getApplicationName();
}
