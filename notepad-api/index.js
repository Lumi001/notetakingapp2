import cors from "cors";
import express from "express";
import {graphqlHTTP} from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema";


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin001:1234@cluster0.xlv7a.mongodb.net/Notepad?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const app = express();
const PORT = process.env.PORT || 4300;

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Notetaking API v1"
  });
});

var root = {
    hello: () => {
      return 'Hello world!';
    },
  };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("../notaking-ui/build"))
}

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});