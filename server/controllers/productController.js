const Product = require("../models/Product");

// GET /api/products?subCategory=premium-sunglasses&gender=&price=&material=&shape=&rim=&size=&color=&sort=latest&page=1&limit=18
exports.getProducts = async (req, res) => {
  try {
    const {
      subCategory,
      category,
      gender,
      brand,
      badge,
      material,
      shape,
      rim,
      size,
      color,
      minPrice,
      maxPrice,
      search,
      sort = "latest",
      page = 1,
      limit = 18,
    } = req.query;

    const filter = {};
    if (subCategory) filter.subCategory = subCategory;
    if (category) filter.category = category;
    if (gender) filter.gender = gender;
    if (brand) filter.brand = brand;
    if (badge) filter.badges = badge;
    if (material) filter.material = material;
    if (shape) filter.shape = shape;
    if (rim) filter.rim = rim;
    if (size) filter.size = size;
    if (color) filter.color = color;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      const re = new RegExp(search.trim(), "i");
      filter.$or = [{ name: re }, { brand: re }];
    }

    const sortMap = {
      latest: { createdAt: -1 },
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
    };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));

    const [items, total] = await Promise.all([
      Product.find(filter)
        .sort(sortMap[sort] || sortMap.latest)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Product.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page: pageNum,
      totalPages: Math.max(1, Math.ceil(total / limitNum)),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/products/brands  -> distinct brand list, used for "Shop by sunglasses brands"
exports.getBrands = async (req, res) => {
  try {
    const brands = await Product.distinct("brand");
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
