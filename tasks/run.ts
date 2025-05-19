export const run = async (args: string[]) => {
  const command = new Deno.Command(args[0], { args: args.slice(1), stderr: "inherit", stdout: "inherit" });

  const { code } = await command.output();

  if (code !== 0) {
    const msg = `✖ '${args.join(" ")}' failed with code ${code}.`;

    throw new Error(msg);
  }
};

if (import.meta.main) await run(Deno.args);
