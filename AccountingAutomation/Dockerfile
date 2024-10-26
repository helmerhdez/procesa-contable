# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5047
EXPOSE 5047

ENV ASPNETCORE_URLS=http://*:5047


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["1. API/API/API.csproj", "1. API/API/"]
COPY ["2. Business/Capture/Business.Capture/Business.Capture.csproj", "2. Business/Capture/Business.Capture/"]
COPY ["3. Data/Bills/Bills/Data.csproj", "3. Data/Bills/Bills/"]
COPY ["4. Models/Bills/Bills/Models.csproj", "4. Models/Bills/Bills/"]
COPY ["4. Models/Constants/Constants/Constants.csproj", "4. Models/Constants/Constants/"]
COPY ["Business.Parametrization/Business.Parametrization.csproj", "Business.Parametrization/"]
RUN dotnet restore "./1. API/API/API.csproj"
COPY . .
WORKDIR "/src/1. API/API"
RUN dotnet build "./API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]