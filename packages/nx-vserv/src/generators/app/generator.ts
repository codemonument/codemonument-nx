import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from "@nrwl/devkit";
import * as path from "path";
import { NxVservAppGeneratorSchema } from "./schema";
import { NormalizedSchema } from "./normalized-schema";

function normalizeOptions(
  tree: Tree,
  options: NxVservAppGeneratorSchema,
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp("/", "g"), "-");
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(",").map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.projectName),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: "",
  };
  generateFiles(
    tree,
    path.join(__dirname, "files"),
    options.projectRoot,
    templateOptions,
  );
}

export default async function (
  tree: Tree,
  options: NxVservAppGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: "application",
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    // CAUTION: These scripts need some executables in global path!
    // - doppler (from doppler-cli)
    targets: {
      build: {
        executor: "@codemonument-nx/nx-vserv:build",
      },
      start: {
        executor: "@nrwl/workspace:run-commands",
        "options": {
          "command":
            "doppler run -- docker-compose up --build --remove-orphans -d ",
        },
      },
      stop: {
        executor: "@nrwl/workspace:run-commands",
        "options": {
          "command": "doppler run -- docker-compose down",
        },
      },
      logs: {
        executor: "@nrwl/workspace:run-commands",
        "options": {
          "command": "doppler run -- docker-compose logs -f",
        },
      },
      shell: {
        executor: "@nrwl/workspace:run-commands",
        "options": {
          "command":
            `doppler run -- docker-compose exec ${normalizedOptions.projectName} bash`,
        },
      },
      startDebug: {
        executor: "@nrwl/workspace:run-commands",
        "options": {
          "commands": [
            `nx start ${normalizedOptions.projectName}`,
            `nx logs ${normalizedOptions.projectName}`,
          ],
        },
      },
      update: {
        executor: "@nrwl/workspace:run-commands",
        "options": {
          "commands": [
            `nx stop ${normalizedOptions.projectName}`,
            `git pull`,
            `nx start ${normalizedOptions.projectName}`,
          ],
        },
      },
      updateDebug: {
        executor: "@nrwl/workspace:run-commands",
        "options": {
          "commands": [
            `nx stop ${normalizedOptions.projectName}`,
            `git pull`,
            `nx startDebug ${normalizedOptions.projectName}`,
          ],
        },
      },
      upgrade: {
        executor: "@nrwl/workspace:run-commands",
        "options": {
          "commands": [
            `nx stop ${normalizedOptions.projectName}`,
            `git pull`,
            `doppler run -- docker-compose pull`,
            `nx start ${normalizedOptions.projectName}`,
          ],
        },
      },
      upgradeDebug: {
        executor: "@nrwl/workspace:run-commands",
        "options": {
          "commands": [
            `nx stop ${normalizedOptions.projectName}`,
            `git pull`,
            `doppler run -- docker-compose pull`,
            `nx startDebug ${normalizedOptions.projectName}`,
          ],
        },
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
