const Book = require("../model/book.model");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
exports.getuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });
    else res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

async function hashpassword(password) {
  const abc = await bcrypt.hash(password, 10);
  return abc;
}

async function comppassword(password, bpassword) {
  const abc = await bcrypt.compare(password, bpassword);
  return abc;
}

exports.registeruser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let bpassword = await hashpassword(password);
    const user = new User({ email, password: bpassword });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.find({ email });
    if (user.length == 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    let bpassword = await user[0].password;
    let check = await comppassword(password, bpassword);
    console.log("check", check);
    if (check) return res.status(201).json({ success: true, message: user });
    else
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getallbook = async (req, res) => {
  try {
    const book = await Book.find();
    if (book.length == 0)
      return res.status(404).json({ success: true, message: "book not found" });
    else res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
};

exports.addbook = async (req, res) => {
  try {
    console.log(req.body);
    const { bname, aname, price, description } = req.body;
    console.log(req.file.filename);
    const book = new Book({
      bname,
      aname,
      price,
      description,
      image: req.file.filename,
    });
    await book.save();
    res.status(201).json({ success: true, message: "Book added successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.updatebook = async (req, res) => {
  try {
    console.log(req.body);
    const { bname, aname, price, description } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, {
      bname,
      aname,
      price,
      description,
    });
  } catch (error) {
    console.log(error);
  }
};


exports.deletebook = async (req, res) => {
    try {
      console.log(req.body);
      const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Book deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  };