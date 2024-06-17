package com.hhcb.procesacontable;

import com.hhcb.procesacontable.infrastructure.config.WebConfig;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import java.util.TimeZone;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        new SpringApplicationBuilder(WebConfig.class).run(args);
    }

}
