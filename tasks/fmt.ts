const files = Deno.args;

const run = async (args: string[]) => {
  const proc = new Deno.Command(args[0], { args: args.slice(1), stderr: "inherit", stdout: "inherit" });

  await proc.output();
};

await run(["deno", "lint", "--fix", ...files]);
await run(["deno", "task", "eslint-fix", ...files]);
await run(["deno", "task", "dprint-fmt", ...files]);
