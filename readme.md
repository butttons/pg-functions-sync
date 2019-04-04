# Postgres Functions Sync

Develop and maintain postgres functions in a sane way.

## Installation

```
npm install --global pg-functions-sync
```

## Usage

-   Initialize the config file by running `pg-functions-sync init`
-   Edit the config file with relevant settings. Options:
    -   pg: Postgres connection settings from the [pg](https://www.npmjs.com/package/pg) module. [More info here](https://node-postgres.com/features/connecting),
    -   dir: Path of the directory containing all the functions relative to this file, typically the root of the project.
-   Sync functions once:

```
pg-functions-sync run
```

-   Sync functions in watch mode:

```
pg-functions-sync run -w
```
