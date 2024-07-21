package com.hhcb.procesacontable.architecture;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.syntax.ArchRuleDefinition;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import static com.tngtech.archunit.core.domain.JavaClass.Predicates.simpleNameEndingWith;


@AnalyzeClasses(packages = "com.hhcb.procesacontable", importOptions = {ImportOption.DoNotIncludeJars.class, ImportOption.DoNotIncludeTests.class})
class ArchitectureTest {
    @ArchTest
    void controllersShouldBeInEntrypointPackage(JavaClasses importedClasses) {
        ArchRuleDefinition.classes().that()
                .areAnnotatedWith(RestController.class)
                .should()
                .resideInAPackage("..adapter.input..")
                .andShould()
                .haveSimpleNameEndingWith("Controller")
                .check(importedClasses);
    }

    @ArchTest
    void repositoriesShouldBeInPersistencePackage(JavaClasses importedClasses) {
        ArchRuleDefinition.classes().that()
                .areAnnotatedWith(Repository.class)
                .should()
                .bePublic()
                .andShould()
                .beInterfaces()
                .andShould()
                .haveSimpleNameEndingWith("Repository")
                .andShould()
                .resideInAPackage("..adapter.output..")
                .check(importedClasses);
    }

    @ArchTest
    void servicesShouldResideInApplicationPackageAndImplementUseCase(JavaClasses importedClasses) {
        ArchRuleDefinition.classes().that()
                .areAnnotatedWith(Service.class)
                .should()
                .resideInAPackage("..application.usecases..")
                .andShould()
                .haveSimpleNameEndingWith("UseCase")
                .andShould()
                .implement(simpleNameEndingWith("UseCasePort"))
                .andShould()
                .accessClassesThat().haveSimpleNameEndingWith("Port")
                .check(importedClasses);
    }

    @ArchTest
    void portsShouldBeInApplicationInputPortsPackageAndBeInterfaces(JavaClasses importedClasses) {
        ArchRuleDefinition.classes().that()
                .areInterfaces()
                .and()
                .haveNameMatching(".*Port")
                .should()
                .resideInAPackage("..application.ports..")
                .check(importedClasses);
    }

    @ArchTest
    void domainModelShouldOnlyHaveDependenciesWithBasicLibrariesAndItsOwnProject(JavaClasses importedClasses) {
        ArchRuleDefinition.classes().that()
                .resideInAnyPackage("..domain..")
                .should()
                .onlyHaveDependentClassesThat()
                .resideInAnyPackage("java..", "javax..", "lombok..", "com.hhcb.procesacontable..")
                .check(importedClasses);
    }

    @ArchTest
    void domainShouldNotDependOnApplicationAndInfrastructure(JavaClasses importedClasses) {
        ArchRuleDefinition.noClasses()
                .that()
                .resideInAPackage("..domain..")
                .should()
                .dependOnClassesThat()
                .resideInAnyPackage("..application..", "..infrastructure..")
                .check(importedClasses);
    }

    @ArchTest
    void applicationShouldNotDependOnInfrastructure(JavaClasses importedClasses) {
        ArchRuleDefinition.noClasses()
                .that()
                .resideInAPackage("..application..")
                .should()
                .dependOnClassesThat()
                .resideInAPackage("..infrastructure..")
                .check(importedClasses);
    }

    @ArchTest
    void infrastructureShouldOnlyDependOnApplicationAndDomain(JavaClasses importedClasses) {
        ArchRuleDefinition.classes()
                .that()
                .resideInAPackage("..infrastructure..")
                .should()
                .onlyHaveDependentClassesThat()
                .resideInAnyPackage("..infrastructure..", "..application..", "..domain..", "java..", "javax..", "lombok..", "org.springframework.web..")
                .check(importedClasses);
    }

    @ArchTest
    void inputAdaptersShouldNotDependOnOutputAdapters(JavaClasses importedClasses) {
        ArchRuleDefinition.noClasses()
                .that()
                .resideInAPackage("..adapter.input..")
                .should()
                .dependOnClassesThat()
                .resideInAPackage("..adapter.output..")
                .check(importedClasses);
    }

}
