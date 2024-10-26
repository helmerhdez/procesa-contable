FROM amazoncorretto:17-alpine-jdk
COPY target/procesa_contable-0.0.1.jar procesa_contable.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "procesa_contable.jar"]