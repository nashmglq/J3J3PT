const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


const genAi = async (req, res) => {
    const {data} = req.body
    console.log(req.body)
    try{
        const promt = `${data} (only response in jeje style (filipino) like 'y0 pr3' but make it still understandable)`
        const result = await model.generateContent(promt);

        return res.status(200).json({success: result.response.text()})

    }catch(err){
        return res.status(500).json({error: err.message})
    }

};

  
module.exports = { genAi };
