import { createTreeWithEmptyWorkspace } from "@nrwl/devkit/testing";
import { readProjectConfiguration, Tree } from "@nrwl/devkit";

import generator from "./generator";
import { NxNpmAppInitGeneratorSchema } from "./schema";

describe("nx-npm-app generator", () => {
  let appTree: Tree;
  const options: NxNpmAppInitGeneratorSchema = { name: "test" };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, "test");
    expect(config).toBeDefined();
  });
});
