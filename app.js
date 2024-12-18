const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/dbConnect");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes"); 
const blogRouter = require("./routes/blogRoutes");
const prodCategoryRouter = require("./routes/prodCategoryRoutes");
const blogCategoryRouter = require("./routes/blogCategoryRoutes");
const brandRouter = require("./routes/brandRoutes");
const couponRouter = require("./routes/couponRoutes");
const colorRouter = require("./routes/colorRoutes");
const enqRouter = require("./routes/enqRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
connectDB();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", prodCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/blogcategory", blogCategoryRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});