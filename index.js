import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
   organization: "org-INFO",
   apiKey: "sk-APIKEY",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

   const { messages } = req.body;
   
   const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
         {"role": "system", "content": "You are DatasetGPT, a helpful assistant that creates datasets."},
         ...messages
      ]
   });

   res.json({
      completion: completion.data.choices[0].message
   })

});

app.listen(port, () => {
   console.log(`listening on port http://localhost:${port}`);
});