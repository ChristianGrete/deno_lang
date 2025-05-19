export const run = async (args: string[]) => {
  const cmd = new Deno.Command(args[0], { args: args.slice(1), stderr: "inherit", stdout: "inherit" });
  const { code } = await cmd.output();

  if (code !== 0) {
    const msg = `✖ '${args.join(" ")}' failed with code ${code}.`;

    throw new Error(msg);
  }
};

if (import.meta.main) {
  const args = [...Deno.args];
  const mode = args.shift();
  const isParallel = mode === "-p";
  const isSerial = mode === "-s";

  if (!isSerial && !isParallel) {
    console.error("Usage: deno task run -p|-s <tasks...>");

    Deno.exit(1);
  }

  const runTask = (name: string) => run(["deno", "task", name]);

  if (isSerial) {
    for (const task of args) {
      await runTask(task);
    }
  } else {
    const results = await Promise.allSettled(args.map(runTask));
    const hasFailure = results.some((r) => r.status === "rejected");

    if (hasFailure) Deno.exit(1);
  }
}
