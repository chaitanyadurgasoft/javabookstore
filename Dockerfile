FROM openjdk:17-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy the built jar file into container
# (This file will be created when you build your app)
COPY target/book-service-1.0.0.jar app.jar

# Expose port 8080 (where your app runs)
EXPOSE 8080

# Command to run your application
ENTRYPOINT ["java", "-jar", "app.jar"]
