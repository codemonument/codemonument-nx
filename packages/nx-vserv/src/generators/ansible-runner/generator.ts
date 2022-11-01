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
import { AnsibleRunnerGeneratorSchema } from "./schema";

interface NormalizedSchema extends AnsibleRunnerGeneratorSchema {
  projectName: string;
  projectRoot: string;
  nxAppsDir: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: AnsibleRunnerGeneratorSchema,
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp("/", "g"), "-");
  const nxAppsDir = getWorkspaceLayout(tree).appsDir;
  const projectRoot = `${nxAppsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(",").map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    nxAppsDir,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
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
  options: AnsibleRunnerGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(
    tree,
    normalizedOptions.projectName,
    {
      root: normalizedOptions.projectRoot,
      projectType: "application",
      sourceRoot: `${normalizedOptions.projectRoot}/src`,
      targets: {
        build: {
          executor: "@codemonument-nx/nx-vserv:build",
        },
      },
      tags: normalizedOptions.parsedTags,
    },
  );
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
