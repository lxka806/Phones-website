const readFile = require("../utils/readfile")

const getAllPhones = async (req,res) => {
    try{
        const Phones = await readFile("???")
        res.status(200).json(Phones)
    }catch(e){
        res.status(500).json({message: e.message})
    }
}

module.exports = {
    getAllPhones
}