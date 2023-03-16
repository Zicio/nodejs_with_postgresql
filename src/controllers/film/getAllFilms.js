const data = [{ name: "grib" }, { name: "abra" }];

const getAllFilms = (req, res) => {
  if (req.params) {
    return res.send(data.find((item) => item.name === req.params.name));
  }
  res.send(data);
};

export default getAllFilms;
