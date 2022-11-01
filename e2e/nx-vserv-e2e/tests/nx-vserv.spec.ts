import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from "@nrwl/nx-plugin/testing";

describe("nx-vserv e2e", () => {
  // Setting up individual workspaces per
  // test can cause e2e runs to take a long time.
  // For this reason, we recommend each suite only
  // consumes 1 workspace. The tests should each operate
  // on a unique project in the workspace, such that they
  // are not dependant on one another.
  beforeAll(() => {
    ensureNxProject("@codemonument-nx/nx-vserv", "dist/packages/nx-vserv");
  });

  afterAll(() => {
    // `nx reset` kills the daemon, and performs
    // some work which can help clean up e2e leftovers
    runNxCommandAsync("reset");
  });

  it("should create nx-vserv", async () => {
    const project = uniq("nx-vserv");
    await runNxCommandAsync(
      `generate @codemonument-nx/nx-vserv:app ${project}`,
    );
    expect(() => checkFilesExist(`apps/${project}/docker-compose.yaml`)).not
      .toThrow();
    // const result = await runNxCommandAsync(`build ${project}`);
    // expect(result.stdout).toContain("Executor ran");
  }, 120000);

  describe("--directory", () => {
    it(
      "should create files in the specified directory",
      async () => {
        const project = uniq("nx-vserv");
        await runNxCommandAsync(
          `generate @codemonument-nx/nx-vserv:app ${project} --directory subdir`,
        );
        expect(() =>
          checkFilesExist(`apps/subdir/${project}/docker-compose.yaml`)
        ).not
          .toThrow();
      },
      120000,
    );
  });

  describe("--tags", () => {
    it("should add tags to the project", async () => {
      const projectName = uniq("nx-vserv");
      ensureNxProject("@codemonument-nx/nx-vserv", "dist/packages/nx-vserv");
      await runNxCommandAsync(
        `generate @codemonument-nx/nx-vserv:app ${projectName} --tags e2etag,e2ePackage`,
      );
      const project = readJson(`apps/${projectName}/project.json`);
      expect(project.tags).toEqual(["e2etag", "e2ePackage"]);
    }, 120000);
  });
});
