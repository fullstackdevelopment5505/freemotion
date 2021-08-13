module.exports.signUp = async (req, res) => {
  const email = req.body.email;
  try {
    const sentEmail = await res.status(200).json({});
  } catch (err) {
    res.status(400).json({ err });
  }
};
