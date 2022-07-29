class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filters() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    console.log(queryObj);
    //note \b untuk memastikan kalau queryString benar-benar sama,
    //contoh lt dan ltin, \b akan mengembalikan nilai false untuk lt dan ltin
    //NOTE flag g untuk melakukan pengecekan kesemua queryStr bukan hanya
    //pada queryStr/lt pertama
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
}

module.exports = ApiFeatures;
