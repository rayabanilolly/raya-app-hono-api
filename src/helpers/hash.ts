import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const hashPassword = async (password: string): Promise<string> => { 
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
}

export default hashPassword;