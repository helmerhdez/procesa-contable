package com.hhcb.procesacontable;

import com.hhcb.procesacontable.config.SpringConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import java.util.TimeZone;

@SpringBootApplication
public class Application {
	private static final String UTC = "UTC";

	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone(UTC));
		new SpringApplicationBuilder(SpringConfig.class).run(args);
	}

}
