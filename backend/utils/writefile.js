const fs = require("fs/promises");

const writefile = async (file, data) => {
    try {
        await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
        throw new Error(`Failed to write file: ${err.message}`);
    }
};

module.exports = writefile;