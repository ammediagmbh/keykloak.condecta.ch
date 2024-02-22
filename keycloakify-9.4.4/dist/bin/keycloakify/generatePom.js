"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePom = void 0;
var assert_1 = require("tsafe/assert");
var Reflect_1 = require("tsafe/Reflect");
{
    var buildOptions = (0, Reflect_1.Reflect)();
    (0, assert_1.assert)();
}
function generatePom(params) {
    var buildOptions = params.buildOptions;
    var pomFileCode = (function generatePomFileCode() {
        var pomFileCode = [
            "<?xml version=\"1.0\"?>",
            "<project xmlns=\"http://maven.apache.org/POM/4.0.0\"",
            "\t xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"",
            "\t xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd\">",
            "  <modelVersion>4.0.0</modelVersion>",
            "\t<groupId>".concat(buildOptions.groupId, "</groupId>"),
            "\t<artifactId>".concat(buildOptions.artifactId, "</artifactId>"),
            "\t<version>".concat(buildOptions.themeVersion, "</version>"),
            "\t<name>".concat(buildOptions.artifactId, "</name>"),
            "  <description />",
            "  <packaging>jar</packaging>",
            "  <properties>",
            "    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>",
            "  </properties>",
            "  <build>",
            "    <plugins>",
            "      <plugin>",
            "        <groupId>org.apache.maven.plugins</groupId>",
            "        <artifactId>maven-shade-plugin</artifactId>",
            "\t     <version>3.5.1</version>",
            "        <executions>",
            "          <execution>",
            "            <phase>package</phase>",
            "            <goals>",
            "              <goal>shade</goal>",
            "            </goals>",
            "          </execution>",
            "        </executions>",
            "      </plugin>",
            "    </plugins>",
            "  </build>",
            "  <dependencies>",
            "    <dependency>",
            "      <groupId>io.phasetwo.keycloak</groupId>",
            "      <artifactId>keycloak-account-v1</artifactId>",
            "      <version>0.1</version>",
            "    </dependency>",
            "  </dependencies>",
            "</project>"
        ].join("\n");
        return { pomFileCode: pomFileCode };
    })().pomFileCode;
    return { pomFileCode: pomFileCode };
}
exports.generatePom = generatePom;
//# sourceMappingURL=generatePom.js.map