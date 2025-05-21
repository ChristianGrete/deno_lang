/**
 * Runs multiple Deno tasks in parallel or in series.
 *
 * Also exports a `run()` helper to execute commands programmatically.
 *
 * Usage: `deno task run -p|-s <tasks...>`
 */

import { bold, dim, green, italic, red } from "@std/fmt/colors";

export type Mode = "quiet" | "silent" | "suppress";

export const run = async (args: string[], mode?: Mode) => {
  const cmd = new Deno.Command(args[0], {
    args: args.slice(1),
    stderr: mode === "silent" || mode === "suppress" ? "null" : "inherit",
    stdout: mode === "quiet" || mode === "silent" ? "null" : "inherit",
  });
  const { code } = await cmd.output();

  if (code !== 0) {
    const msg = `Command '${args.join(" ")}' failed with code ${code}.`;

    throw new Error(msg);
  }

  return cmd;
};

if (import.meta.main) {
  const args = [...Deno.args];
  const mode = args.shift();
  const isParallel = mode === "-p";
  const isSerial = mode === "-s";

  if (!isSerial && !isParallel) {
    console.info(`${green("Usage:")} deno task run -p|-s ${italic("<tasks...>")}`);

    Deno.exit(1);
  }

  const runTask = (name: string) => run(["deno", "task", name]);

  if (isSerial) {
    for (const task of args) {
      try {
        await runTask(task);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`${bold(red("Error"))} ${dim(`Failed to run task '${task}' in series:`)}`);
          console.error(red(err.message));
        } else {
          console.error(`${bold(red("Error"))} ${red("An unknown error occurred.")}`);
        }

        Deno.exit(1);
      }
    }
  } else {
    const results = await Promise.allSettled(args.map(runTask));

    let hasFailure = false;

    results.forEach((result, i) => {
      if (result.status === "rejected") {
        if (!hasFailure) hasFailure = true;

        const task = args[i];
        const reason = result.reason instanceof Error ? result.reason.message : String(result.reason);

        console.error(`${bold(red("Error"))} ${dim(`Failed to run task '${task}' in parallel:`)}`);
        console.error(red(reason));
      }
    });

    if (hasFailure) Deno.exit(1);
  }
}
