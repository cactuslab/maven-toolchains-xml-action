# maven-toolchains-xml-action

![build-test](https://github.com/cactuslab/maven-toolchains-xml-action/workflows/build-test/badge.svg)

Github Action to create Maven toolchains (`~/.m2/toolchains.xml`) based upon [maven-settings-xml-action](https://github.com/whelk-io/maven-settings-xml-action).

## Inputs

### `toolchains`

JSON array of toolchains to add to `toolchains.xml`.

The configuration supports convenience properties for adding a `jdk` toolchain entry; `jdkVersion` and `jdkHome`, but also supports creating an arbitrary `<toolchain>` entry.

|Name|Description|Default|
|----|-----------|-------|
|`type`|Type of toolchain.|`jdk`|
|`jdkVersion`|Version of the JDK this toolchain represents. Will be inserted into the `provides` (if any) with the key `version`.|
|`jdkHome`|Path to JDK location. Will be inserted into the `configuration` (if any) with the key `jdkHome`.|
|`provides`|JSON object containing provides properties.|
|`configuration`|JSON object containing anything else to add to the configuration.|

Reference: https://maven.apache.org/maven-core/toolchains.html for the schema of the `<toolchain>` element that is reproduced here

---

## Basic Usage

````yaml
- id: setupJava
  uses: actions/setup-java@v2
  with:
    java-version: '8'
    distribution: 'temurin'
- uses: cactuslab/maven-toolchains-xml-action@v1
  with:
    toolchains: |
      [
        {"jdkVersion": "8", "jdkHome": "${{steps.setupJava.outputs.path}}"}
      ]
````

----

## Local Setup

This repository uses [`pnpm`](https://pnpm.io) instead of `npm` because it's so much faster.

**Install Dependencies**

```shell
pnpm install
```

**Run Linter**

```shell
pnpm lint
```

**Run Unit-Tests**

```shell
pnpm test
```

**Build**

```shell
pnpm build
pnpm watch
```

**Create Distribution**

```shell
pnpm package
```
