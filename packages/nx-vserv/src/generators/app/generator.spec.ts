import { createTreeWithEmptyWorkspace } from "@nrwl/devkit/testing";
import { readProjectConfiguration, Tree } from "@nrwl/devkit";

import generator from "./generator";
import { NxVservAppGeneratorSchema } from "./schema";

describe("nx-vserv generator", () => {
  let appTree: Tree;
  const options: NxVservAppGeneratorSchema = { name: "test" };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, "test");
    expect(config).toBeDefined();
  });
});
